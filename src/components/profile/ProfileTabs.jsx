import React from 'react';
import styles from '../../styles/profile/ProfileTabs.module.css';

const ProfileTabs = ({ activeTab, onTabChange, counts }) => {
    const tabs = [
        { id: 'blogs', label: 'My Blogs', count: counts.blogs },
        { id: 'drafts', label: 'Drafts', count: counts.drafts },
        { id: 'bookmarks', label: 'Bookmarks', count: counts.bookmarks },
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