import React from 'react';
import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import styles from '../../../styles/admin/flagged-comments/FlaggedTopNavbar.module.css';

const FlaggedTopNavbar = () => {
    const { user } = useAuth();
    const avatar = user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'Admin'}`;

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
                            src={avatar}
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