import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Heart } from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';
import LandingScreen from '@/components/LandingScreen';
import CakeSection from '@/components/CakeSection';
import PhotoGallery from '@/components/PhotoGallery';
import VideosSection from '@/components/VideosSection';
import LoveQuotes from '@/components/LoveQuotes';
import Surprises from '@/components/Surprises';
import Timeline from '@/components/Timeline';
import FinalMessage from '@/components/FinalMessage';
import MusicPlayer from '@/components/MusicPlayer';
import CursorHearts from '@/components/CursorHearts';

type Phase = 'loading' | 'landing' | 'journey';

export default function App() {
  const [phase, setPhase] = useState<Phase>('loading');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Lock scroll during loading/landing
  useEffect(() => {
    if (phase !== 'journey') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [phase]);

  return (
    <div className="relative min-h-screen bg-[#0a0014] text-[#fff5ec]">
      <CursorHearts />

      {/* Scroll progress bar */}
      {phase === 'journey' && (
        <motion.div
          className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-rose-400 via-rose-500 to-pink-600"
          style={{ scaleX: progress }}
        />
      )}

      {/* Loading */}
      <AnimatePresence>
        {phase === 'loading' && (
          <LoadingScreen onDone={() => setPhase('landing')} />
        )}
      </AnimatePresence>

      {/* Landing */}
      <AnimatePresence>
        {phase === 'landing' && (
          <LandingScreen onStart={() => setPhase('journey')} />
        )}
      </AnimatePresence>

      {/* Journey sections */}
      <AnimatePresence>
        {phase === 'journey' && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <CakeSection />
            <PhotoGallery />
            <VideosSection />
            <LoveQuotes />
            <Surprises />
            <Timeline />
            <FinalMessage />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Music player — always available after loading */}
      {phase !== 'loading' && <MusicPlayer />}

      {/* Floating corner heart */}
      {phase === 'journey' && (
        <motion.div
          className="fixed bottom-6 left-6 z-[60] flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-rose-200"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="h-4 w-4 fill-rose-500 text-rose-400" />
          </motion.span>
          <span className="font-dancing text-lg">For Bhavya</span>
        </motion.div>
      )}
    </div>
  );
}
