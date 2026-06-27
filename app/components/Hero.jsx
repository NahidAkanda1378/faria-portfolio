'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Hero.module.css';

// Graph network animation — referencing graph decomposition research
function GraphNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Graph nodes — placed to form a visually interesting structure
    const getNodes = () => {
      const w = W(), h = H();
      return [
        { x: w * 0.15, y: h * 0.25 },
        { x: w * 0.38, y: h * 0.12 },
        { x: w * 0.62, y: h * 0.18 },
        { x: w * 0.85, y: h * 0.30 },
        { x: w * 0.72, y: h * 0.55 },
        { x: w * 0.50, y: h * 0.70 },
        { x: w * 0.25, y: h * 0.60 },
        { x: w * 0.08, y: h * 0.48 },
        { x: w * 0.45, y: h * 0.40 },
        { x: w * 0.78, y: h * 0.78 },
        { x: w * 0.18, y: h * 0.82 },
        { x: w * 0.92, y: h * 0.62 },
      ];
    };

    const edges = [
      [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],
      [0,8],[1,8],[2,8],[3,4],[4,11],[5,9],[6,10],[7,6],
      [8,4],[8,5],[1,3],[2,4],[5,10],[9,11],[3,11],
    ];

    let nodes = getNodes();
    let progress = 0; // 0 to edges.length
    let nodePhase = 0; // pulse phase
    let animId;

    const draw = () => {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      // Draw completed edges
      const completedEdges = Math.floor(progress);
      const partialFraction = progress - completedEdges;

      for (let i = 0; i < completedEdges && i < edges.length; i++) {
        const [a, b] = edges[i];
        ctx.beginPath();
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
        ctx.strokeStyle = i % 3 === 0 ? 'rgba(43,78,255,0.25)' : i % 3 === 1 ? 'rgba(123,63,228,0.2)' : 'rgba(43,78,255,0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw currently-drawing edge
      if (completedEdges < edges.length) {
        const [a, b] = edges[completedEdges];
        const x1 = nodes[a].x, y1 = nodes[a].y;
        const x2 = nodes[b].x, y2 = nodes[b].y;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + (x2 - x1) * partialFraction, y1 + (y2 - y1) * partialFraction);
        ctx.strokeStyle = 'rgba(43,78,255,0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw nodes
      nodes.forEach((n, i) => {
        const isActive = Math.floor(progress) >= edges.findIndex(e => e.includes(i));
        const pulse = Math.sin(nodePhase + i * 0.7) * 0.5 + 0.5;
        const r = isActive ? 5 + pulse * 2 : 4;

        // Outer glow
        if (isActive) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 6, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? `rgba(43,78,255,${0.06 * pulse})` : `rgba(123,63,228,${0.06 * pulse})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isActive
          ? (i % 2 === 0 ? '#2B4EFF' : '#7B3FE4')
          : 'rgba(43,78,255,0.2)';
        ctx.fill();

        // Node label (v_i)
        if (isActive) {
          ctx.fillStyle = 'rgba(43,78,255,0.5)';
          ctx.font = `10px JetBrains Mono, monospace`;
          ctx.fillText(`v${i}`, n.x + 8, n.y - 6);
        }
      });

      nodePhase += 0.025;
      if (progress < edges.length) {
        progress += 0.18;
      }

      animId = requestAnimationFrame(draw);
    };

    const resizeAndReset = () => {
      resize();
      nodes = getNodes();
    };
    window.addEventListener('resize', resizeAndReset);

    const startTimer = setTimeout(() => { animId = requestAnimationFrame(draw); }, 300);

    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', resizeAndReset);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}

export default function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);

  return (
    <section className={styles.hero}>
      {/* Subtle math grid background */}
      <div className={styles.gridBg} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={`${styles.eyebrow} ${vis ? styles.vis : ''}`}>
            <span className={styles.mono}>Ph.D. Candidate · Mathematical Sciences</span>
            <span className={styles.location}>Michigan Technological University</span>
          </div>

          <h1 className={`${styles.name} ${vis ? styles.vis : ''}`}>
            Faria<br />
            <span className={styles.nameItalic}>Tasnim</span>
          </h1>

          <p className={`${styles.tagline} ${vis ? styles.vis : ''}`}>
            Researching graph decompositions and partition theory.
            Teaching calculus. Building mathematical structures from the ground up.
          </p>

          <div className={`${styles.actions} ${vis ? styles.vis : ''}`}>
            <button className={styles.primary} onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })}>
              View Research
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="mailto:fariat@mtu.edu" className={styles.secondary}>
              fariat@mtu.edu
            </a>
          </div>

          <div className={`${styles.stats} ${vis ? styles.vis : ''}`}>
            <div className={styles.stat}>
              <span className={styles.statNum}>2027</span>
              <span className={styles.statLabel}>Expected PhD</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>2</span>
              <span className={styles.statLabel}>Active Research Projects</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>♛</span>
              <span className={styles.statLabel}>Chess Grandmaster</span>
            </div>
          </div>
        </div>

        <div className={`${styles.right} ${vis ? styles.vis : ''}`}>
          <div className={styles.portraitFrame}>
            <GraphNetwork />
            <div className={styles.portraitShell}>
              <Image
                src="/img/faria.png"
                alt="Faria Tasnim"
                fill
                sizes="(max-width: 900px) min(88vw, 420px), 460px"
                priority
                className={styles.portrait}
              />
            </div>
            <div className={styles.caption}>
              <span className={styles.captionKicker}>Graph theory · partition theory</span>
              <span>Mathematical Sciences, Michigan Tech</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
