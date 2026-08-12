import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    FileText,
    Flag,
    Settings,
    Plus,
    HelpCircle,
    LogOut,
    Zap
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import styles from '../../../styles/admin/admin-dashboard/AdminSidebar.module.css';

const iconMap = {
    LayoutDashboard,
    Users,
    FileText,
    Flag,
    Settings,
};

const routeMap = {
    dashboard: '/admin',
    users: '/admin/users',
    blogs: '/admin/blogs',
    flagged: '/admin/flagged-comments',
    settings: '/admin/settings',
};

const AdminSidebar = ({ navItems, isEditorial = false }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/signin');
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <div className={styles.logo}>
                    <Zap className={styles.logoIcon} size={22} />
                    <div className={styles.logoText}>
                        <span className={styles.brand}>Scriptly AI</span>
                        <span className={styles.tagline}>{isEditorial ? 'Editorial Admin' : 'Admin Console'}</span>
                    </div>
                </div>
            </div>

            {isEditorial && (
                <Link to="/create" className={styles.newPostBtn} style={{ textDecoration: 'none' }}>
                    <Plus size={16} />
                    <span>New Post</span>
                </Link>
            )}

            <nav className={styles.nav}>
                {navItems.map((item) => {
                    const IconComponent = iconMap[item.icon] || LayoutDashboard;
                    const isActive = item.active;

                    return (
                        <Link
                            key={item.id}
                            to={routeMap[item.id] || '/admin'}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <IconComponent className={styles.navIcon} size={18} />
                            <span className={styles.navLabel}>{item.label}</span>
                            {isActive && <div className={styles.activeIndicator} />}
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.sidebarFooter}>
                {!isEditorial && (
                    <button className={styles.generateReport}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                        <span>Generate Report</span>
                    </button>
                )}

                <button className={styles.footerLink}>
                    <HelpCircle size={16} />
                    <span>Help</span>
                </button>

                <button className={styles.footerLink} onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;