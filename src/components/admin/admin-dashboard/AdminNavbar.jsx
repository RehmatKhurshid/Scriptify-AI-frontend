import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import styles from '../../../styles/admin/admin-dashboard/AdminNavbar.module.css';

const AdminNavbar = () => {
    const { user } = useAuth();
    const avatar = user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'Admin'}`;

    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSection}>
                <Link to="/" className={styles.brand}>
                    <span className={styles.brandName}>Scriptly AI</span>
                </Link>
            </div>

            <div className={styles.rightSection}>
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

export default AdminNavbar;