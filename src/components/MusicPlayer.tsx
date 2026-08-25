import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { MUSIC_SRC, MUSIC_TITLE, MUSIC_ARTIST } from '@/data/content';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [expanded, setExpanded] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setHasAudio(Boolean(MUSIC_SRC));
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || !hasAudio) {
      setExpanded(true);
      return;
    }
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => setExpanded(true));
    }
    setPlaying(!playing);
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SRC || undefined}
        loop
        preload="none"
      />

      <motion.div
        className="fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="glass-rose mb-2 w-64 rounded-2xl p-4"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Music className="h-4 w-4 text-rose-300" />
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-rose-100">
                    {MUSIC_TITLE}
                  </p>
                  <p className="truncate text-xs text-rose-200/60">
                    {MUSIC_ARTIST}
                  </p>
                </div>
              </div>

              {!hasAudio && (
                <p className="mb-2 text-xs text-rose-200/50">
                  Add your song in{' '}
                  <code className="text-rose-300/70">content.ts</code> to play
                  music.
                </p>
              )}

              {/* Volume slider */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-rose-200 transition hover:scale-110"
                  disabled={!hasAudio}
                >
                  {muted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={muted ? 0 : volume}
                  onChange={handleVolume}
                  disabled={!hasAudio}
                  className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/20 accent-rose-500"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play/pause button */}
        <motion.button
          onClick={togglePlay}
          onMouseEnter={() => setExpanded(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-700 text-white glow-rose"
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          {playing ? (
            <Pause className="h-6 w-6 fill-white" />
          ) : (
            <Play className="h-6 w-6 fill-white" />
          )}
        </motion.button>
      </motion.div>
    </>
  );
}
