import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.section}>
          <h3 className={styles.logo}>Urban Roast</h3>
          <p className={styles.text}>
            Where every cup tells a story. Specialty coffee and fresh bites in the heart of Hyderabad.
          </p>
        </div>

        <div className={styles.section}>
          <h4 className={styles.title}>Visit Us</h4>
          <div className={styles.infoRow}>
            <MapPin size={18} />
            <span>12, Jubilee Hills Road No. 36, Hyderabad</span>
          </div>
          <div className={styles.infoRow}>
            <Clock size={18} />
            <span>Mon–Fri: 7:30am–10pm<br />Sat–Sun: 8am–11pm</span>
          </div>
          <div className={styles.infoRow}>
            <Phone size={18} />
            <span>+91 98765 43210</span>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.title}>Links</h4>
          <nav className={styles.links}>
            <Link to="/menu">Our Menu</Link>
            <Link to="/about">Our Story</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/admin/login">Admin Login</Link>
          </nav>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Urban Roast Café. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
