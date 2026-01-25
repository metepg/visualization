import React from 'react';
import styles from './Navbar.module.css'

const Navbar: React.FC = () => {
  return (
    <nav style={{ marginBottom: '80px' }}>
      <div className={styles.navbar}>
        <div className={styles.brandContent}>
          <div className={styles.logoArea}>
          </div>
          <div className={styles.nameArea}><span className={styles.whiteColor}>VISUALIZING</span><span
            className={styles.redColor}>LIIGA</span>
          </div>
          <div className={styles.sloganArea}> | Hockey Stats at One Glance
          </div>
        </div>
        <p className={styles.topRight}>VISUALIZINGLIIGA.COM</p>
      </div>
      <hr className={styles.hr}/>
    </nav>
  );
};

export default Navbar;
