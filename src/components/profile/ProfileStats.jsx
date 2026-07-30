import React from 'react';
import styles from '../../styles/profile/ProfileStats.module.css';

const ProfileStats = ({ stats, activeTab, onTabChange }) => {
    const statItems = [
        {
            id: 'all',
            label: 'Total Blogs',
            value: stats.all || 0,
            labelColor: '#94a3b8',
            valueColor: '#ffffff',
            clickable: true,
        },
        {
            id: 'published',
            label: 'Published Posts',
            value: stats.published || 0,
            labelColor: '#10b981',
            valueColor: '#10b981',
            clickable: true,
        },
        {
            id: 'drafts',
            label: 'Saved Drafts',
            value: stats.drafts || 0,
            labelColor: '#eab308',
            valueColor: '#eab308',
            clickable: true,
        },
        {
            id: 'followers',
            label: 'Followers',
            value: stats.followers || 0,
            labelColor: '#a855f7',
            valueColor: '#a855f7',
            clickable: false,
        },
        {
            id: 'following',
            label: 'Following',
            value: stats.following || 0,
            labelColor: '#3b82f6',
            valueColor: '#3b82f6',
            clickable: false,
        },
    ];

    return (
        <div className={styles.statsContainer}>
            <div className={styles.statsGrid}>
                {statItems.map((stat) => {
                    const isActive = activeTab === stat.id;
                    return (
                        <div
                            key={stat.id}
                            className={`${styles.statCard} ${isActive ? styles.activeCard : ''}`}
                            onClick={() => stat.clickable && onTabChange && onTabChange(stat.id)}
                            style={{ cursor: stat.clickable ? 'pointer' : 'default' }}
                        >
                            <span className={styles.statLabel} style={{ color: stat.labelColor }}>
                                {stat.label}
                            </span>
                            <span className={styles.statValue} style={{ color: stat.valueColor }}>
                                {stat.value}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfileStats;