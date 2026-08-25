import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Calendar } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import { PHOTOS } from '@/data/content';
import { heartExplosion } from '@/utils/confetti';

export default function PhotoGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0014] via-[#1a0b2e] to-[#0a0014] py-20"
    >
      <FloatingParticles count={16} />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-4 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="rounded-full glass px-5 py-2 text-sm tracking-widest text-rose-200">
            📸 OUR BEAUTIFUL MEMORIES
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
            Our Beautiful Memories
          </span>
        </motion.h2>
        <motion.p
          className="mb-12 text-center font-serif-romantic text-lg text-rose-100/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Every photo is a piece of our love story, Bhavya. ❤️
        </motion.p>

        {/* Masonry-style grid */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {PHOTOS.map((photo, idx) => (
            <motion.button
              key={idx}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl text-left focus:outline-none"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.15, duration: 0.6 }}
              onClick={() => setActive(idx)}
            >
              {/* Polaroid frame */}
              <div className="bg-[#fff5ec] p-3 pb-12 shadow-xl transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-1">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Heart overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-2 right-2 rounded-full bg-rose-500/80 p-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <Heart className="h-4 w-4 fill-white text-white" />
                  </div>
                </div>
                {/* Caption */}
                <p className="mt-3 px-1 font-dancing text-lg text-rose-800">
                  {photo.caption}
                </p>
                <p className="px-1 text-xs text-rose-400">{photo.date}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
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

            {/* Prev / Next */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full glass p-3 text-white transition hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setActive((p) =>
                  p === null ? 0 : (p - 1 + PHOTOS.length) % PHOTOS.length
                );
              }}
            >
              ‹
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full glass p-3 text-white transition hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setActive((p) =>
                  p === null ? 0 : (p + 1) % PHOTOS.length
                );
              }}
            >
              ›
            </button>

            <motion.div
              key={active}
              className="relative max-h-[85vh] max-w-3xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-hidden rounded-2xl bg-[#fff5ec] p-4 pb-14 shadow-2xl">
                <img
                  src={PHOTOS[active].src}
                  alt={PHOTOS[active].caption}
                  className="max-h-[65vh] w-full rounded-lg object-contain"
                />
                <div className="mt-4 flex items-center justify-between px-2">
                  <div>
                    <p className="font-dancing text-2xl text-rose-800">
                      {PHOTOS[active].caption}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-rose-400">
                      <Calendar className="h-3 w-3" />
                      {PHOTOS[active].date}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      heartExplosion(
                        window.innerWidth / 2,
                        window.innerHeight / 2
                      )
                    }
                    className="rounded-full bg-rose-500 p-3 text-white transition hover:scale-110"
                  >
                    <Heart className="h-5 w-5 fill-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
