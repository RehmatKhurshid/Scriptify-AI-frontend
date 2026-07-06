import React, { useState } from 'react';
import styles from '../../styles/profile/ProfileTabs.module.css';

const tabs = [
    { id: 'blogs', label: 'My Blogs' },
    { id: 'drafts', label: 'Drafts' },
    { id: 'bookmarks', label: 'Bookmarks' },
];

const ProfileTabs = ({ activeTab, onTabChange }) => {
    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProfileTabs;