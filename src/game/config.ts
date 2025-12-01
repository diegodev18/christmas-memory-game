import Phaser from 'phaser';
import MemoryScene from './scenes/MemoryScene';

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  backgroundColor: '#1a472a',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 600,
    height: 700,
  },
  scene: [MemoryScene],
};

export default gameConfig;
