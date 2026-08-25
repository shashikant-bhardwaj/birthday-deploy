import { useEffect, useState, useCallback } from 'react';

// Floating hearts, stars, and sparkles background layer.
// Used across multiple sections for ambient romance.
const SYMBOLS = ['❤️', '✨', '💫', '🌟', '💖'];

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  symbol: string;
  drift: number;
}

export default function FloatingParticles({
  count = 18,
  className = '',
}: {
  count?: number;
  className?: string;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const generate = useCallback(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 24,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 10,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        drift: (Math.random() - 0.5) * 200,
      });
    }
    setParticles(arr);
  }, [count]);

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute no-select"
          style={{
            left: `${p.left}%`,
            bottom: '-50px',
            fontSize: `${p.size}px`,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
