import React, { useState } from 'react';
import styles from './ChooseComponent.module.css';

const ChooseComponent: React.FC = () => {
  const [selected, setSelected] = useState('gameStats'); // Set the default selected button
  const handleButtonClick = (identifier: string) => {
    setSelected(identifier);
  };

  return (
    <section className={styles.chooseContentStyles}>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerRow1}>GET STARTED</h1>
        <div className={styles.headerRow2}>ICETIME is a professional analytics platform that adds the temporal dimension missing from traditional hockey statistics, unlocking new insights for media and leagues</div>
      </div>
      <div className={styles.introContainer}>
        <div className={styles.introBox}>
          <div className={styles.firstRow}>
            <div className={styles.circle}>
              <div>1</div>
            </div>
          </div>
          <div className={styles.secondRow}>Choose
          </div>
          <div className={styles.thirdRow}>Your Team
            <br/>
            Your Players
            <br/>
            Your Timeline
            <br/>
            Your Events
          </div>
          <div className={styles.fourthRow}>Your preference</div>
        </div>
        <div className={styles.introBox}>
          <div className={styles.firstRow}>
            <div className={styles.circle}>
              <div>2</div>
            </div>
          </div>
          <div className={styles.secondRow}>Explore
          </div>
          <div className={styles.thirdRow}>Goals & Assists<br></br>Face-offs & Penalties<br></br>Shots, Blocks &
            Saves<br></br>Wins & Losses
          </div>
          <div className={styles.fourthRow}>Stats in their context
          </div>
        </div>
        <div className={styles.introBox}>
          <div className={styles.firstRow}>
            <div className={styles.circle}>
              <div>3</div>
            </div>
          </div>
          <div className={styles.secondRow}>Discover
          </div>
          <div className={styles.thirdRow}>Thrilling Details<br></br>Revealing Trends<br></br>The Big Picture
          </div>
          <div className={styles.fourthRow}>Better Insights
          </div>
        </div>
      </div>
      <div className={styles.introDivider}>
        <div className={styles.line}></div>
        <div className={styles.dividerText}>At One Glance
          <div className={styles.arrow}></div>
        </div>
        <div className={styles.line}></div>

      </div>
      <hr/>
      <div className={styles.statsSelectionContainer}>
        <button
          style={{ marginRight: '15px' }}
          className={`${styles.underlineBtn} ${selected === 'gameStats' ? styles.selected : ''}`}
          onClick={() => handleButtonClick('gameStats')}>GAME STATS
        </button>
        <button
          className={`${styles.underlineBtn} ${selected === 'playerStats' ? styles.selected : ''}`}
          onClick={() => handleButtonClick('playerStats')}>PLAYER & TEAM STATS
        </button>
      </div>
      <hr/>
      <div className={styles.buttonContainer}>
        <button className={styles.teamButton}>BY TEAM</button>
        <button className={styles.dateButton}>BY DATE</button>
      </div>
    </section>
  );
};

export default ChooseComponent;
