import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import gameConfig from './config';

interface PhaserGameProps {
  className?: string;
}

export default function PhaserGame({ className }: PhaserGameProps) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !gameRef.current) {
      gameRef.current = new Phaser.Game({
        ...gameConfig,
        parent: containerRef.current,
      });
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} className={className} id="game-container" />;
}
