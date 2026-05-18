import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMenu } from '../../hooks/useMenu';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import styles from './Home.module.css';

const Home = () => {
  useDocumentTitle('Home');
  const { items: featuredItems, loading } = useMenu(null, true);

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80)' }}></div>
        <div className={`container ${styles.heroContent}`}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Where Every Cup<br/>Tells a Story.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Specialty coffee & fresh bites in the heart of Hyderabad.
          </motion.p>
          <motion.div 
            className={styles.heroBtns}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/menu" className="btn-primary">View Menu</Link>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className={styles.btnOutline}>Get Directions</a>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className={styles.trustBar}>
        <div className={`container ${styles.trustGrid}`}>
          <div>4.8★ Google Reviews</div>
          <div className={styles.divider}></div>
          <div>Est. 2018</div>
          <div className={styles.divider}></div>
          <div>100% Locally Sourced</div>
        </div>
      </section>

      {/* Featured Items */}
      <section className={styles.featured}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Curated Offerings</h2>
          <div className={styles.featuredGrid}>
            {loading ? (
              Array(3).fill(0).map((_, i) => <div key={i} className={styles.skeleton}></div>)
            ) : (
              featuredItems.map(item => (
                <motion.div 
                  key={item._id} 
                  className={styles.card}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.cardInfo}>
                    <h3>{item.name}</h3>
                    <p className={styles.desc}>{item.description}</p>
                    <p className={styles.price}>₹{item.price}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className={styles.visitUs}>
        <div className={`container ${styles.visitGrid}`}>
          <div className={styles.visitInfo}>
            <h2>Visit Us</h2>
            <p><strong>Address:</strong> 12, Jubilee Hills Road No. 36, Hyderabad</p>
            <p><strong>Hours:</strong><br/>Mon–Fri: 7:30am–10pm<br/>Sat–Sun: 8am–11pm</p>
            <a href="tel:+919876543210" className={styles.phoneLink}>Call Us: +91 98765 43210</a>
          </div>
          <div className={styles.map}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15226.315570222165!2d78.4069806!3d17.4330107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb913501a3556f%3A0xc6a82cb38090db86!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1683838383838!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Urban Roast Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
