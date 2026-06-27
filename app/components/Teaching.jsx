'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Teaching.module.css';

const roles = [
  {
    role: 'Graduate Teaching Instructor',
    org: 'Michigan Technological University',
    courses: [
      { name: 'Calculus I with Technology', period: 'Fall 2024 – Spring 2025' },
      { name: 'College Algebra I', period: 'Spring 2023 – Spring 2024' },
    ],
    icon: '∫',
    desc: 'Independently designed and delivered course content, assessments, and student support for undergraduate mathematics courses.',
  },
  {
    role: 'Graduate Teaching Assistant',
    org: 'Michigan Technological University',
    courses: [
      { name: 'Calculus II with Technology', period: 'Fall 2022' },
    ],
    icon: 'Σ',
    desc: 'Assisted in delivering calculus instruction, running recitation sections, and supporting student learning in foundational mathematics.',
  },
  {
    role: 'Weekend Counselor & Operations Assistant',
    org: 'Summer Youth Program (SYP)',
    courses: [
      { name: 'Hybrid Position', period: 'Summer 2024' },
    ],
    icon: '∇',
    desc: 'Supported program operations and mentored young students in an educational summer program setting.',
  },
];

function RoleCard({ r, index }) {
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
      className={`${styles.card} ${vis ? styles.vis : ''}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className={styles.iconBox}>
        <span className={styles.icon}>{r.icon}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.role}>{r.role}</h3>
        <p className={styles.org}>{r.org}</p>
        <p className={styles.desc}>{r.desc}</p>
        <div className={styles.courses}>
          {r.courses.map(c => (
            <div key={c.name} className={styles.course}>
              <span className={styles.courseName}>{c.name}</span>
              <span className={styles.coursePeriod}>{c.period}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Teaching() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="teaching" className={styles.section}>
      <div className={styles.inner}>
        <div className={`${styles.header} ${vis ? styles.vis : ''}`} ref={ref}>
          <span className={styles.label}>Teaching</span>
          <h2 className={styles.heading}>In the Classroom</h2>
          <p className={styles.sub}>Making calculus and algebra accessible — one student at a time.</p>
        </div>
        <div className={styles.cards}>
          {roles.map((r, i) => <RoleCard key={r.role} r={r} index={i} />)}
        </div>
      </div>
    </section>
  );
}
