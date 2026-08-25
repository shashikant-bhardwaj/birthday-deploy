import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0014]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Glow ring */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 rounded-full bg-rose-500/30 blur-2xl animate-pulse" />
        <div className="relative h-24 w-24 rounded-full glass-rose flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Heart className="h-10 w-10 text-rose-400 fill-rose-500" />
          </motion.div>
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.p
        className="font-script text-3xl text-gradient-rose mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Preparing something special for Bhavya…
      </motion.p>

      {/* Progress bar */}
      <div className="h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-600"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.6, ease: 'easeInOut' }}
          onAnimationComplete={() => setTimeout(onDone, 300)}
        />
      </div>

      {/* Sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-rose-300/60"
          style={{ fontSize: 14 }}
          initial={{
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 400,
            opacity: 0,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          ✨
        </motion.span>
      ))}
    </motion.div>
  );
}
