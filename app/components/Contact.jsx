'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Contact.module.css';

export default function Contact() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className={`${styles.left} ${vis ? styles.vis : ''}`}>
          <span className={styles.label}>Contact</span>
          <h2 className={styles.heading}>
            Let&apos;s Collaborate
          </h2>
          <p className={styles.sub}>
            Open to research collaborations, academic positions, and opportunities in mathematical sciences. I&apos;d love to hear from you.
          </p>

          <div className={styles.contacts}>
            <a href="mailto:fariat@mtu.edu" className={styles.contactCard}>
              <span className={styles.contactIcon}>✉</span>
              <div>
                <p className={styles.contactType}>Email</p>
                <p className={styles.contactVal}>fariat@mtu.edu</p>
              </div>
              <span className={styles.arrow}>→</span>
            </a>

            <a href="tel:+19062992886" className={styles.contactCard}>
              <span className={styles.contactIcon}>☏</span>
              <div>
                <p className={styles.contactType}>Phone</p>
                <p className={styles.contactVal}>+1 (906) 299-2886</p>
              </div>
              <span className={styles.arrow}>→</span>
            </a>

            <a href="https://www.linkedin.com/in/fariatasnimmtu/" target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
              <span className={styles.contactIcon}>⟐</span>
              <div>
                <p className={styles.contactType}>LinkedIn</p>
                <p className={styles.contactVal}>fariatasnimmtu</p>
              </div>
              <span className={styles.arrow}>→</span>
            </a>
          </div>

          <div className={styles.address}>
            <span className={styles.mono}>Location</span>
            <p>1810 Apt. E Woodmar Dr.<br />Houghton, MI 49931</p>
          </div>
        </div>

        <div className={`${styles.right} ${vis ? styles.vis : ''}`}>
          <div className={styles.proofBox}>
            <div className={styles.proofHeader}>
              <span className={styles.mono}>Theorem</span>
            </div>
            <div className={styles.proofBody}>
              <p className={styles.theorem}>
                <strong>Theorem.</strong> Every graph <em>G</em> of order <em>n</em> can be expressed as a union of edge-disjoint subgraphs.
              </p>
              <p className={styles.proof}>
                <strong>Proof.</strong> By induction on the number of edges... <span className={styles.qed}>∎</span>
              </p>
              <div className={styles.separator} />
              <p className={styles.partitionExample}>
                <span className={styles.mono}>λ = (5, 3, 3, 1)</span><br />
                <span className={styles.partitionViz}>
                  ■ ■ ■ ■ ■<br />
                  ■ ■ ■<br />
                  ■ ■ ■<br />
                  ■
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
