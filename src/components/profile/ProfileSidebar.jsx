import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Zap, PenLine } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/profile/ProfileSidebar.module.css';

const ProfileSidebar = ({ user }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/signin');
        } catch (err) {
            console.error('Failed to log out:', err);
        }
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.topContent}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <Zap className={styles.logoIcon} size={24} />
                        <span className={styles.logoText}>Scriptify AI</span>
                    </div>
                </div>

                <div className={styles.userCard}>
                    <div className={styles.userAvatar}>
                        <img src={user.avatar} alt={user.name} />
                    </div>
                    <h3 className={styles.userName}>{user.name}</h3>
                    <span className={styles.userRole}>{user.role}</span>
                    <Link to="/edit-profile" className={styles.editProfile}>
                        <PenLine size={14} />
                        <span>Edit Profile</span>
                    </Link>
                </div>
            </div>

            <div className={styles.sidebarFooter}>
                <button className={styles.logoutBtn} onClick={handleLogout} title="Logout">
                    <LogOut size={18} />
                    <span className={styles.logoutText}>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default ProfileSidebar;