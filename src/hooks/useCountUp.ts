import { useState, useEffect, useRef } from "react";

export function useCountUp(end: number, duration = 2000, start = 0, trigger = true) {
  const [value, setValue] = useState(start);
  const rafRef = useRef<number>(0);

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

  return value;
}
