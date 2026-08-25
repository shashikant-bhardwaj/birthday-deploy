import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import { LOVE_QUOTES } from '@/data/content';

export default function LoveQuotes() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  const current = LOVE_QUOTES[index];

  // Typewriter effect
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(current.text.slice(0, i));
      if (i >= current.text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, 35);

    return () => clearInterval(timer);
  }, [current]);

  // Auto-advance
  useEffect(() => {
    if (!done) return;
    const advance = setTimeout(() => {
      setIndex((p) => (p + 1) % LOVE_QUOTES.length);
    }, 4000);
    return () => clearTimeout(advance);
  }, [done]);

  return (
    <section
      id="quotes"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0014] via-[#1a0b2e] to-[#0a0014] py-24"
    >
      <FloatingParticles count={14} />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-600/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6">
        <motion.div
          className="mb-6 flex items-center gap-2 rounded-full glass px-5 py-2 text-sm tracking-widest text-rose-200"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Quote className="h-4 w-4 text-rose-300" />
          WORDS FROM MY HEART
        </motion.div>

        <motion.h2
          className="mb-12 text-center font-script text-4xl sm:text-6xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gradient-rose text-glow-rose">
            Love Notes for You
          </span>
        </motion.h2>

        {/* Quote card */}
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              className="glass-rose mx-auto rounded-3xl px-8 py-12 text-center sm:px-16 sm:py-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <Quote className="mx-auto mb-6 h-10 w-10 text-rose-400/60" />
              <p className="font-serif-romantic text-2xl italic leading-relaxed text-rose-50 sm:text-3xl md:text-4xl">
                {displayed}
                <span className="ml-1 inline-block w-0.5 animate-pulse bg-rose-300 align-middle" style={{ height: '1.2em' }} />
              </p>
              <motion.p
                className="mt-6 text-3xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: done ? 1 : 0, scale: done ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {current.emoji}
              </motion.p>
            </motion.blockquote>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-3">
            {LOVE_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 32 : 8,
                  background:
                    i === index
                      ? 'linear-gradient(90deg,#ff4d6d,#c9184a)'
                      : 'rgba(255,255,255,0.2)',
                }}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
