import { useEffect, useRef, useState } from "react";

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);

    // Fallback: check if element is already in view on mount
    // (handles standalone pages where content is visible immediately)
    const rect = el.getBoundingClientRect();
    const visible = (Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)) / rect.height;
    if (visible >= threshold) {
      setInView(true);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
