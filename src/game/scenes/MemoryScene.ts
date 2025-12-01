import Phaser from 'phaser';

interface Card {
  sprite: Phaser.GameObjects.Graphics;
  icon: Phaser.GameObjects.Text;
  pattern: Phaser.GameObjects.Text;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
  index: number;
}

export default class MemoryScene extends Phaser.Scene {
  private cards: Card[] = [];
  private flippedCards: Card[] = [];
  private canFlip: boolean = true;
  private moves: number = 0;
  private matchedPairs: number = 0;
  private totalPairs: number = 8;
  private movesText!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private titleText!: Phaser.GameObjects.Text;

  // Christmas-themed symbols (emoji)
  private symbols: string[] = ['🎄', '🎅', '⭐', '🎁', '❄️', '🦌', '🔔', '🕯️'];

  constructor() {
    super({ key: 'MemoryScene' });
  }

  create(): void {
    const { width, height } = this.scale;

    // Christmas background gradient
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a472a, 0x1a472a, 0x2d5a3f, 0x2d5a3f, 1);
    bg.fillRect(0, 0, width, height);

    // Add snowflakes decoration
    this.createSnowflakes();

    // Title
    this.titleText = this.add.text(width / 2, 40, '🎄 Memorama Navideño 🎄', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
    });
    this.titleText.setOrigin(0.5);

    // Moves counter
    this.movesText = this.add.text(20, height - 40, `Movimientos: ${this.moves}`, {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
    });

    // Score display
    this.scoreText = this.add.text(width - 20, height - 40, `Parejas: ${this.matchedPairs}/${this.totalPairs}`, {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
    });
    this.scoreText.setOrigin(1, 0);

    // Create cards
    this.createCards();
  }

  private createSnowflakes(): void {
    const { width, height } = this.scale;
    
    // Add decorative snowflakes
    for (let i = 0; i < 30; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      const snowflake = this.add.text(x, y, '❄', {
        fontSize: `${Phaser.Math.Between(10, 20)}px`,
        color: '#ffffff',
      });
      snowflake.setAlpha(Phaser.Math.FloatBetween(0.1, 0.3));
    }
  }

  private createCards(): void {
    const { width, height } = this.scale;
    
    // Create pairs of symbols for the memory game (each symbol appears twice)
    const gameSymbols = this.symbols.flatMap(symbol => [symbol, symbol]);
    
    // Shuffle the symbols
    Phaser.Utils.Array.Shuffle(gameSymbols);

    // Card dimensions
    const cardWidth = 80;
    const cardHeight = 100;
    const padding = 15;
    const cols = 4;
    const rows = 4;

    // Calculate starting position to center the grid
    const gridWidth = cols * cardWidth + (cols - 1) * padding;
    const gridHeight = rows * cardHeight + (rows - 1) * padding;
    const startX = (width - gridWidth) / 2 + cardWidth / 2;
    const startY = (height - gridHeight) / 2 + cardHeight / 2 + 30;

    gameSymbols.forEach((symbol, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = startX + col * (cardWidth + padding);
      const y = startY + row * (cardHeight + padding);

      this.createCard(x, y, cardWidth, cardHeight, symbol, index);
    });
  }

  private createCard(x: number, y: number, width: number, height: number, symbol: string, index: number): void {
    // Card back (green Christmas color)
    const cardBack = this.add.graphics();
    cardBack.fillStyle(0xc41e3a, 1); // Christmas red
    cardBack.fillRoundedRect(x - width / 2, y - height / 2, width, height, 10);
    cardBack.lineStyle(3, 0xffd700, 1); // Gold border
    cardBack.strokeRoundedRect(x - width / 2, y - height / 2, width, height, 10);

    // Add decorative pattern on card back
    const pattern = this.add.text(x, y, '🎁', {
      fontSize: '30px',
    });
    pattern.setOrigin(0.5);

    // Hidden icon (will be shown when flipped)
    const icon = this.add.text(x, y, symbol, {
      fontSize: '40px',
    });
    icon.setOrigin(0.5);
    icon.setVisible(false);

    const card: Card = {
      sprite: cardBack,
      icon: icon,
      pattern: pattern,
      symbol: symbol,
      isFlipped: false,
      isMatched: false,
      index: index,
    };

    // Make card interactive
    cardBack.setInteractive(
      new Phaser.Geom.Rectangle(x - width / 2, y - height / 2, width, height),
      Phaser.Geom.Rectangle.Contains
    );

    cardBack.on('pointerdown', () => this.flipCard(card));
    cardBack.on('pointerover', () => {
      if (!card.isFlipped && !card.isMatched && this.canFlip) {
        cardBack.setAlpha(0.8);
      }
    });
    cardBack.on('pointerout', () => {
      cardBack.setAlpha(1);
    });

    this.cards.push(card);
  }

  private flipCard(card: Card): void {
    if (!this.canFlip || card.isFlipped || card.isMatched) {
      return;
    }

    // Flip animation
    this.tweens.add({
      targets: [card.sprite, card.pattern],
      scaleX: 0,
      duration: 150,
      onComplete: () => {
        // Change card appearance
        card.sprite.clear();
        const bounds = card.sprite.input!.hitArea as Phaser.Geom.Rectangle;
        card.sprite.fillStyle(0xffffff, 1);
        card.sprite.fillRoundedRect(bounds.x, bounds.y, bounds.width, bounds.height, 10);
        card.sprite.lineStyle(3, 0xc41e3a, 1);
        card.sprite.strokeRoundedRect(bounds.x, bounds.y, bounds.width, bounds.height, 10);
        
        card.pattern.setVisible(false);
        card.icon.setVisible(true);

        this.tweens.add({
          targets: card.sprite,
          scaleX: 1,
          duration: 150,
        });
      },
    });

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.movesText.setText(`Movimientos: ${this.moves}`);
      this.checkMatch();
    }
  }

  private checkMatch(): void {
    this.canFlip = false;
    const [card1, card2] = this.flippedCards;

    if (card1.symbol === card2.symbol) {
      // Match found!
      this.matchedPairs++;
      this.scoreText.setText(`Parejas: ${this.matchedPairs}/${this.totalPairs}`);
      
      // Celebration effect
      this.tweens.add({
        targets: [card1.sprite, card2.sprite],
        alpha: 0.7,
        duration: 200,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          card1.isMatched = true;
          card2.isMatched = true;
          this.flippedCards = [];
          this.canFlip = true;

          // Check win condition
          if (this.matchedPairs === this.totalPairs) {
            this.showWinMessage();
          }
        },
      });
    } else {
      // No match - flip cards back
      this.time.delayedCall(1000, () => {
        this.flipCardBack(card1);
        this.flipCardBack(card2);
        this.flippedCards = [];
        this.canFlip = true;
      });
    }
  }

  private flipCardBack(card: Card): void {
    this.tweens.add({
      targets: card.sprite,
      scaleX: 0,
      duration: 150,
      onComplete: () => {
        const bounds = card.sprite.input!.hitArea as Phaser.Geom.Rectangle;
        card.sprite.clear();
        card.sprite.fillStyle(0xc41e3a, 1);
        card.sprite.fillRoundedRect(bounds.x, bounds.y, bounds.width, bounds.height, 10);
        card.sprite.lineStyle(3, 0xffd700, 1);
        card.sprite.strokeRoundedRect(bounds.x, bounds.y, bounds.width, bounds.height, 10);
        
        card.icon.setVisible(false);
        
        // Re-show the cached pattern instead of creating new one
        card.pattern.setVisible(true);
        card.pattern.setScale(1);

        card.isFlipped = false;

        this.tweens.add({
          targets: card.sprite,
          scaleX: 1,
          duration: 150,
        });
      },
    });
  }

  private showWinMessage(): void {
    const { width, height } = this.scale;

    // Overlay
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.7);
    overlay.fillRect(0, 0, width, height);

    // Win message
    const winText = this.add.text(width / 2, height / 2 - 60, '🎉 ¡Felicidades! 🎉', {
      fontSize: '48px',
      color: '#ffd700',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
    });
    winText.setOrigin(0.5);

    const statsText = this.add.text(width / 2, height / 2 + 10, `Completaste el juego en ${this.moves} movimientos`, {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
    });
    statsText.setOrigin(0.5);

    // Restart button
    const restartBtn = this.add.text(width / 2, height / 2 + 80, '🔄 Jugar de Nuevo', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#c41e3a',
      padding: { x: 20, y: 10 },
    });
    restartBtn.setOrigin(0.5);
    restartBtn.setInteractive({ useHandCursor: true });
    
    restartBtn.on('pointerover', () => restartBtn.setStyle({ backgroundColor: '#a01830' }));
    restartBtn.on('pointerout', () => restartBtn.setStyle({ backgroundColor: '#c41e3a' }));
    restartBtn.on('pointerdown', () => this.restartGame());
  }

  private restartGame(): void {
    this.cards = [];
    this.flippedCards = [];
    this.canFlip = true;
    this.moves = 0;
    this.matchedPairs = 0;
    this.scene.restart();
  }
}
