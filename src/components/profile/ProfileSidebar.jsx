import React from 'react';
import { Link } from 'react-router-dom';
import {
    Rss,
    TrendingUp,
    BookOpen,
    Sparkles,
    User,
    Settings,
    Zap
} from 'lucide-react';
import styles from '../../styles/profile/ProfileSidebar.module.css';

const iconMap = {
    Rss,
    TrendingUp,
    BookOpen,
    Sparkles,
    User,
    Settings,
};

const ProfileSidebar = ({ user, navItems }) => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <div className={styles.logo}>
                    <Zap className={styles.logoIcon} size={24} />
                    <span className={styles.logoText}>Scriptly AI</span>
                </div>
            </div>

            <div className={styles.userCard}>
                <div className={styles.userAvatar}>
                    <img src={user.avatar} alt={user.name} />
                </div>
                <h3 className={styles.userName}>{user.name}</h3>
                <span className={styles.userRole}>{user.role}</span>
                <Link to="/edit-profile" className={styles.editProfile}>Edit Profile</Link>
            </div>

            <nav className={styles.nav}>
                {navItems.map((item) => {
                    const IconComponent = iconMap[item.icon] || User;
                    const isActive = item.active;

                    return (
                        <button
                            key={item.id}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                            title={item.label}
                        >
                            <IconComponent className={styles.navIcon} size={18} />
                            <span className={styles.navLabel}>{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default ProfileSidebar;