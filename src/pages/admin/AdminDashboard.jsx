import React from 'react';
import AdminSidebar from '../../components/admin/admin-dashboard/AdminSidebar';
import AdminNavbar from '../../components/admin/admin-dashboard/AdminNavbar';
import StatsCards from '../../components/admin/admin-dashboard/StatsCards';
import ActionButtons from '../../components/admin/admin-dashboard/ActionButtons';
import PlatformGrowthChart from '../../components/admin/admin-dashboard/PlatformGrowthChart';
import UserDistributionChart from '../../components/admin/admin-dashboard/UserDistributionChart';
import RecentBlogsTable from '../../components/admin/admin-dashboard/RecentBlogsTable';
import FeaturedBlogsPanel from '../../components/admin/admin-dashboard/FeaturedBlogPanel';
import PlatformActivity from '../../components/admin/admin-dashboard/PlatformActivity';
import SystemHealth from '../../components/admin/admin-dashboard/SystemHealth';
import AdminFooter from '../../components/admin/admin-dashboard/AdminFooter';
import styles from '../../styles/admin/admin-dashboard/AdminDashboard.module.css';

const AdminDashboard = () => {
    const sidebarNavItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', active: true },
        { id: 'users', label: 'Users', icon: 'Users' },
        { id: 'blogs', label: 'Blogs', icon: 'FileText' },
        { id: 'flagged', label: 'Flagged Comments', icon: 'Flag' },
        { id: 'settings', label: 'Settings', icon: 'Settings' },
    ];

    const statsData = [
        { label: 'TOTAL USERS', value: '42.8k', change: '+12%', icon: 'Users', trend: 'up' },
        { label: 'TOTAL BLOGS', value: '12.4k', change: '+8%', icon: 'FileText', trend: 'up' },
        { label: 'COMMENTS', value: '85.2k', change: '+24%', icon: 'MessageSquare', trend: 'up' },
        { label: 'URGENT ATTENTION', value: '142', subtext: 'Comments Await Review', icon: 'AlertTriangle', isUrgent: true },
        { label: 'ACTIVE NOW', value: '3,104', change: '', icon: 'Activity', hasDot: true },
    ];

    const recentBlogs = [
        { id: 1, title: 'The Evolution of Cyber Securi...', author: 'David Chen', views: '2.4k', status: 'Published', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
        { id: 2, title: 'Generative AI: Design Tools f...', author: 'Elena Rossi', views: '1.8k', status: 'Published', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
        { id: 3, title: 'Quantum Computing: A Simpl...', author: 'Marcus Wright', views: '856', status: 'Draft', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus' },
    ];

    const featuredBlogs = [
        { id: 1, title: 'AI in Healthcare: T...', featured: '2d ago', views: '14.2k views', color: '#f472b6' },
        { id: 2, title: 'Future of Web3 &...', featured: '5d ago', views: '8.9k views', color: '#a78bfa' },
        { id: 3, title: 'Cloud Computing...', featured: '1w ago', views: '22k views', color: '#34d399' },
    ];

    const platformActivities = [
        { id: 1, type: 'user', text: 'New User: Sarah Jenkine joined from SF.', time: '2 minutes ago', icon: 'UserPlus', color: '#a78bfa' },
        { id: 2, type: 'blog', text: 'Blog Published: "The Future of LLMs" by Alex Thorne.', time: '15 minutes ago', icon: 'FileText', color: '#06b6d4' },
        { id: 3, type: 'flag', text: 'Comment Flagged: Possible spam detected.', time: '42 minutes ago', icon: 'Flag', color: '#f472b6' },
    ];

    const systemHealth = [
        { label: 'Database Load', value: '12%', color: '#06b6d4' },
        { label: 'Server Response', value: '84ms', color: '#a78bfa' },
        { label: 'API Errors (24h)', value: '0.02%', color: '#f472b6' },
        { label: 'Active Storage', value: '1.4 TB', color: '#34d399' },
    ];

    return (
        <div className={styles.dashboardPage}>
            <AdminSidebar navItems={sidebarNavItems} />

            <div className={styles.mainArea}>
                <AdminNavbar />

                <div className={styles.scrollArea}>
                    <div className={styles.contentWrapper}>
                        {/* Header */}
                        <div className={styles.pageHeader}>
                            <div>
                                <h1 className={styles.pageTitle}>Admin Dashboard</h1>
                                <p className={styles.pageSubtitle}>Platform Overview & Command Center</p>
                            </div>
                            <div className={styles.headerActions}>
                                <button className={styles.dateDropdown}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    Last 30 Days
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>
                                <button className={styles.exportButton}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                    Export Data
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <StatsCards stats={statsData} />

                        {/* Action Buttons */}
                        <ActionButtons />

                        {/* Charts Row */}
                        <div className={styles.chartsRow}>
                            <PlatformGrowthChart />
                            <UserDistributionChart />
                        </div>

                        {/* Middle Row */}
                        <div className={styles.middleRow}>
                            <RecentBlogsTable blogs={recentBlogs} />
                            <FeaturedBlogsPanel blogs={featuredBlogs} />
                        </div>

                        {/* Bottom Row */}
                        <div className={styles.bottomRow}>
                            <PlatformActivity activities={platformActivities} />
                            <SystemHealth metrics={systemHealth} />
                        </div>

                        {/* Footer */}
                        <AdminFooter />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;