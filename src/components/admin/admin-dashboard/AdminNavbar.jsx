import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, PenLine } from 'lucide-react';
import styles from '../../../styles/admin/admin-dashboard/AdminNavbar.module.css';

const AdminNavbar = () => {
    const navLinks = [
        { label: 'Dashboard', path: '/admin', active: true },
        { label: 'Analytics', path: '/admin/analytics', active: false },
        { label: 'Community', path: '/admin/community', active: false },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSection}>
                <Link to="/" className={styles.brand}>
                    <span className={styles.brandName}>Scriptly AI</span>
                </Link>

                <div className={styles.navLinks}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.path}
                            className={`${styles.navLink} ${link.active ? styles.active : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div className={styles.rightSection}>
                <button className={styles.iconButton} title="Notifications">
                    <Bell size={20} />
                    <span className={styles.notificationDot} />
                </button>

                <div className={styles.brandBadge}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span>ORKLES</span>
                </div>

                <Link to="/create" className={styles.writeButton}>
                    <PenLine size={16} />
                    <span>Write Post</span>
                </Link>

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

export default AdminNavbar;