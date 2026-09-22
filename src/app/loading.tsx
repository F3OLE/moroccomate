'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export default function Loading() {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-pattern">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          animate={
            reduce
              ? undefined
              : { opacity: [0.55, 1, 0.55], scale: [0.98, 1, 0.98] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={72}
            height={72}
            className="w-16 h-16 sm:w-[72px] sm:h-[72px]"
            priority
          />
        </motion.div>
        <p className="text-sm text-[#2C3E50]/55 tracking-wide">Loading</p>
      </motion.div>
    </div>
  );
}
