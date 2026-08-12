import React, { useCallback, useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/admin-dashboard/AdminSidebar';
import AdminNavbar from '../../components/admin/admin-dashboard/AdminNavbar';
import StatsCards from '../../components/admin/admin-dashboard/StatsCards';
import PlatformGrowthChart from '../../components/admin/admin-dashboard/PlatformGrowthChart';
import UserDistributionChart from '../../components/admin/admin-dashboard/UserDistributionChart';
import RecentBlogsTable from '../../components/admin/admin-dashboard/RecentBlogsTable';
import FeaturedBlogsPanel from '../../components/admin/admin-dashboard/FeaturedBlogPanel';
import PlatformActivity from '../../components/admin/admin-dashboard/PlatformActivity';
import SystemHealth from '../../components/admin/admin-dashboard/SystemHealth';
import adminService from '../../services/adminService';
import styles from '../../styles/admin/admin-dashboard/AdminDashboard.module.css';

const AdminDashboard = () => {
  const [d, setD] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setD(await adminService.getDashboard());
    } catch (e) {
      setError(e.message || 'Unable to load dashboard.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const s = d?.stats || {};
  const stats = [
    { label: 'TOTAL USERS', value: (s.totalUsers || 0).toLocaleString(), change: `+${s.newUsersThisWeek || 0} this week`, icon: 'Users', trend: 'up' },
    { label: 'TOTAL BLOGS', value: (s.totalBlogs || 0).toLocaleString(), change: `+${s.newBlogsThisWeek || 0} this week`, icon: 'FileText', trend: 'up' },
    { label: 'COMMENTS', value: (s.totalComments || 0).toLocaleString(), icon: 'MessageSquare' },
    { label: 'URGENT ATTENTION', value: (s.flaggedComments || 0).toLocaleString(), subtext: 'Comments Await Review', icon: 'AlertTriangle', isUrgent: true },
    { label: 'TOTAL VIEWS', value: (s.totalViews || 0).toLocaleString(), icon: 'Activity' },
  ];

  const recent = (d?.topBlogs || []).map((x) => ({
    id: x._id,
    title: x.title,
    author: x.author ? `${x.author.firstName || ''} ${x.author.lastName || ''}`.trim() : 'Unknown',
    views: (x.views || 0).toLocaleString(),
    status: 'Published',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${x.author?._id || x._id}`,
  }));

  const featured = (d?.topBlogs || []).slice(0, 4).map((x, idx) => ({
    id: x._id,
    title: x.title,
    featured: x.isFeatured ? 'Active' : 'Top',
    views: `${(x.views || 0).toLocaleString()} views`,
    image: x.coverImage || x.image || x.thumbnail || '',
    color: ['#6366f1', '#ec4899', '#10b981', '#f59e0b'][idx % 4],
  }));

  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', active: true },
    { id: 'users', label: 'Users', icon: 'Users' },
    { id: 'blogs', label: 'Blogs', icon: 'FileText' },
    { id: 'flagged', label: 'Flagged Comments', icon: 'Flag' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
  ];

  return (
    <div className={styles.dashboardPage}>
      <AdminSidebar navItems={nav} />
      <div className={styles.mainArea}>
        <AdminNavbar />
        <div className={styles.scrollArea}>
          <div className={styles.contentWrapper}>
            <div className={styles.pageHeader}>
              <div>
                <h1 className={styles.pageTitle}>Admin Dashboard</h1>
                <p className={styles.pageSubtitle}>Platform Overview & Command Center</p>
              </div>
            </div>
            {error && <div style={{ color: '#f87171', padding: 12 }}>{error}</div>}
            {loading ? (
              <div style={{ padding: 50, textAlign: 'center' }}>Loading dashboard...</div>
            ) : (
              <>
                <StatsCards stats={stats} />
                <div className={styles.chartsRow}>
                  <PlatformGrowthChart data={d?.growthData} />
                  <UserDistributionChart data={d?.userDistribution} />
                </div>
                <div className={styles.middleRow}>
                  <RecentBlogsTable blogs={recent} />
                  <FeaturedBlogsPanel blogs={featured} />
                </div>
                <div className={styles.bottomRow}>
                  <PlatformActivity
                    activities={(d?.recentUsers || []).map((u) => ({
                      id: u._id,
                      text: `New user: ${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email,
                      time: u.createdAt ? new Date(u.createdAt).toLocaleString() : '-',
                      icon: 'UserPlus',
                      color: '#a78bfa',
                    }))}
                  />
                  <SystemHealth
                    metrics={[
                      { label: 'Database', value: 'Connected', color: '#34d399' },
                      { label: 'API', value: 'Healthy', color: '#06b6d4' },
                    ]}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;