import React from 'react';
import {
    LayoutDashboard,
    FileText,
    Sparkles,
    FolderOpen,
    Settings,
    ChevronLeft,
    ChevronRight,
    Zap,
    HelpCircle,
    LogOut
} from 'lucide-react';
import styles from '../../styles/editor/EditorSidebar.module.css';

const iconMap = {
    LayoutDashboard,
    FileText,
    Sparkles,
    FolderOpen,
    Settings,
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

            <div className={styles.sidebarFooter}>
                <button className={styles.upgradeButton}>
                    <Zap size={16} />
                    {!collapsed && <span>Upgrade to Pro</span>}
                </button>

                <div className={styles.footerLinks}>
                    <button className={styles.footerLink} title={collapsed ? 'Help' : ''}>
                        <HelpCircle className={styles.footerIcon} size={20} />
                        {!collapsed && <span>Help</span>}
                    </button>
                    <button className={styles.footerLink} title={collapsed ? 'Sign Out' : ''}>
                        <LogOut className={styles.footerIcon} size={20} />
                        {!collapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </div>

            <button className={styles.collapseButton} onClick={onToggleCollapse}>
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
        </aside>
    );
};

export default EditorSidebar;