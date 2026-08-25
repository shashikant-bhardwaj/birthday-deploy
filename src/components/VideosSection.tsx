import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Volume2, VolumeX } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import { VIDEOS } from '@/data/content';

export default function VideosSection() {
  const [active, setActive] = useState<number | null>(null);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      id="videos"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0014] via-[#1a0b2e] to-[#0a0014] py-20"
    >
      <FloatingParticles count={12} />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          className="mb-4 flex items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="rounded-full glass px-5 py-2 text-sm tracking-widest text-rose-200">
            🎥 OUR VIDEOS
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
            Moments in Motion
          </span>
        </motion.h2>
        <motion.p
          className="mb-12 text-center font-serif-romantic text-lg text-rose-100/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Memories I will always cherish with you, Bhavya. ✨
        </motion.p>

        <div
  className={`grid gap-8 ${
    VIDEOS.length === 1
      ? 'max-w-md mx-auto justify-center'
      : 'sm:grid-cols-2'
  }`}
>
          {VIDEOS.map((video, idx) => (
            <motion.div
              key={idx}
              className="group cursor-pointer overflow-hidden rounded-2xl glass-rose"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              onClick={() => setActive(idx)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.poster}
                  alt={video.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/90 glow-rose"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Play className="h-7 w-7 fill-white text-white" />
                  </motion.div>
                </div>
                {/* Pulse ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 animate-ping rounded-full border-2 border-rose-400/50" />
                </div>
              </div>
              {/* Caption */}
              <div className="p-5">
                <h3 className="font-dancing text-2xl text-rose-200">
                  {video.title}
                </h3>
                <p className="mt-1 font-serif-romantic text-rose-100/70">
                  {video.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note about adding videos */}
        <p className="mt-10 text-center text-xs text-rose-200/40">
          To add your own videos, see the comments in{' '}
          <code className="text-rose-300/60">src/data/content.ts</code>
        </p>
      </div>

      {/* Fullscreen video player */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              className="absolute right-6 top-6 rounded-full glass p-3 text-white transition hover:scale-110"
              onClick={() => setActive(null)}
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {VIDEOS[active].src ? (
                <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">
                  <video
                    ref={videoRef}
                    src={VIDEOS[active].src}
                    poster={VIDEOS[active].poster}
                    controls
                    autoPlay
                    className="max-h-[80vh] w-full"
                  />
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={VIDEOS[active].poster}
                    alt={VIDEOS[active].title}
                    className="max-h-[80vh] w-full object-contain"
                  />
                  <div className="bg-black/80 p-6 text-center">
                    <p className="font-dancing text-2xl text-rose-200">
                      {VIDEOS[active].title}
                    </p>
                    <p className="mt-2 text-sm text-rose-100/60">
                      Add your video file in{' '}
                      <code className="text-rose-300/70">
                        src/data/content.ts
                      </code>{' '}
                      to play it here.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-4 text-center">
                <h3 className="font-dancing text-2xl text-rose-200">
                  {VIDEOS[active].title}
                </h3>
                <p className="font-serif-romantic text-rose-100/70">
                  {VIDEOS[active].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
