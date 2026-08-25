import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Gift } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import { confettiBurst, heartExplosion } from '@/utils/confetti';

export default function LandingScreen({ onStart }: { onStart: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const [exiting, setExiting] = useState(false);

  function handleReveal() {
    setRevealed(true);
    confettiBurst();
    setTimeout(() => heartExplosion(window.innerWidth / 2, window.innerHeight / 2), 600);
  }

  function handleStart() {
    setExiting(true);
    confettiBurst();
    setTimeout(() => {
      onStart();
    }, 900);
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#1a0b2e] via-[#0a0014] to-[#0a0014]">
      {/* Ambient gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-rose-600/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-pink-500/20 blur-[120px]" />
      </div>

      <FloatingParticles count={22} />

      {/* Floating balloons */}
      {['left-[8%]', 'left-[20%]', 'right-[15%]', 'right-[8%]'].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} no-select`}
          style={{ top: `${15 + i * 12}%` }}
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center">
            <div
              className="h-20 w-16 rounded-[50%] opacity-80"
              style={{
                background:
                  i % 2
                    ? 'linear-gradient(180deg,#ff8fa3,#c9184a)'
                    : 'linear-gradient(180deg,#ffd6a5,#ff8fa3)',
              }}
            />
            <div className="h-6 w-px bg-white/30" />
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="madamji"
              className="flex flex-col items-center"
              exit={{ opacity: 0, scale: 0.9, y: -40 }}
              transition={{ duration: 0.6 }}
            >
              {/* Top tag */}
              <motion.div
                className="mb-8 flex items-center gap-2 rounded-full glass px-5 py-2 text-sm tracking-widest text-rose-200"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="h-4 w-4 text-rose-300" />
                A SPECIAL SURPRISE
              </motion.div>

              <motion.h1
                className="font-script text-5xl leading-tight sm:text-7xl md:text-8xl"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <span className="shimmer-text text-glow-rose">
                  Happy Birthday
                </span>
              </motion.h1>
              <motion.p
                className="mt-2 font-dancing text-4xl text-gradient-gold sm:text-6xl md:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Madam Ji ❤️🎂
              </motion.p>

              <motion.button
                onClick={handleReveal}
                className="btn-shine mt-12 group flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-700 px-8 py-4 text-lg font-medium text-white glow-rose transition-transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Heart className="h-5 w-5 fill-white" />
                Reveal Your Surprise
                <Sparkles className="h-5 w-5" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="bhavya"
              className="flex max-w-3xl flex-col items-center"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <motion.div
                className="mb-6 flex items-center gap-2 rounded-full glass-rose px-5 py-2 text-sm tracking-widest text-rose-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Heart className="h-4 w-4 fill-rose-400 text-rose-400" />
                JUST FOR YOU
              </motion.div>

              <h1 className="font-script text-5xl leading-tight sm:text-7xl md:text-8xl">
                <span className="shimmer-text text-glow-rose">
                  Happy Birthday,
                </span>
              </h1>
              <p className="mt-3 font-dancing text-4xl text-gradient-gold sm:text-6xl md:text-7xl">
                Bhavya ❤️🎂
              </p>

              <motion.p
                className="mt-8 max-w-xl font-serif-romantic text-lg text-rose-100/80 sm:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Today is all about celebrating the most beautiful person in my
                life, Bhavya.
              </motion.p>

              <motion.button
                onClick={handleStart}
                className="btn-shine mt-10 group flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 px-10 py-5 text-xl font-semibold text-white animate-pulse-glow transition-transform hover:scale-110"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Gift className="h-6 w-6" />
                Start the Surprise ❤️
                <Sparkles className="h-6 w-6" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Exit overlay */}
      <AnimatePresence>
        {exiting && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0014]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <Heart className="h-20 w-20 fill-rose-500 text-rose-400" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
