'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Experience.module.css';

export default function Experience() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.inner}>
        <div className={`${styles.header} ${vis ? styles.vis : ''}`} ref={ref}>
          <span className={styles.label}>Education</span>
          <h2 className={styles.heading}>Academic Trajectory</h2>
        </div>

        <div className={styles.timeline}>
          <EduCard
            degree="Ph.D., Mathematical Sciences"
            field="Discrete Mathematics · Graph Theory · Partition Theory"
            school="Michigan Technological University"
            location="Houghton, MI"
            period="Expected Summer 2027"
            gpa={null}
            color="cobalt"
            index={0}
            note="Research with Dr. Melissa S. Keranen and Dr. Robert Schneider"
          />
          <EduCard
            degree="Bachelor of Science"
            field="Mathematics (undergraduate)"
            school="University (Bangladesh)"
            location="Bangladesh"
            period="Prior to 2022"
            gpa={null}
            color="violet"
            index={1}
            note="Foundation in mathematical analysis, algebra, and applied mathematics"
          />
        </div>
      </div>
    </section>
  );
}

function EduCard({ degree, field, school, location, period, color, index, note }) {
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
      className={`${styles.card} ${styles[`card_${color}`]} ${vis ? styles.vis : ''}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className={styles.cardLeft}>
        <span className={styles.period}>{period}</span>
        <span className={styles.loc}>{location}</span>
      </div>
      <div className={styles.cardRight}>
        <h3 className={styles.degree}>{degree}</h3>
        <p className={styles.field}>{field}</p>
        <p className={styles.school}>{school}</p>
        {note && <p className={styles.note}>{note}</p>}
      </div>
    </div>
  );
}
