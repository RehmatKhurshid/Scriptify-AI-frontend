import React, { useCallback, useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/admin-dashboard/AdminSidebar';
import TopSearchNavbar from '../../components/admin/user-management/TopSearchNavbar';
import UserManagementHeader from '../../components/admin/user-management/UserManagementHeader';
import UserFilterBar from '../../components/admin/user-management/UserFilterBar';
import UsersTable from '../../components/admin/user-management/UsersTable';
import UserPagination from '../../components/admin/user-management/UserPagination';
import UserDetailsPanel from '../../components/admin/user-management/UserDetailsPanel';
import adminService from '../../services/adminService';
import styles from '../../styles/admin/user-management/UserManagement.module.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [verified, setVerified] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1, limit: 10 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const d = await adminService.getUsers({
        page,
        limit: 10,
        search: search.trim(),
        role,
        status,
        verified,
      });
      const mapped = (d.users || []).map((u) => ({
        ...u,
        id: u._id,
        name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email,
        initials: `${u.firstName?.[0] || ''}${u.lastName?.[0] || ''}`.toUpperCase() || 'U',
        avatar: u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.email}`,
        auth: u.authProvider === 'google' ? 'Google' : 'Local',
        role: u.role === 'admin' ? 'Admin' : u.role === 'blogger' ? 'Blogger' : 'Reader',
        status: u.isSuspended || !u.isActive ? 'Suspended' : 'Active',
        joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-',
        verified: !!u.isVerified,
        followers: u.followers?.length || 0,
        following: u.following?.length || 0,
      }));
      setUsers(mapped);
      setMeta({ total: d.total || 0, totalPages: d.totalPages || 1, limit: d.limit || 10 });
      if (selected) {
        const f = mapped.find((u) => u.id === selected.id);
        if (f) setSelected(f);
      }
    } catch (e) {
      setError(e.message || 'Unable to load users.');
    } finally {
      setLoading(false);
    }
  }, [page, role, status, verified, search, selected]);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = async (u) => {
    try {
      await adminService.toggleUserSuspension(u.id);
      await load();
    } catch (e) {
      setError(e.message || 'Unable to update user.');
    }
  };

  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'users', label: 'Users', icon: 'Users', active: true },
    { id: 'blogs', label: 'Blogs', icon: 'FileText' },
    { id: 'flagged', label: 'Flagged Comments', icon: 'Flag' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
  ];

  return (
    <div className={styles.managementPage}>
      <AdminSidebar navItems={nav} isEditorial />
      <div className={styles.mainArea}>
        <TopSearchNavbar
          search={search}
          onSearchChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        <div className={styles.contentArea}>
          <UserManagementHeader totalUsers={meta.total.toLocaleString()} />
          <UserFilterBar
            search={search}
            role={role}
            status={status}
            verified={verified}
            onSearchChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            onRoleChange={(v) => {
              setRole(v);
              setPage(1);
            }}
            onStatusChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
            onVerifiedChange={(v) => {
              setVerified(v);
              setPage(1);
            }}
            onResetFilters={() => {
              setSearch('');
              setRole('');
              setStatus('');
              setVerified('');
              setPage(1);
            }}
          />
          {error && <div style={{ color: '#f87171', padding: 12 }}>{error}</div>}
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center' }}>Loading users...</div>
          ) : (
            <UsersTable
              users={users}
              onUserClick={(u) => {
                setSelected(u);
                setOpen(true);
              }}
              selectedUserId={selected?.id}
              onToggleSuspension={toggle}
            />
          )}
          <UserPagination {...meta} currentPage={page} totalItems={meta.total} onPageChange={setPage} />
        </div>
      </div>
      <UserDetailsPanel
        user={selected}
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setSelected(null);
        }}
        onToggleSuspension={toggle}
      />
    </div>
  );
};

export default UserManagement;