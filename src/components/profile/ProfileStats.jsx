import React from 'react';
import styles from '../../styles/profile/ProfileStats.module.css';

const ProfileStats = ({ stats }) => {
    const statItems = [
        { label: 'FOLLOWERS', value: stats.followers, color: '#f8fafc' },
        { label: 'FOLLOWING', value: stats.following, color: '#f8fafc' },
        { label: 'PUBLISHED', value: stats.published, color: '#06b6d4' },
        { label: 'DRAFTS', value: stats.drafts, color: '#f8fafc' },
        { label: 'BOOKMARKS', value: stats.bookmarks, color: '#f472b6' },
    ];

    return (
        <div className={styles.statsContainer}>
            <div className={styles.statsGrid}>
                {statItems.map((stat, index) => (
                    <div key={index} className={styles.statCard}>
                        <span className={styles.statValue} style={{ color: stat.color }}>
                            {stat.value}
                        </span>
                        <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileStats;