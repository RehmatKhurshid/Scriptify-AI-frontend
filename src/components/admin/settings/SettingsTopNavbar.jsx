import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import styles from '../../../styles/admin/settings/SettingsTopNavbar.module.css';

const SettingsTopNavbar = () => {
    const { user } = useAuth();
    const avatar = user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'Admin'}`;

    return (
        <nav className={styles.navbar}>
            <div className={styles.searchWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search Settings..."
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.rightSection}>
                <button className={styles.iconButton} title="Notifications">
                    <Bell size={20} />
                    <span className={styles.notificationDot} />
                </button>

                <div className={styles.brandBadge}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22c0-5.5 4-9 4-14 0-3-2-5-4-5s-4 2-4 5c0 5 4 8.5 4 14z" />
                        <path d="M12 13c-2-1.5-5-2-7-1.5 2 1.5 5 1.5 7.5-.5z" />
                        <path d="M12 13c2-1.5 5-2 7-1.5-2 1.5-5 1.5-7.5-.5z" />
                    </svg>
                    <span>RK</span>
                </div>

                <div className={styles.userAvatar}>
                    <img
                        src={avatar}
                        alt="Admin"
                    />
                </div>
            </div>
        </nav>
    );
};

export default SettingsTopNavbar;