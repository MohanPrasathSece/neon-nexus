import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // particles
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.4,
      hue: Math.random() > 0.5 ? 195 : 285,
    }));

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      // connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.strokeStyle = `hsla(${a.hue}, 100%, 60%, ${0.15 * (1 - d / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `hsla(${a.hue}, 100%, 70%, 0.8)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base gradients */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 10%, oklch(0.2 0.15 295 / 0.4), transparent 50%), radial-gradient(ellipse at 80% 80%, oklch(0.2 0.2 200 / 0.35), transparent 50%), radial-gradient(ellipse at 50% 50%, oklch(0.15 0.18 340 / 0.2), transparent 60%)" }} />
      {/* cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      {/* scan line */}
      <div className="absolute inset-x-0 h-32 opacity-20" style={{ background: "linear-gradient(to bottom, transparent, var(--neon-cyan), transparent)", animation: "scan-line 8s linear infinite" }} />
      {/* aurora blobs */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full animate-aurora" style={{ background: "var(--neon-cyan)", filter: "blur(120px)", opacity: 0.4 }} />
      <div className="absolute top-1/3 -right-40 h-[700px] w-[700px] rounded-full animate-aurora" style={{ background: "var(--neon-purple)", filter: "blur(140px)", opacity: 0.35, animationDelay: "1.5s" }} />
      <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full animate-aurora" style={{ background: "var(--neon-pink)", filter: "blur(120px)", opacity: 0.25, animationDelay: "3s" }} />
      {/* particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* noise overlay */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
    </div>
  );
}