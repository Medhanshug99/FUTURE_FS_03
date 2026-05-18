import React from 'react';
import { motion } from 'framer-motion';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import styles from './About.module.css';

const About = () => {
  useDocumentTitle('About Us');
  return (
    <div className={styles.aboutPage}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>Our Story</h1>
        </motion.div>
      </section>

      <section className={`container ${styles.contentSection}`}>
        <div className={styles.storyGrid}>
          <div className={styles.textContent}>
            <h2>Rooted in Hyderabad.<br/>Inspired by the world.</h2>
            <p>
              Urban Roast began in 2018 with a simple vision: to bring specialty, ethically sourced coffee to the bustling streets of Jubilee Hills. We believe that a great cup of coffee does more than wake you up; it brings people together.
            </p>
            <p>
              Our beans are sourced from independent farms across Chikmagalur and roasted in-house in small batches to ensure every cup is as fresh as possible.
            </p>
            
            <div className={styles.values}>
              <div className={styles.value}>
                <h3>We source honestly.</h3>
                <p>Direct trade relationships with farmers.</p>
              </div>
              <div className={styles.value}>
                <h3>We roast carefully.</h3>
                <p>Small batches to highlight unique flavor profiles.</p>
              </div>
              <div className={styles.value}>
                <h3>We serve warmly.</h3>
                <p>A welcoming space for everyone.</p>
              </div>
            </div>
          </div>
          <div className={styles.imageContent}>
            <img 
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80" 
              alt="Barista making coffee" 
              className={styles.storyImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.teamSection}>
        <div className="container">
          <h2 className={styles.teamTitle}>The Team</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <div className={styles.teamImageWrapper}>
                <img src="https://images.unsplash.com/photo-1583336214352-7369a473918a?auto=format&fit=crop&w=400&q=80" alt="Founder" />
              </div>
              <h3>Priya Sharma</h3>
              <p>Founder & Head Roaster</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamImageWrapper}>
                <img src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=400&q=80" alt="Lead Barista" />
              </div>
              <h3>Rahul Varma</h3>
              <p>Lead Barista</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamImageWrapper}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" alt="Pastry Chef" />
              </div>
              <h3>Arjun Reddy</h3>
              <p>Head Pastry Chef</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
