import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsSidebar from '../../components/admin/settings/SettingsSidebar';
import SettingsTopNavbar from '../../components/admin/settings/SettingsTopNavbar';
import ProfileCard from '../../components/admin/settings/ProfileCard';
import AccountOverviewCard from '../../components/admin/settings/AccountOverviewCard';
import SecurityCard from '../../components/admin/settings/SecurityCard';
import PreferencesCard from '../../components/admin/settings/PreferencesCard';
import DangerZoneCard from '../../components/admin/settings/DangerZoneCard';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/userService';
import styles from '../../styles/admin/settings/AdminSettings.module.css';

const AdminSettings = () => {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(true);
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

    const sidebarNavItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
        { id: 'users', label: 'Users', icon: 'users' },
        { id: 'blogs', label: 'Blogs', icon: 'blogs' },
        { id: 'flagged', label: 'Flagged Comments', icon: 'flagged' },
        { id: 'settings', label: 'Settings', icon: 'settings', active: true },
    ];

    const displayName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email : 'Admin';

    const profileData = {
        fullName: displayName,
        email: user?.email || 'admin@scriptify.ai',
        role: user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Administrator',
        joined: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Oct 2023',
        lastLogin: 'Active session',
        avatar: user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'Elias'}`,
    };

    const accountData = {
        status: user?.isSuspended ? 'Suspended' : 'Active',
        emailVerified: user?.isVerified ? 'Yes' : 'No',
        authProvider: user?.authProvider === 'google' ? 'Google' : 'Local',
    };

    const securityData = {
        passwordLastChanged: 'Recent',
        activeSessions: 1,
    };

    const handleSaveProfile = async (formData) => {
        try {
            setStatusMsg({ type: '', text: '' });
            const updated = await userService.updateProfile(formData);
            if (updated?.user) {
                updateUser(updated.user);
            } else {
                updateUser(formData);
            }
            setStatusMsg({ type: 'success', text: 'Profile updated successfully.' });
        } catch (err) {
            setStatusMsg({ type: 'error', text: err.message || 'Failed to update profile.' });
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/signin');
    };

    return (
        <div className={styles.page}>
            <SettingsSidebar navItems={sidebarNavItems} />

            <div className={styles.mainArea}>
                <SettingsTopNavbar />

                <div className={styles.scrollArea}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.pageHeader}>
                            <h1 className={styles.pageTitle}>Settings</h1>
                            <p className={styles.pageSubtitle}>
                                Manage your administrative profile and system preferences.
                            </p>
                        </div>

                        {statusMsg.text && (
                            <div style={{
                                padding: '12px 16px',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                backgroundColor: statusMsg.type === 'success' ? '#065f46' : '#7f1d1d',
                                color: '#ffffff',
                                fontSize: '14px',
                            }}>
                                {statusMsg.text}
                            </div>
                        )}

                        <div className={styles.cardsList}>
                            <ProfileCard data={profileData} onSave={handleSaveProfile} />
                            <AccountOverviewCard data={accountData} />
                            <SecurityCard data={securityData} onChangePassword={() => navigate('/change-password')} />
                            <PreferencesCard
                                notifications={notifications}
                                onNotificationsChange={setNotifications}
                            />
                            <DangerZoneCard onLogout={handleLogout} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;