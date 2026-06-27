import Nav from './components/Nav';
import Hero from './components/Hero';
import Research from './components/Research';
import Teaching from './components/Teaching';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Research />
        <Teaching />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
