import React from 'react';
import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';
import styles from '../../../styles/admin/flagged-comments/FlaggedTopNavbar.module.css';

const FlaggedTopNavbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSection}>
                <span className={styles.adminLabel}>AdminPanel</span>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.searchWrapper}>
                    <Search size={16} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className={styles.searchInput}
                    />
                </div>

                <button className={styles.iconButton} title="Notifications">
                    <Bell size={20} />
                    <span className={styles.notificationDot} />
                </button>

                <button className={styles.iconButton} title="Help">
                    <HelpCircle size={20} />
                </button>

                <div className={styles.userMenu}>
                    <div className={styles.userAvatar}>
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                            alt="Admin"
                        />
                    </div>
                    <ChevronDown size={14} className={styles.chevron} />
                </div>
            </div>
        </nav>
    );
};

export default FlaggedTopNavbar;