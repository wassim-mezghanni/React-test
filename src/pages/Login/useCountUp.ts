import { useEffect, useState } from 'react';

/**
 * Remotion-inspired interpolate counter: animates a number from 0 to target
 * with spring overshoot (briefly exceeds target, then settles).
 */
export function useCountUp(
  target: number,
  delay: number = 0,
  duration: number = 1200,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const overshoot = 1.08;

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);

        // Spring-like easing: overshoot then settle
        let eased: number;
        if (progress < 0.7) {
          // Accelerate to overshoot
          const t = progress / 0.7;
          eased = t * t * overshoot;
        } else if (progress < 0.85) {
          // Pull back from overshoot
          const t = (progress - 0.7) / 0.15;
          eased = overshoot - t * (overshoot - 0.97);
        } else {
          // Settle to 1
          const t = (progress - 0.85) / 0.15;
          eased = 0.97 + t * 0.03;
        }

        setValue(target * Math.min(eased, overshoot));

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setValue(target);
        }
      };

      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timeout);
  }, [target, delay, duration]);

  return value;
}
