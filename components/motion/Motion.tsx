"use client";

import { type ElementType, type MouseEvent, useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";

type MotionWrapperProps = {
  children: ReactNode;
  className?: string;
};

type FloatProps = MotionWrapperProps & {
  distance?: number;
  duration?: number;
};

type FadeUpProps = MotionWrapperProps & {
  subtle?: boolean;
  variant?: "slide-up" | "fade" | "blur" | "scale";
};

type RevealDirection = "up" | "down" | "left" | "right";

type RevealProps = MotionWrapperProps & {
  direction?: RevealDirection;
};

type TextRevealMode = "words" | "chars" | "lines";

type TextRevealProps = {
  text?: string;
  as?: ElementType;
  mode?: TextRevealMode;
  direction?: RevealDirection | "random";
  stagger?: number;
  delay?: number;
  className?: string;
};

const premiumEase = [0.22, 1, 0.36, 1] as const;

const fadeUpTransition = {
  duration: 1.05,
  ease: premiumEase,
} as const;

const revealTransition = {
  duration: 0.78,
  ease: premiumEase,
} as const;

function getRevealState(variant: FadeUpProps["variant"], subtle: boolean) {
  if (variant === "fade") {
    return { opacity: 0 };
  }

  if (variant === "blur") {
    return { opacity: 0, y: subtle ? 8 : 14 };
  }

  if (variant === "scale") {
    return { opacity: 0, y: subtle ? 8 : 14 };
  }

  return { opacity: 0, y: subtle ? 10 : 20 };
}

function getVisibleState(variant: FadeUpProps["variant"]) {
  if (variant === "blur") {
    return { opacity: 1, y: 0 };
  }

  if (variant === "scale") {
    return { opacity: 1, y: 0 };
  }

  if (variant === "fade") {
    return { opacity: 1 };
  }

  return { opacity: 1, y: 0 };
}

function getDirectionalRevealState(direction: RevealDirection) {
  if (direction === "down") {
    return { opacity: 0, y: -18 };
  }

  if (direction === "left") {
    return { opacity: 0, x: 18 };
  }

  if (direction === "right") {
    return { opacity: 0, x: -18 };
  }

  return { opacity: 0, y: 18 };
}

function getTextRevealDirection(direction: TextRevealProps["direction"], index: number): RevealDirection {
  if (direction && direction !== "random") {
    return direction;
  }

  const directions: RevealDirection[] = ["up", "right", "up", "left"];

  return directions[index % directions.length];
}

function getTextRevealParts(text: string, mode: TextRevealMode) {
  if (mode === "chars") {
    return Array.from(text).map((character) => (character === " " ? "\u00a0" : character));
  }

  if (mode === "lines") {
    const lines = text
      .split(/(?<=[.!?])\s+|\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    return lines.length > 0 ? lines : [text];
  }

  return text.split(/(\s+)/).filter((part) => part.length > 0);
}

function getTextRevealStagger(mode: TextRevealMode, stagger?: number) {
  if (typeof stagger === "number") {
    return stagger;
  }

  if (mode === "chars") {
    return 0.014;
  }

  if (mode === "lines") {
    return 0.07;
  }

  return 0.042;
}

export function Reveal({ children, className, direction = "up" }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : getDirectionalRevealState(direction)}
      transition={revealTransition}
      viewport={{ once: true, amount: 0.18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function TextReveal({
  text,
  as: Component = "p",
  mode = "words",
  direction = "up",
  stagger,
  delay = 0,
  className,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isCompactViewport, setIsCompactViewport] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches,
  );
  const trimmedText = text?.trim();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateViewport = () => setIsCompactViewport(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  if (!trimmedText) {
    return null;
  }

  if (prefersReducedMotion || (isCompactViewport && mode === "chars" && trimmedText.length > 18)) {
    return <Component className={className}>{trimmedText}</Component>;
  }

  const parts = getTextRevealParts(trimmedText, mode);
  const itemStagger = getTextRevealStagger(mode, stagger) * (isCompactViewport ? 0.65 : 1);
  const isLineMode = mode === "lines";

  return (
    <Component className={className}>
      <motion.span
        className={isLineMode ? "block" : "inline-block"}
        initial="hidden"
        variants={{
          hidden: {},
          show: {
            transition: {
              delayChildren: isCompactViewport ? delay * 0.5 : delay,
              staggerChildren: itemStagger,
            },
          },
        }}
        viewport={{ once: true, amount: 0.22 }}
        whileInView="show"
      >
        {parts.map((part, index) => {
          const partDirection = getTextRevealDirection(direction, index);

          return (
            <motion.span
              className={isLineMode ? "block" : "inline-block whitespace-pre-wrap"}
              key={`${part}-${index}`}
              variants={{
                hidden: getDirectionalRevealState(partDirection),
                show: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: {
                    duration: isCompactViewport ? 0.48 : mode === "chars" ? 0.54 : 0.62,
                    ease: premiumEase,
                  },
                },
              }}
            >
              {part}
            </motion.span>
          );
        })}
      </motion.span>
    </Component>
  );
}

export function FadeUp({ children, className, subtle = false, variant = "slide-up" }: FadeUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const transition = variant === "scale"
    ? { duration: 1, ease: premiumEase }
    : subtle
      ? { duration: 0.85, ease: premiumEase }
      : fadeUpTransition;

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : getRevealState(variant, subtle)}
      transition={transition}
      viewport={{ once: true, amount: subtle ? 0.12 : 0.18 }}
      whileInView={prefersReducedMotion ? undefined : getVisibleState(variant)}
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
            delayChildren: 0.04,
            staggerChildren: 0.055,
          },
        },
      }}
      viewport={{ once: true, amount: 0.18 }}
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
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: fadeUpTransition,
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

export function StaggerSpan({ children, className }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      className={className}
      variants={
        prefersReducedMotion
          ? undefined
          : {
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: fadeUpTransition,
              },
            }
      }
    >
      {children}
    </motion.span>
  );
}

export function ScaleIn({ children, className }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      transition={{ duration: 1.05, ease: premiumEase }}
      viewport={{ once: true, amount: 0.18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function CinematicZoom({ children, className }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.015 }}
      transition={{ duration: 1.25, ease: premiumEase }}
      viewport={{ once: true, amount: 0.18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
    >
      {children}
    </motion.div>
  );
}

export function HeroBackgroundDepth({ children, className }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = useMemo(() => ({ damping: 32, stiffness: 90, mass: 0.55 }), []);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    x.set(relativeX * 24);
    y.set(relativeY * 24);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.06 }}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      transition={{ duration: 1.15, ease: premiumEase }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
    >
      <motion.div
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.025, 1] }}
        className="h-full w-full"
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 22,
                ease: "easeInOut",
                repeat: Infinity,
              }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function TechNetworkOverlay({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={prefersReducedMotion ? undefined : { x: [-18, 18, -18], y: [8, -8, 8], scale: [1, 1.025, 1] }}
      className={className}
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration: 24,
              ease: "easeInOut",
              repeat: Infinity,
            }
      }
    >
      <svg
        aria-hidden="true"
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 900 560"
      >
        <defs>
          <filter id="network-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="network-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.24" />
          </linearGradient>
        </defs>
        <g stroke="url(#network-line)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8">
          <path d="M108 418 C190 348 276 352 358 286 S534 208 674 126" />
          <path d="M190 470 C246 390 328 352 420 340 S606 312 768 210" />
          <path d="M286 154 C354 214 426 246 506 238 S648 198 804 82" />
          <path d="M238 286 L358 286 L420 340 L542 292 L674 126" />
          <path d="M420 340 L506 238 L642 364 L768 210" />
          <path d="M108 418 L190 470 L420 340" />
          <path d="M542 292 L642 364 L804 82" />
        </g>
        <g filter="url(#network-glow)">
          {[
            [108, 418, 2.6],
            [190, 470, 2.3],
            [238, 286, 2],
            [286, 154, 2.1],
            [358, 286, 2.6],
            [420, 340, 3],
            [506, 238, 2.5],
            [542, 292, 2],
            [642, 364, 2.4],
            [674, 126, 2.8],
            [768, 210, 2.4],
            [804, 82, 2.1],
          ].map(([cx, cy, r]) => (
            <circle cx={cx} cy={cy} fill="#93c5fd" key={`${cx}-${cy}`} r={r} />
          ))}
        </g>
      </svg>
    </motion.div>
  );
}

export function HeroFloat({ children, className, distance = 8, duration = 5 }: FloatProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={prefersReducedMotion ? undefined : { y: [0, -distance, 0] }}
      className={className}
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration,
              ease: "easeInOut",
              repeat: Infinity,
            }
      }
    >
      {children}
    </motion.div>
  );
}
