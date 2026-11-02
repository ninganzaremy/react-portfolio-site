import { useEffect } from 'react';
import Hero from '../components/hero/Hero';
import Metrics from '../components/metrics/Metrics';
import About from '../components/about/About';
import Experience from '../components/experience/Experience';
import Projects from '../components/projects/Projects';
import Stack from '../components/stack/Stack';
import Writing from '../components/writing/Writing';
import Contact from '../components/contact/Contact';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Remy Ninganza — Software Engineer · Agentic AI & Distributed Systems';
  }, []);
  return (
    <>
      <Hero />
      <Metrics />
      <About />
      <Experience />
      <Projects />
      <Stack />
      <Writing />
      <Contact />
    </>
  );
}
