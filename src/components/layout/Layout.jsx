import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import Background from './Background';
import CommandPalette from './CommandPalette';
import ScrollManager from './ScrollManager';

export default function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Background />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <CommandPalette />
      <ScrollManager />
    </>
  );
}
