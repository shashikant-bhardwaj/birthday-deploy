import confetti from 'canvas-confetti';

const ROSE_COLORS = ['#ff4d6d', '#c9184a', '#ff8fa3', '#ffb4a2', '#ffd6a5'];

// Standard celebratory confetti burst from the top of the screen.
export function confettiBurst() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.3 },
    colors: ROSE_COLORS,
  });
}

// Heart-shaped confetti explosion from a point on screen.
export function heartExplosion(x?: number, y?: number) {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0.4,
    decay: 0.94,
    startVelocity: 30,
    colors: ROSE_COLORS,
    shapes: ['star' as const],
    scalar: 2,
  };

  confetti({
    ...defaults,
    particleCount: 40,
    origin: x != null && y != null ? { x: x / window.innerWidth, y: y / window.innerHeight } : { x: 0.5, y: 0.5 },
  });
}

// Fireworks-style confetti — multiple bursts.
export function fireworks() {
  const duration = 2500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ROSE_COLORS,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ROSE_COLORS,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  // Center bursts
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.5 },
      colors: ROSE_COLORS,
    });
  }, 400);
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 120,
      origin: { y: 0.4 },
      colors: ROSE_COLORS,
    });
  }, 1000);
}

// Continuous gentle confetti rain for a set duration (ms).
export function confettiRain(duration = 4000) {
  const end = Date.now() + duration;
  (function frame() {
    confetti({
      particleCount: 3,
      angle: 90,
      spread: 120,
      origin: { x: Math.random(), y: 0 },
      colors: ROSE_COLORS,
      gravity: 0.5,
      scalar: 0.9,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
