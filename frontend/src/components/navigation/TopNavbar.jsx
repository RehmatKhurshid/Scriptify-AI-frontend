import React from 'react';
import { FiSearch, FiBell, FiMoon, FiMenu } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import Logo from '../icons/Logo';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import styles from '../../styles/navigation/TopNavbar.module.css';

const TopNavbar = () => {
    const location = useLocation();
    const isProfilePage = location.pathname === '/profile';

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <button className={styles.menuButton} aria-label="Open menu">
                    <FiMenu />
                </button>
                <div className={styles.brand}>
                    <Logo size={28} />
                    <span className={styles.brandName}>Scriptify AI</span>
                </div>
            </div>

            {!isProfilePage && (
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
            )}

            <div className={styles.right}>
                {isProfilePage ? (
                    <Button variant="primary" size="sm" className={styles.writeButton}>
                        Write
                    </Button>
                ) : (
                    <button className={styles.iconButton} aria-label="Write">
                        <span className={styles.writeLabel}>Write</span>
                    </button>
                )}
                <button className={styles.iconButton} aria-label="Notifications">
                    <FiBell />
                </button>
                <button className={styles.iconButton} aria-label="Toggle theme">
                    <FiMoon />
                </button>
                <Avatar
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    alt="User avatar"
                    size="sm"
                    className={styles.userAvatar}
                />
            </div>
        </nav>
    );
};

export default TopNavbar;