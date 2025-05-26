// src/components/admin/loginBackgroundEffect.ts

export function startBackgroundEffect(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return { stop: () => {} };

  let animationFrameId: number;
  let particles: { x: number; y: number; vx: number; vy: number }[] = [];
  const mouse = { x: -9999, y: -9999 };
  const reveal = { active: false, timer: null as NodeJS.Timeout | null };
  const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 20000);
  const maxLineDist = 100;

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }
  }

  function onMouseMove(e: MouseEvent) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    reveal.active = false;
    if (reveal.timer) clearTimeout(reveal.timer);
    reveal.timer = setTimeout(() => { reveal.active = true; }, 2000);
  }
  function onMouseLeave() {
    mouse.x = -9999; mouse.y = -9999;
    reveal.active = false;
    if (reveal.timer) clearTimeout(reveal.timer);
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const time = performance.now() * 0.0002;

    // Draw animated network behind
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }
    // draw lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx,dy);
        if (d < maxLineDist) {
          const hue = ((d / maxLineDist) * 60 + time*60) % 360;
          ctx.strokeStyle = `hsl(${hue}, 80%, 60%)`;
          ctx.globalAlpha = 1 - d/maxLineDist;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    // overlay dark
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // reveal mask on hold
    if (reveal.active && mouse.x>=0 && mouse.y>=0) {
      const r = 150;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      const grad = ctx.createRadialGradient(mouse.x,mouse.y,0,mouse.x,mouse.y,r);
      grad.addColorStop(0,'rgba(0,0,0,1)'); grad.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(mouse.x,mouse.y,r,0,Math.PI*2); ctx.fill();
      ctx.restore();

      // glow border
      ctx.save();
      ctx.strokeStyle = 'rgba(100,150,255,0.8)';
      ctx.lineWidth = 2; ctx.shadowBlur=20; ctx.shadowColor='rgba(100,150,255,0.5)';
      ctx.beginPath(); ctx.arc(mouse.x,mouse.y,r,0,Math.PI*2); ctx.stroke();
      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseleave', onMouseLeave);
  animate();

  return { stop() {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseleave', onMouseLeave);
    if (reveal.timer) clearTimeout(reveal.timer);
  }};
}
