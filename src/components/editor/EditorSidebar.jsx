import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import Logo from '../icons/Logo';
import styles from '../../styles/editor/EditorSidebar.module.css';

const iconMap = {
    LayoutDashboard,
    FileText,
};

const DEFAULT_NAV_ITEMS = [
    { id: 'create', label: 'Create Blog', icon: 'FileText', path: '/create' },
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/Home-Feed' },
    { id: 'drafts', label: 'My Drafts', icon: 'FileText', path: '/profile' },
];

const EditorSidebar = ({
    navItems = DEFAULT_NAV_ITEMS,
    activeItem,
    onNavItemClick,
    collapsed,
    onToggleCollapse
}) => {
    const location = useLocation();
    const currentPath = location.pathname.toLowerCase();

    return (
        <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
            <div className={styles.sidebarHeader}>
                <Link to="/Home-Feed" style={{ textDecoration: 'none' }}>
                    <div className={styles.logo}>
                        <Logo size={24} />
                        {!collapsed && <span className={styles.logoText}>Scriptify AI</span>}
                    </div>
                    {!collapsed && <span className={styles.logoTag}>Intelligence Suite</span>}
                </Link>
            </div>

            <nav className={styles.nav}>
                {navItems.map((item) => {
                    const IconComponent = iconMap[item.icon] || FileText;
                    
                    const isPathMatch = item.path && (
                        currentPath === item.path.toLowerCase() ||
                        (item.id === 'create' && currentPath === '/create') ||
                        (item.id === 'dashboard' && (currentPath === '/home-feed' || currentPath === '/')) ||
                        (item.id === 'drafts' && currentPath.includes('/profile'))
                    );
                    const isActive = activeItem ? item.id === activeItem : isPathMatch;

                    const itemPath = item.path || (
                        item.id === 'create' ? '/create' :
                        item.id === 'dashboard' ? '/Home-Feed' :
                        item.id === 'drafts' ? '/profile' : null
                    );

                    const handleClick = (e) => {
                        if (onNavItemClick) {
                            e.preventDefault();
                            onNavItemClick(item.id, item);
                        }
                    };

                    if (itemPath) {
                        return (
                            <Link
                                key={item.id}
                                to={itemPath}
                                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                                onClick={handleClick}
                                title={collapsed ? item.label : ''}
                                style={{ textDecoration: 'none' }}
                            >
                                <IconComponent className={styles.navIcon} size={20} />
                                {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
                                {isActive && !collapsed && <div className={styles.activeIndicator} />}
                            </Link>
                        );
                    }

                    return (
                        <button
                            key={item.id}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                            onClick={handleClick}
                            title={collapsed ? item.label : ''}
                        >
                            <IconComponent className={styles.navIcon} size={20} />
                            {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
                            {isActive && !collapsed && <div className={styles.activeIndicator} />}
                        </button>
                    );
                })}
            </nav>

            {onToggleCollapse && (
                <button className={styles.collapseButton} onClick={onToggleCollapse}>
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            )}
        </aside>
    );
};

export default EditorSidebar;