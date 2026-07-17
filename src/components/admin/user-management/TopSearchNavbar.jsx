import React from 'react';
import { Search, Bell } from 'lucide-react';
import styles from '../../../styles/admin/user-management/TopSearchNavbar.module.css';

const TopSearchNavbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.searchWrapper}>
                <Search size={18} className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.rightSection}>
                <button className={styles.iconButton}>
                    <Bell size={20} />
                </button>
                <div className={styles.userAvatar}>
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                        alt="Admin"
                    />
                </div>
            </div>
        </nav>
    );
};

export default TopSearchNavbar;