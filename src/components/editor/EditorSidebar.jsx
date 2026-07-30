import React from 'react';
import {
    LayoutDashboard,
    FileText,
    ChevronLeft,
    ChevronRight,
    Zap
} from 'lucide-react';
import styles from '../../styles/editor/EditorSidebar.module.css';

const iconMap = {
    LayoutDashboard,
    FileText,
};

const EditorSidebar = ({
    navItems,
    activeItem,
    onNavItemClick,
    collapsed,
    onToggleCollapse
}) => {
    return (
        <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
            <div className={styles.sidebarHeader}>
                <div className={styles.logo}>
                    <Zap className={styles.logoIcon} />
                    {!collapsed && <span className={styles.logoText}>Scriptify AI</span>}
                </div>
                {!collapsed && <span className={styles.logoTag}>Intelligence Suite</span>}
            </div>

            <nav className={styles.nav}>
                {navItems.map((item) => {
                    const IconComponent = iconMap[item.icon] || LayoutDashboard;
                    const isActive = item.id === activeItem;

                    return (
                        <button
                            key={item.id}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                            onClick={() => onNavItemClick(item.id)}
                            title={collapsed ? item.label : ''}
                        >
                            <IconComponent className={styles.navIcon} size={20} />
                            {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
                            {isActive && !collapsed && <div className={styles.activeIndicator} />}
                        </button>
                    );
                })}
            </nav>

            <button className={styles.collapseButton} onClick={onToggleCollapse}>
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
        </aside>
    );
};

export default EditorSidebar;