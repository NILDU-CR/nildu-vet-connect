import { useEffect, useRef } from 'react';

interface Star {
  x: number; y: number; vx: number; vy: number; r: number;
}

const ConstellationBackground = ({ density = 70 }: { density?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();
  const mouse = useRef({ x: -500, y: -500 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generate();
    };

    const generate = () => {
      const count = Math.min(density, Math.floor((canvas.width * canvas.height) / 15000));
      starsRef.current = Array.from({ length: count }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const stars = starsRef.current;
      // Draw lines
      for (let i = 0; i < stars.length; i++) {
        const a = stars[i];
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = dx * dx + dy * dy;
          if (dist < 120 * 120) {
            const op = 1 - dist / (120 * 120);
            ctx.strokeStyle = `rgba(0,200,170,${op * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // Draw stars
      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(140,255,230,0.85)';
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // Glow around mouse
      if (mouse.current.x > 0) {
        const gradient = ctx.createRadialGradient(mouse.current.x, mouse.current.y, 0, mouse.current.x, mouse.current.y, 140);
        gradient.addColorStop(0, 'rgba(0,255,210,0.25)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, 140, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const update = () => {
      const stars = starsRef.current;
      for (const s of stars) {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = canvas.width; else if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height; else if (s.y > canvas.height) s.y = 0;
      }
    };

    const loop = () => {
      update();
      draw();
      animationRef.current = requestAnimationFrame(loop);
    };

    resize();
    loop();

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => { mouse.current.x = -500; mouse.current.y = -500; };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default ConstellationBackground;
