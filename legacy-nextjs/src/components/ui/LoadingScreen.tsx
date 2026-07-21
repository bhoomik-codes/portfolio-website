'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);
  const [fakeProgress, setFakeProgress] = useState(0);

  // Fallback fake progress just in case 3D loads instantly or fails, 
  // ensuring the loading screen stays up for a brief "premium" moment
  useEffect(() => {
    const interval = setInterval(() => {
      setFakeProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 12;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const displayProgress = Math.min(100, Math.max(fakeProgress, progress));

  useEffect(() => {
    if (displayProgress >= 100) {
      const timeout = setTimeout(() => setShow(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [displayProgress]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#080B14',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ 
              fontSize: '4.5rem', 
              fontWeight: 'bold', 
              marginBottom: '2.5rem', 
              fontFamily: 'var(--font-mono, monospace)',
              background: 'linear-gradient(135deg, #5E5CE6 0%, #A358DF 50%, #00E5CC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(94,92,230,0.4))'
            }}
          >
            &lt; B./ &gt;
          </motion.div>
          <div style={{ width: '260px', height: '1px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden', position: 'relative' }}>
            <motion.div 
              style={{ 
                height: '100%', 
                background: '#5E5CE6', 
                boxShadow: '0 0 10px #5E5CE6',
                position: 'absolute',
                left: 0,
                top: 0,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${displayProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div style={{ 
            marginTop: '1.5rem', 
            fontFamily: 'var(--font-mono, monospace)', 
            fontSize: '0.75rem',
            color: '#A8A8B3',
            letterSpacing: '0.3em'
          }}>
            SYSTEM INITIALIZATION {Math.round(displayProgress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
