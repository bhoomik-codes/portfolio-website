'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] } }}
        >
          {/* Animated logo mark */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', width: 64, height: 64 }}
          >
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
              <defs>
                <linearGradient id="lg1" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="0.5" stopColor="#8b5cf6" />
                  <stop offset="1" stopColor="#d946ef" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="60" height="60" rx="16" stroke="url(#lg1)" strokeWidth="2" />
              <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="url(#lg1)"
                fontFamily="Syne, sans-serif" fontWeight="800" fontSize="28">B</text>
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#4b5568', letterSpacing: '0.15em' }}
          >
            INITIALIZING
          </motion.div>

          <div className="loading-bar-track">
            <div className="loading-bar-fill" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
