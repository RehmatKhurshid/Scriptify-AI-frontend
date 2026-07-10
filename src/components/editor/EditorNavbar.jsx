import React from 'react';
import { FiSearch, FiBell, FiMoon, FiSettings } from 'react-icons/fi';
import Logo from '../icons/Logo';
import Avatar from '../common/Avatar';
import styles from '../../styles/editor/EditorNavbar.module.css';

const EditorNavbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <div className={styles.brand}>
                    <Logo size={24} />
                    <span className={styles.brandName}>Scriptify AI</span>
                </div>
                <div className={styles.navLinks}>
                    <a href="/" className={styles.navLink}>Explore</a>
                    <a href="/drafts" className={`${styles.navLink} ${styles.active}`}>Drafts</a>
                    <a href="/community" className={styles.navLink}>Community</a>
                </div>
            </div>

            <div className={styles.center}>
                <div className={styles.searchWrapper}>
                    <FiSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search for ideas..."
                        className={styles.searchInput}
                    />
                </div>
            </div>

            <div className={styles.right}>
                <button className={`${styles.publishButton} ${styles.draft}`}>
                    Publish
                </button>
                <button className={styles.iconButton} aria-label="Notifications">
                    <FiBell />
                </button>
                <button className={styles.iconButton} aria-label="Theme">
                    <FiMoon />
                </button>
                <button className={styles.iconButton} aria-label="Settings">
                    <FiSettings />
                </button>
                <Avatar
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                    size="sm"
                />
            </div>
        </nav>
    );
};

export default EditorNavbar;