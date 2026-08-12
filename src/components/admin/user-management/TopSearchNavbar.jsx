import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import styles from '../../../styles/admin/user-management/TopSearchNavbar.module.css';

const TopSearchNavbar = ({ search = '', onSearchChange }) => {
    const { user } = useAuth();
    const avatar = user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'Admin'}`;

    return (
        <nav className={styles.navbar}>
            <div className={styles.searchWrapper}>
                <Search size={18} className={styles.searchIcon} />
                <input
                    value={search}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    placeholder="Search users..."
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.rightSection}>
                <button className={styles.iconButton} type="button">
                    <Bell size={20} />
                </button>
                <div className={styles.userAvatar}>
                    <img src={avatar} alt="Admin" />
                </div>
            </div>
        </nav>
    );
};

export default TopSearchNavbar;