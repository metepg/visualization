import React from 'react';
import styles from './Navbar.module.css'

const Navbar: React.FC = () => {
  return (
    <nav style={{ marginBottom: '80px' }}>
      <div className={styles.navbar}>
        <div className={styles.brandContent}>
          <img src="/assets/logo.svg" alt="Logo" className={styles.logo} />
          <div className={styles.sloganArea}>See when the game happens</div>
        </div>
        <p className={styles.topRight}>icetime.stats</p>
      </div>
      <hr className={styles.hr}/>
    </nav>
  );
};

export default Navbar;
