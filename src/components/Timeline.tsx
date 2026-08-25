import { motion } from 'framer-motion';
import FloatingParticles from './FloatingParticles';
import { TIMELINE } from '@/data/content';

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#0a0014] via-[#1a0b2e] to-[#0a0014] py-24"
    >
      <FloatingParticles count={14} />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <motion.div
          className="mb-4 flex items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="rounded-full glass px-5 py-2 text-sm tracking-widest text-rose-200">
            🥰 OUR JOURNEY
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
            The Story of Us
          </span>
        </motion.h2>
        <motion.p
          className="mb-16 text-center font-serif-romantic text-lg text-rose-100/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Every moment with you is a chapter worth remembering, Bhavya. ❤️
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-rose-400 via-rose-600 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-12">
            {TIMELINE.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  className={`relative flex items-center ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7 }}
                >
                  {/* Dot */}
                  <div className="absolute left-4 z-10 -translate-x-1/2 sm:left-1/2">
                    <motion.div
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 glow-rose"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-12 w-full sm:ml-0 sm:w-1/2 ${
                      isLeft ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'
                    }`}
                  >
                    <motion.div
                      className="overflow-hidden rounded-2xl glass-rose"
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 to-transparent" />
                        <span className="absolute bottom-2 left-2 rounded-full bg-rose-500/80 px-3 py-1 text-xs text-white">
                          {item.date}
                        </span>
                      </div>
                      {/* Text */}
                      <div className={`p-5 ${isLeft ? 'sm:text-right' : ''}`}>
                        <h3 className="font-dancing text-2xl text-rose-200">
                          {item.title}
                        </h3>
                        <p className="mt-2 font-serif-romantic text-rose-100/70">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
