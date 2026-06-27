'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Research.module.css';

const projects = [
  {
    tag: 'Graph Theory',
    color: 'cobalt',
    title: 'Multi-Designs for Graph Pairs of Order 6',
    advisor: 'Dr. Melissa S. Keranen',
    institution: 'Michigan Technological University',
    desc: 'Investigating combinatorial structures arising from multi-designs for graph pairs of order 6. This work explores the intersection of design theory and graph theory — characterizing when a complete graph can be decomposed into copies of a given graph pair, and determining the spectrum of such decompositions.',
    keywords: ['Graph Decomposition', 'Combinatorics', 'Design Theory', 'Multi-designs', 'Complete Graphs'],
    symbol: 'K₆',
  },
  {
    tag: 'Partition Theory',
    color: 'violet',
    title: 'Folded Partition Theory',
    advisor: 'Dr. Robert Schneider',
    institution: 'Michigan Technological University',
    desc: 'Developing new theoretical frameworks within partition structures through the lens of "folded" partitions — a novel combinatorial construction. This research seeks to uncover deeper structural properties and generating functions that connect to number theory and combinatorial identities.',
    keywords: ['Partition Theory', 'Combinatorial Identities', 'Number Theory', 'Generating Functions', 'Discrete Math'],
    symbol: 'λ⊢n',
  },
];

function ProjectCard({ p, index }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.card} ${styles[`card_${p.color}`]} ${vis ? styles.vis : ''}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className={styles.cardTop}>
        <span className={`${styles.tag} ${styles[`tag_${p.color}`]}`}>{p.tag}</span>
        <span className={`${styles.symbol} ${styles[`sym_${p.color}`]}`}>{p.symbol}</span>
      </div>

      <h3 className={styles.title}>{p.title}</h3>

      <div className={styles.advisorRow}>
        <span className={styles.advisorLabel}>Advisor</span>
        <span className={styles.advisor}>{p.advisor}</span>
        <span className={styles.inst}>{p.institution}</span>
      </div>

      <p className={styles.desc}>{p.desc}</p>

      <div className={styles.keywords}>
        {p.keywords.map(k => (
          <span key={k} className={`${styles.kw} ${styles[`kw_${p.color}`]}`}>{k}</span>
        ))}
      </div>
    </div>
  );
}

export default function Research() {
  const headerRef = useRef(null);
  const [headerVis, setHeaderVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeaderVis(true); obs.disconnect(); } }, { threshold: 0.2 });
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="research" className={styles.section}>
      <div className={styles.inner}>
        <div className={`${styles.header} ${headerVis ? styles.vis : ''}`} ref={headerRef}>
          <span className={styles.label}>Research</span>
          <h2 className={styles.heading}>Ongoing Mathematical Investigations</h2>
          <p className={styles.sub}>Ph.D. research at the intersection of discrete mathematics, combinatorics, and graph theory.</p>
        </div>
        <div className={styles.grid}>
          {projects.map((p, i) => <ProjectCard key={p.title} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
