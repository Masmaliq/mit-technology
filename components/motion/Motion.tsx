"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MotionWrapperProps = {
  children: ReactNode;
  className?: string;
};

type FadeUpProps = MotionWrapperProps & {
  subtle?: boolean;
};

const premiumEase = [0.22, 1, 0.36, 1] as const;

const fadeUpTransition = {
  duration: 0.85,
  ease: premiumEase,
} as const;

export function FadeUp({ children, className, subtle = false }: FadeUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const transition = subtle ? { duration: 0.65, ease: premiumEase } : fadeUpTransition;

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: subtle ? 20 : 48 }}
      transition={transition}
      viewport={{ once: true, amount: subtle ? 0.18 : 0.25 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: 0.15,
            staggerChildren: 0.12,
          },
        },
      }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={prefersReducedMotion ? undefined : "show"}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        prefersReducedMotion
          ? undefined
          : {
              hidden: { opacity: 0, y: 36, scale: 0.985 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: fadeUpTransition,
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 24 }}
      transition={{ duration: 0.9, ease: premiumEase }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function HeroFloat({ children, className }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
      className={className}
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
            }
      }
    >
      {children}
    </motion.div>
  );
}
