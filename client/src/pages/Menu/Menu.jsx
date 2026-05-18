import React, { useState } from 'react';
import { useMenu } from '../../hooks/useMenu';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import styles from './Menu.module.css';

const Menu = () => {
  useDocumentTitle('Menu');
  const [category, setCategory] = useState('All');
  const { items, loading, error } = useMenu(category);

  const categories = ['All', 'Coffee', 'Food', 'Desserts'];

  return (
    <div className={styles.menuPage}>
      <div className="container">
        <div className={styles.header}>
          <h1>Our Menu</h1>
          <p>Carefully crafted. Locally sourced.</p>
        </div>

        <div className={styles.tabs}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.tab} ${category === cat ? styles.active : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.menuGrid}>
          {loading ? (
            Array(6).fill(0).map((_, i) => <div key={i} className={styles.skeleton}></div>)
          ) : items.length === 0 ? (
            <p className={styles.empty}>No items found in this category.</p>
          ) : (
            items.map((item) => (
              <div key={item._id} className={styles.menuItem}>
                <div className={styles.itemHeader}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.dots}></span>
                  <span className={styles.price}>₹{item.price}</span>
                </div>
                <p className={styles.desc}>{item.description}</p>
                {!item.available && <span className={styles.soldOut}>Sold Out</span>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
