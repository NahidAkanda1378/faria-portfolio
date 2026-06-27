'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Skills.module.css';

function useVisible(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

const techSkills = [
  { name: 'Mathematica', type: 'Computation', mark: 'M' },
  { name: 'LaTeX', type: 'Typesetting', mark: 'TeX' },
  { name: 'Python', type: 'Programming', mark: 'Py' },
  { name: 'MS Excel', type: 'Analysis', mark: 'XLS' },
  { name: 'Word / PowerPoint', type: 'Academic Docs', mark: 'DOC' },
];

const leadership = [
  { role: 'Student Officer', org: 'Association for Women in Mathematics (AWM)', period: 'Fall 2024 – Present', icon: '♀' },
  { role: 'GSG Representative', org: 'Mathematical Sciences Department, Michigan Tech', period: 'Ongoing', icon: '◈' },
  { role: 'Founder', org: 'Rubik\'s Cube Club', period: 'May 2016', icon: '⬡' },
  { role: 'Chess Grandmaster', org: 'Undergraduate University Tournament', period: 'December 2018', icon: '♛' },
];

const certs = [
  { name: 'Math GTA Training Program', issuer: 'Michigan Technological University', year: '2022–2023', icon: '∑' },
  { name: 'CPR Training', issuer: 'American Heart Association', year: 'Completed', icon: '♡' },
];

const interests = ['Biking', 'Reading', 'Painting', 'Puzzle Solving', 'Ukulele'];
const interestIcons = { 'Biking': '⟳', 'Reading': '∃', 'Painting': '∴', 'Puzzle Solving': '⊞', 'Ukulele': '∿' };

export default function Skills() {
  const [hRef, hVis] = useVisible(0.1);

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <div className={`${styles.header} ${hVis ? styles.vis : ''}`} ref={hRef}>
          <span className={styles.label}>Skills & Beyond</span>
          <h2 className={styles.heading}>The Full Equation</h2>
        </div>

        <div className={styles.grid}>
          {/* Technical Skills */}
          <SkillsBlock delay={0}>
            <h3 className={styles.blockTitle}><span className={styles.blockIcon}>⟨⟩</span>Technical Skills</h3>
            <div className={styles.techList}>
              {techSkills.map((skill, i) => (
                <div key={skill.name} className={styles.techItem} style={{ transitionDelay: `${i * 0.04}s` }}>
                  <span className={styles.techMark}>{skill.mark}</span>
                  <span className={styles.techText}>
                    <span className={styles.techName}>{skill.name}</span>
                    <span className={styles.techType}>{skill.type}</span>
                  </span>
                </div>
              ))}
            </div>
          </SkillsBlock>

          {/* Leadership */}
          <SkillsBlock delay={0.1}>
            <h3 className={styles.blockTitle}><span className={styles.blockIcon}>◎</span>Leadership</h3>
            <div className={styles.leaderList}>
              {leadership.map(l => (
                <div key={l.role} className={styles.leaderItem}>
                  <span className={styles.leaderIcon}>{l.icon}</span>
                  <div>
                    <p className={styles.leaderRole}>{l.role}</p>
                    <p className={styles.leaderOrg}>{l.org}</p>
                    <p className={styles.leaderPeriod}>{l.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </SkillsBlock>

          {/* Certifications */}
          <SkillsBlock delay={0.2}>
            <h3 className={styles.blockTitle}><span className={styles.blockIcon}>✓</span>Certifications</h3>
            <div className={styles.certList}>
              {certs.map(c => (
                <div key={c.name} className={styles.cert}>
                  <span className={styles.certIcon}>{c.icon}</span>
                  <div>
                    <p className={styles.certName}>{c.name}</p>
                    <p className={styles.certIssuer}>{c.issuer}</p>
                    <p className={styles.certYear}>{c.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </SkillsBlock>

          {/* Interests */}
          <SkillsBlock delay={0.3}>
            <h3 className={styles.blockTitle}><span className={styles.blockIcon}>∞</span>Interests</h3>
            <div className={styles.interests}>
              {interests.map(interest => (
                <div key={interest} className={styles.interest}>
                  <span className={styles.interestIcon}>{interestIcons[interest]}</span>
                  <span className={styles.interestName}>{interest}</span>
                </div>
              ))}
            </div>
          </SkillsBlock>
        </div>
      </div>
    </section>
  );
}

function SkillsBlock({ children, delay }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${styles.block} ${vis ? styles.vis : ''}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
