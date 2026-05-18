import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navbar}`}>
        <Link to="/" className={styles.logo} onClick={() => setIsOpen(false)}>
          Urban Roast
        </Link>
        
        <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
          <Link to="/" className={styles.link} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/menu" className={styles.link} onClick={() => setIsOpen(false)}>Menu</Link>
          <Link to="/about" className={styles.link} onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className={styles.link} onClick={() => setIsOpen(false)}>Contact</Link>
        </nav>

        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
