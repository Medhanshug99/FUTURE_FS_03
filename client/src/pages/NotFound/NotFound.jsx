import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className={styles.notFoundPage}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Oops! Page not found.</h2>
        <p className={styles.text}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
