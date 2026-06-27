'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Nav.module.css';

const links = ['Research', 'Teaching', 'Experience', 'Skills', 'Contact'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      for (let i = links.length - 1; i >= 0; i--) {
        const el = document.getElementById(links[i].toLowerCase());
        if (el && el.getBoundingClientRect().top <= 130) {
          setActive(links[i]);
          return;
        }
      }
      setActive('');
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Image
            className={styles.logoIcon}
            src="/favicon.ico"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          <span className={styles.logoText}>Faria Tasnim</span>
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {links.map(l => (
            <li key={l}>
              <button
                className={`${styles.link} ${active === l ? styles.activeLink : ''}`}
                onClick={() => scrollTo(l.toLowerCase())}
              >{l}</button>
            </li>
          ))}
          <li>
            <a href="https://www.linkedin.com/in/fariatasnimmtu/" target="_blank" rel="noopener noreferrer" className={styles.cta}>
              Connect
            </a>
          </li>
        </ul>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
