import { useEffect, useRef } from 'react';

// Creates a trail of small hearts following the cursor on desktop devices.
export default function CursorHearts() {
  const enabled = useRef(false);

  useEffect(() => {
    // Only enable on devices with a real pointer (desktop)
    if (window.matchMedia('(pointer: fine)').matches) {
      enabled.current = true;
    } else {
      return;
    }

    let last = 0;
    const HEARTS = ['❤️', '💖', '✨', '💕'];

    function spawn(e: MouseEvent) {
      if (!enabled.current) return;
      const now = Date.now();
      if (now - last < 80) return; // throttle
      last = now;

      const el = document.createElement('span');
      el.className = 'cursor-heart';
      el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      el.style.left = `${e.clientX + (Math.random() * 20 - 10)}px`;
      el.style.top = `${e.clientY + (Math.random() * 20 - 10)}px`;
      el.style.opacity = '1';
      el.style.transition =
        'transform 1.2s ease-out, opacity 1.2s ease-out';
      document.body.appendChild(el);

      requestAnimationFrame(() => {
        el.style.transform = `translateY(-60px) scale(0.3)`;
        el.style.opacity = '0';
      });

      setTimeout(() => el.remove(), 1200);
    }

    window.addEventListener('mousemove', spawn);
    return () => window.removeEventListener('mousemove', spawn);
  }, []);

  return null;
}
