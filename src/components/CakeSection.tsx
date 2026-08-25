import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, Flame, Sparkles } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import { confettiBurst, heartExplosion, fireworks } from '@/utils/confetti';

interface Candle {
  id: number;
  lit: boolean;
}

const CANDLE_COUNT = 5;

export default function CakeSection() {
  const [candles, setCandles] = useState<Candle[]>(
    Array.from({ length: CANDLE_COUNT }, (_, i) => ({ id: i, lit: true }))
  );
  const [celebrated, setCelebrated] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sceneRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const el = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setTilt({ x: dy * -12, y: dx * 16 });
  }

  function blowCandle(id: number) {
    setCandles((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, lit: false } : c));
      const allOut = next.every((c) => !c.lit);
      if (allOut && !celebrated) {
        setCelebrated(true);
        setTimeout(() => {
          confettiBurst();
          heartExplosion(window.innerWidth / 2, window.innerHeight / 2);
          fireworks();
        }, 300);
      } else if (!allOut) {
        confettiBurst();
      }
      return next;
    });
  }

  function relightAll() {
    setCandles((prev) => prev.map((c) => ({ ...c, lit: true })));
    setCelebrated(false);
  }

  const allOut = candles.every((c) => !c.lit);

  return (
    <section
      id="cake"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0014] via-[#1a0b2e] to-[#0a0014]"
    >
      <FloatingParticles count={14} />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <motion.div
          className="mb-4 flex items-center gap-2 rounded-full glass px-5 py-2 text-sm tracking-widest text-rose-200"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Cake className="h-4 w-4 text-rose-300" />
          MAKE A WISH
        </motion.div>

        <motion.h2
          className="mb-3 text-center font-script text-4xl sm:text-6xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gradient-rose text-glow-rose">
            Blow Out the Candles, Bhavya
          </span>
        </motion.h2>
        <motion.p
          className="mb-10 max-w-md text-center font-serif-romantic text-lg text-rose-100/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Tap each candle to blow it out. When they're all out, your wish comes
          true. 🎂
        </motion.p>

        {/* 3D Scene */}
        <div
          ref={sceneRef}
          className="relative flex h-[420px] w-full max-w-2xl items-end justify-center"
          style={{ perspective: '900px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <motion.div
            className="relative"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          >
            {/* Candles */}
            <div
              className="absolute -top-28 left-1/2 flex -translate-x-1/2 gap-3 sm:gap-6"
              style={{ transform: 'translateZ(30px)' }}
            >
              {candles.map((c) => (
                <button
                  key={c.id}
                  onClick={() => blowCandle(c.id)}
                  className="group relative flex flex-col items-center focus:outline-none"
                  aria-label={c.lit ? 'Blow out candle' : 'Candle is out'}
                >
                  {/* Flame */}
                  <div className="relative h-12 w-6">
                    <AnimatePresence>
                      {c.lit && (
                        <motion.div
                          className="flame absolute inset-x-0 mx-auto h-9 w-4"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                        >
                          {/* Flame shape */}
                          <div
                            className="absolute bottom-0 left-1/2 h-8 w-4 -translate-x-1/2 rounded-full"
                            style={{
                              background:
                                'radial-gradient(ellipse at bottom, #fff 0%, #ffd6a5 30%, #ff8c42 70%, #ff4d00 100%)',
                              filter: 'blur(0.5px)',
                              boxShadow:
                                '0 0 12px rgba(255,140,66,0.8), 0 0 24px rgba(255,77,109,0.5)',
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/* Smoke when out */}
                    <AnimatePresence>
                      {!c.lit && (
                        <motion.div
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-gray-400/60"
                          initial={{ opacity: 0.6, y: 0 }}
                          animate={{ opacity: 0, y: -20 }}
                          transition={{ duration: 1 }}
                        >
                          <Flame className="h-3 w-3 rotate-180" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Candle body */}
                  <div
                    className="h-16 w-2.5 rounded-sm sm:w-3"
                    style={{
                      background:
                        'linear-gradient(90deg, #ffb4a2, #ff8fa3, #ffb4a2)',
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Cake top tier */}
            <div
              className="relative h-24 w-56 rounded-2xl sm:w-72"
              style={{
                transform: 'translateZ(15px)',
                background:
                  'linear-gradient(180deg, #fff5ec 0%, #ffd6a5 100%)',
                boxShadow:
                  '0 10px 30px rgba(201,24,74,0.4), inset 0 -8px 0 rgba(201,24,74,0.15)',
              }}
            >
              {/* Drips */}
              <div className="absolute -top-1 left-0 right-0 h-6">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 rounded-b-full bg-rose-400"
                    style={{
                      left: `${i * 14 + 4}%`,
                      width: '16px',
                      height: `${10 + (i % 3) * 6}px`,
                    }}
                  />
                ))}
              </div>
              {/* Sprinkles */}
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className="absolute h-1 w-3 rounded-full"
                  style={{
                    top: `${30 + (i % 4) * 15}%`,
                    left: `${8 + (i * 9) % 84}%`,
                    background: ['#ff4d6d', '#ffd6a5', '#ff8fa3', '#c9184a'][i % 4],
                    transform: `rotate(${i * 36}deg)`,
                  }}
                />
              ))}
            </div>

            {/* Cake bottom tier */}
            <div
              className="relative -mt-2 h-32 w-72 rounded-2xl sm:w-96"
              style={{
                transform: 'translateZ(0px)',
                background:
                  'linear-gradient(180deg, #ff8fa3 0%, #c9184a 100%)',
                boxShadow:
                  '0 16px 40px rgba(201,24,74,0.5), inset 0 -10px 0 rgba(0,0,0,0.15)',
              }}
            >
              {/* Decorative dots */}
              {[...Array(12)].map((_, i) => (
                <span
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-rose-100/80"
                  style={{
                    top: `${25 + (i % 3) * 20}%`,
                    left: `${6 + (i * 8) % 88}%`,
                  }}
                />
              ))}
            </div>

            {/* Plate */}
            <div
              className="relative -mt-1 h-3 w-80 rounded-full sm:w-[28rem]"
              style={{
                background: 'linear-gradient(180deg, #fff, #ccc)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            />
          </motion.div>

          {/* Glow under cake */}
          <div className="absolute bottom-10 left-1/2 h-20 w-72 -translate-x-1/2 rounded-full bg-rose-500/30 blur-3xl" />
        </div>

        {/* Celebration message */}
        <AnimatePresence>
          {celebrated && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-script text-3xl text-gradient-gold sm:text-4xl">
                Your wish has been made, Bhavya! 🌟
              </p>
              <p className="mt-2 font-serif-romantic text-rose-100/80">
                May all your dreams come true, my love.
              </p>
              <button
                onClick={relightAll}
                className="mt-4 rounded-full glass-rose px-5 py-2 text-sm text-rose-200 transition hover:scale-105"
              >
                <Sparkles className="mr-1 inline h-4 w-4" />
                Light the candles again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!celebrated && (
          <p className="mt-8 text-sm text-rose-200/50">
            {candles.filter((c) => c.lit).length} candles still burning…
          </p>
        )}
      </div>
    </section>
  );
}
