import { motion, useScroll, useTransform } from 'framer-motion';
import type { RefObject } from 'react';

interface CurveDividerProps {
  targetRef?: RefObject<HTMLElement | null>;
  fill?: string;
}

export default function CurveDivider({ targetRef, fill = "#ffffff" }: CurveDividerProps) {
  const { scrollY } = useScroll();

  // Track target-specific scroll progress if targetRef is provided, otherwise track global window scroll
  const { scrollYProgress } = useScroll(
    targetRef ? { target: targetRef, offset: ["end end", "end start"] } : {}
  );

  // Map progress to path control point Y-coordinate
  // If targetRef is provided, transition from flat (100) -> curved (0) -> flat (100) on progress [0, 0.25, 0.5]
  // Else, map scroll offset [0, 100, 200] -> [100, 0, 100]
  const pathVal = targetRef
    ? useTransform(scrollYProgress, [0, 0.25, 0.5], [100, 0, 100])
    : useTransform(scrollY, [0, 100, 200], [100, 0, 100]);

  // Interpolate the control point into the SVG path string
  const pathD = useTransform(pathVal, (y) => `M 0 100 Q 720 ${y} 1440 100 L 1440 100 L 0 100 Z`);

  return (
    <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none z-20 select-none">
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[100px] lg:h-[120px] block"
      >
        <motion.path
          d={pathD}
          fill={fill}
        />
      </svg>
    </div>
  );
}
