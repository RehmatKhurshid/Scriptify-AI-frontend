import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/admin-dashboard/AdminSidebar';
import TopSearchNavbar from '../../components/admin/user-management/TopSearchNavbar';
import UserManagementHeader from '../../components/admin/user-management/UserManagementHeader';
import UserFilterBar from '../../components/admin/user-management/UserFilterBar';
import UsersTable from '../../components/admin/user-management/UsersTable';
import UserPagination from '../../components/admin/user-management/UserPagination';
import UserDetailsPanel from '../../components/admin/user-management/UserDetailsPanel';
import styles from '../../styles/admin/user-management/UserManagement.module.css';

const UserManagement = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [panelOpen, setPanelOpen] = useState(false);

    const sidebarNavItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
        { id: 'users', label: 'Users', icon: 'Users', active: true },
        { id: 'blogs', label: 'Blogs', icon: 'FileText' },
        { id: 'flagged', label: 'Flagged Comments', icon: 'Flag' },
        { id: 'settings', label: 'Settings', icon: 'Settings' },
    ];

    const users = [
        {
            id: 1,
            name: 'Elena Rostova',
            email: 'elena.r@editorial.co',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
            initials: 'ER',
            auth: 'Google',
            role: 'Admin',
            status: 'Active',
            joined: 'Oct 12, 2023',
            verified: true,
            followers: '12.4k',
            following: '842',
            bio: 'Senior Editorial Director at Scriptly AI. Passionate about tech storytelling and digital ethics.',
            mobile: '+1 (555) 012-3456',
        },
        {
            id: 2,
            name: 'Marcus Vance',
            email: 'm.vance@writes.ai',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
            initials: 'MV',
            auth: 'Local',
            role: 'Blogger',
            status: 'Active',
            joined: 'Nov 05, 2023',
            verified: false,
            followers: '8.2k',
            following: '1.2k',
            bio: 'Tech writer and software engineer. I write about AI, web development, and the future of work.',
            mobile: '+1 (555) 987-6543',
        },
        {
            id: 3,
            name: 'Julian Dax',
            email: 'julian.dax88@gmail.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julian',
            initials: 'JD',
            auth: 'Google',
            role: 'Reader',
            status: 'Suspended',
            joined: 'Jan 18, 2024',
            verified: true,
            followers: '0',
            following: '45',
            bio: 'AI enthusiast and avid reader. Always learning.',
            mobile: '+1 (555) 456-7890',
        },
    ];

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setPanelOpen(true);
    };

    const handleClosePanel = () => {
        setPanelOpen(false);
        setTimeout(() => setSelectedUser(null), 300);
    };

    return (
        <div className={styles.managementPage}>
            <AdminSidebar
                navItems={sidebarNavItems}
                isEditorial={true}
            />

            <div className={styles.mainArea}>
                <TopSearchNavbar />

                <div className={styles.contentArea}>
                    <UserManagementHeader totalUsers="42.8k" />
                    <UserFilterBar />
                    <UsersTable
                        users={users}
                        onUserClick={handleUserClick}
                        selectedUserId={selectedUser?.id}
                    />
                    <UserPagination
                        currentPage={1}
                        totalPages={4280}
                        totalItems={42800}
                        itemsPerPage={10}
                    />
                </div>
            </div>

            <UserDetailsPanel
                user={selectedUser}
                isOpen={panelOpen}
                onClose={handleClosePanel}
            />
        </div>
    );
};

export default UserManagement;