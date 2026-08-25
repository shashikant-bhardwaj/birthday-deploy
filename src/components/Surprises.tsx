import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Mail, Heart, Sparkles, X } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import {
  GIFT_BOX_MESSAGE,
  LOVE_LETTER,
  SECRET_HEART_MESSAGE,
  BIRTHDAY_WISH_MESSAGE,
} from '@/data/content';
import {
  confettiBurst,
  heartExplosion,
  fireworks,
} from '@/utils/confetti';

export default function Surprises() {
  const [giftOpen, setGiftOpen] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [heartRevealed, setHeartRevealed] = useState(false);
  const [wishShown, setWishShown] = useState(false);

  return (
    <section
      id="surprises"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0014] via-[#1a0b2e] to-[#0a0014] py-24"
    >
      <FloatingParticles count={18} />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-4 flex items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="rounded-full glass px-5 py-2 text-sm tracking-widest text-rose-200">
            🎁 HIDDEN SURPRISES
          </span>
        </motion.div>

        <motion.h2
          className="mb-4 text-center font-script text-4xl sm:text-6xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gradient-rose text-glow-rose">
            Click to Reveal Your Surprises
          </span>
        </motion.h2>
        <motion.p
          className="mb-14 text-center font-serif-romantic text-lg text-rose-100/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Each one holds a little piece of my heart, Bhavya. 💕
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Gift Box */}
          <SurpriseCard
            title="Surprise Gift Box"
            icon={<Gift className="h-5 w-5" />}
            onReveal={() => {
              setGiftOpen(true);
              confettiBurst();
              heartExplosion();
            }}
          >
            <GiftBox open={giftOpen} />
          </SurpriseCard>

          {/* Love Letter */}
          <SurpriseCard
            title="Love Letter"
            icon={<Mail className="h-5 w-5" />}
            onReveal={() => setLetterOpen(true)}
          >
            <Envelope open={letterOpen} />
          </SurpriseCard>

          {/* Secret Heart */}
          <SurpriseCard
            title="Secret Heart"
            icon={<Heart className="h-5 w-5" />}
            onReveal={() => {
              setHeartRevealed(true);
              heartExplosion();
            }}
          >
            <SecretHeart revealed={heartRevealed} />
          </SurpriseCard>
        </div>

        {/* Birthday Wish Button — full width */}
        <div className="mt-14 text-center">
          <motion.button
            onClick={() => {
              setWishShown(true);
              fireworks();
            }}
            className="btn-shine inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-700 px-10 py-5 text-xl font-semibold text-white animate-pulse-glow transition-transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="h-6 w-6" />
            Click for Your Special Birthday Wish ❤️
          </motion.button>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {giftOpen && (
          <SurpriseModal onClose={() => setGiftOpen(false)}>
            <motion.div
              className="text-6xl"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎁
            </motion.div>
            <p className="mt-6 font-serif-romantic text-2xl italic text-rose-50 sm:text-3xl">
              {GIFT_BOX_MESSAGE}
            </p>
          </SurpriseModal>
        )}

        {letterOpen && (
          <SurpriseModal onClose={() => setLetterOpen(false)}>
            <motion.div
              className="max-h-[70vh] w-full max-w-lg overflow-y-auto rounded-lg bg-[#fff5ec] p-8 sm:p-12 shadow-2xl"
              initial={{ scale: 0.8, rotateX: -30, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{ transformOrigin: 'top' }}
            >
              <pre
                className="font-dancing whitespace-pre-wrap text-xl leading-relaxed text-rose-900 sm:text-2xl"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {LOVE_LETTER}
              </pre>
            </motion.div>
          </SurpriseModal>
        )}

        {heartRevealed && (
          <SurpriseModal onClose={() => setHeartRevealed(false)}>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="h-20 w-20 fill-rose-500 text-rose-400" />
            </motion.div>
            <p className="mt-6 font-serif-romantic text-2xl italic text-rose-50 sm:text-3xl">
              {SECRET_HEART_MESSAGE}
            </p>
          </SurpriseModal>
        )}

        {wishShown && (
          <SurpriseModal onClose={() => setWishShown(false)} large>
            <motion.div
              className="text-5xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              🎂✨
            </motion.div>
            <h3 className="mt-4 font-script text-4xl text-gradient-gold sm:text-5xl">
              Happy Birthday, Bhavya!
            </h3>
            <p className="mt-4 max-w-md font-serif-romantic text-xl text-rose-50">
              {BIRTHDAY_WISH_MESSAGE}
            </p>
          </SurpriseModal>
        )}
      </AnimatePresence>
    </section>
  );
}

// ---- Sub-components ----

function SurpriseCard({
  title,
  icon,
  onReveal,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  onReveal: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="group glass-rose flex flex-col items-center rounded-3xl p-8 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-4 flex items-center gap-2 text-sm tracking-widest text-rose-200">
        {icon}
        {title.toUpperCase()}
      </div>
      <button
        onClick={onReveal}
        className="relative flex h-48 w-full items-center justify-center rounded-2xl bg-gradient-to-b from-rose-900/30 to-transparent transition hover:from-rose-800/40"
      >
        {children}
      </button>
    </motion.div>
  );
}

function SurpriseModal({
  onClose,
  children,
  large,
}: {
  onClose: () => void;
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        className="absolute right-6 top-6 rounded-full glass p-3 text-white transition hover:scale-110"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>
      <motion.div
        className={`flex flex-col items-center text-center ${
          large ? 'max-w-2xl' : 'max-w-lg'
        }`}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function GiftBox({ open }: { open: boolean }) {
  return (
    <motion.div
      className="relative"
      animate={open ? { y: -10 } : { y: 0 }}
    >
      {/* Lid */}
      <motion.div
        className="absolute -top-6 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rounded-t-md"
        style={{ background: 'linear-gradient(180deg,#ff4d6d,#c9184a)' }}
        animate={open ? { y: -40, rotate: -15 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.5 }}
      />
      {/* Box body */}
      <div
        className="h-24 w-28 rounded-md"
        style={{ background: 'linear-gradient(180deg,#c9184a,#8b0033)' }}
      >
        {/* Ribbon */}
        <div className="absolute left-1/2 top-0 h-full w-3 -translate-x-1/2 bg-rose-300/80" />
      </div>
      {/* Bow */}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl"
        animate={open ? { y: -50, opacity: 0 } : { y: 0, opacity: 1 }}
      >
        🎀
      </motion.div>
      {/* Contents when open */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <span className="text-3xl">❤️✨💖</span>
          </motion.div>
        )}
      </AnimatePresence>
      {!open && (
        <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-rose-200/60">
          Click to open
        </p>
      )}
    </motion.div>
  );
}

function Envelope({ open }: { open: boolean }) {
  return (
    <motion.div className="relative" animate={open ? { scale: 1.05 } : { scale: 1 }}>
      <div
        className="relative h-28 w-40 overflow-hidden rounded-md"
        style={{ background: 'linear-gradient(180deg,#ff8fa3,#c9184a)' }}
      >
        {/* Flap */}
        <motion.div
          className="absolute left-0 top-0 h-0 w-0"
          style={{
            borderLeft: '80px solid transparent',
            borderRight: '80px solid transparent',
            borderTop: '56px solid #ff4d6d',
          }}
          animate={open ? { rotateX: 180, y: -2 } : { rotateX: 0, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        {/* Letter peeking out */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute left-1/2 top-3 z-0 h-20 w-32 -translate-x-1/2 rounded-sm bg-[#fff5ec] shadow"
              initial={{ y: 0 }}
              animate={{ y: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-2 text-[8px] leading-tight text-rose-800">
                Dear Bhavya…
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {!open && (
        <p className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-rose-200/60">
          Click to open
        </p>
      )}
    </motion.div>
  );
}

function SecretHeart({ revealed }: { revealed: boolean }) {
  return (
    <motion.div
      className="relative"
      animate={revealed ? { scale: 1.3 } : { scale: 1 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -5, 5, 0],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Heart
          className="h-24 w-24 fill-rose-500 text-rose-400"
          style={{ filter: 'drop-shadow(0 0 20px rgba(255,77,109,0.8))' }}
        />
      </motion.div>
      {!revealed && (
        <p className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-rose-200/60">
          Click the heart
        </p>
      )}
    </motion.div>
  );
}
