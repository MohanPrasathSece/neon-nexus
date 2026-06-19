import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 25, stiffness: 300 });
  const sy = useSpring(y, { damping: 25, stiffness: 300 });
  const [hovering, setHovering] = useState(false);
  const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    let trailId = 0;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (trailId++ % 3 === 0) {
        const id = Date.now() + Math.random();
        setTrails((t) => [...t.slice(-12), { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => setTrails((t) => t.filter((p) => p.id !== id)), 600);
      }
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [role='button'], input, .magnetic"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <>
      {trails.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none fixed z-[9998] h-2 w-2 rounded-full"
          style={{
            left: p.x - 4,
            top: p.y - 4,
            background: "var(--neon-cyan)",
            boxShadow: "0 0 12px var(--neon-cyan)",
            animation: "fade-out 0.6s ease-out forwards",
          }}
        />
      ))}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full mix-blend-screen"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 48 : 20,
          height: hovering ? 48 : 20,
          background: "radial-gradient(circle, oklch(0.88 0.17 200 / 0.8), transparent 70%)",
          boxShadow: "0 0 30px var(--neon-cyan), 0 0 60px var(--neon-purple)",
          transition: "width 0.2s, height 0.2s",
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9999] h-1 w-1 rounded-full bg-white"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}