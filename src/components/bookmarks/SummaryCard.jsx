import React from 'react';
import styles from '../../styles/bookmarks/SummaryCard.module.css';

const SummaryCard = () => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Summary</h3>
            <div className={styles.stat}>
                <span className={styles.statLabel}>Total Bookmarks</span>
                <span className={styles.statValue}>42</span>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progressFill}></div>
            </div>
            <p className={styles.hint}>
                You're in the top 5% of active readers this month.
            </p>
        </div>
    );
};

export default SummaryCard;