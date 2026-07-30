import React from 'react';
import styles from '../../styles/profile/ProfileTabs.module.css';

const ProfileTabs = ({ activeTab, onTabChange, counts }) => {
    const tabs = [
        { id: 'all', label: 'All Blogs', count: counts.all || 0 },
        { id: 'published', label: 'Published', count: counts.published || 0 },
        { id: 'drafts', label: 'Drafts', count: counts.drafts || 0 },
    ];

    return (
        <div className={styles.tabsContainer}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    <span className={styles.tabLabel}>{tab.label}</span>
                    <span className={styles.tabCount}>{tab.count}</span>
                </button>
            ))}
        </div>
    );
};

export default ProfileTabs;