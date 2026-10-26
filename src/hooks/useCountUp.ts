import { useState, useEffect, useLayoutEffect, useRef } from "react";

export function useCountUp(end: number, duration = 2000, start = 0, trigger = true) {
  // Until the animation starts, show the real final value. The prerendered HTML that crawlers
  // read then carries the true figure instead of the starting 0; the animation still runs
  // from `start` once the stat scrolls into view.
  const [value, setValue] = useState(end);
  const [animating, setAnimating] = useState(false);
  const rafRef = useRef<number>(0);

  useLayoutEffect(() => {
    if (!trigger) return;
    setValue(start);
    setAnimating(true);
  }, [trigger, start]);

  useEffect(() => {
    if (!trigger) return;

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (end - start) * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration, start, trigger]);

  return animating ? value : end;
}
