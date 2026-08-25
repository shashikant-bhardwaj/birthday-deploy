import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import { FINAL_TITLE, FINAL_MESSAGE, FINAL_CLOSING } from '@/data/content';
import { confettiRain, fireworks } from '@/utils/confetti';

export default function FinalMessage() {
  return (
    <section
      id="final"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0014] via-[#1a0b2e] to-[#0a0014] py-24"
    >
      <FloatingParticles count={26} />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-rose-600/20 blur-[150px]" />
        <div className="absolute left-1/4 bottom-1/4 h-72 w-72 rounded-full bg-pink-500/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="h-16 w-16 fill-rose-500 text-rose-400 text-glow-rose" />
          </motion.div>
        </motion.div>

        <motion.h2
          className="font-script text-4xl leading-tight sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="shimmer-text text-glow-rose">{FINAL_TITLE}</span>
        </motion.h2>

        <motion.p
          className="mt-10 max-w-2xl font-serif-romantic text-xl leading-relaxed text-rose-100/80 sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {FINAL_MESSAGE}
        </motion.p>

        <motion.div
          className="my-10 h-px w-32 bg-gradient-to-r from-transparent via-rose-400 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />

        <motion.h3
          className="font-dancing text-4xl text-gradient-gold sm:text-6xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {FINAL_CLOSING}
        </motion.h3>

        {/* Celebrate button */}
        <motion.button
          onClick={() => {
            confettiRain(5000);
            fireworks();
          }}
          className="btn-shine mt-12 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-700 px-8 py-4 text-lg font-medium text-white animate-pulse-glow transition-transform hover:scale-110"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="h-5 w-5 fill-white" />
          Celebrate Again 🎉
        </motion.button>

        {/* Footer signature */}
        <motion.p
          className="mt-16 font-script text-2xl text-rose-300/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          Made with endless love, just for you, Bhavya.
        </motion.p>
      </div>
    </section>
  );
}
