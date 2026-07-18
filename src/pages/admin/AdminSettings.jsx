import React, { useState } from 'react';
import SettingsSidebar from '../../components/admin/settings/SettingsSidebar';
import SettingsTopNavbar from '../../components/admin/settings/SettingsTopNavbar';
import ProfileCard from '../../components/admin/settings/ProfileCard';
import AccountOverviewCard from '../../components/admin/settings/AccountOverviewCard';
import SecurityCard from '../../components/admin/settings/SecurityCard';
import PreferencesCard from '../../components/admin/settings/PreferencesCard';
import DangerZoneCard from '../../components/admin/settings/DangerZoneCard';
import styles from '../../styles/admin/settings/AdminSettings.module.css';

const AdminSettings = () => {
    const [theme, setTheme] = useState('dark');
    const [notifications, setNotifications] = useState(true);

    const sidebarNavItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
        { id: 'users', label: 'Users', icon: 'users' },
        { id: 'blogs', label: 'Blogs', icon: 'blogs' },
        { id: 'flagged', label: 'Flagged Comments', icon: 'flagged' },
        { id: 'settings', label: 'Settings', icon: 'settings', active: true },
    ];

    const profileData = {
        fullName: 'Dr. Elias Thorne',
        email: 'admin@scriptify.ai',
        role: 'Administrator',
        joined: 'Oct 2023',
        lastLogin: '2 hours ago',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elias',
    };

    const accountData = {
        status: 'Active',
        emailVerified: 'Yes',
        authProvider: 'Local',
    };

    const securityData = {
        passwordLastChanged: '30 days ago',
        activeSessions: 2,
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

                        <div className={styles.cardsList}>
                            <ProfileCard data={profileData} />
                            <AccountOverviewCard data={accountData} />
                            <SecurityCard data={securityData} />
                            <PreferencesCard
                                theme={theme}
                                onThemeChange={setTheme}
                                notifications={notifications}
                                onNotificationsChange={setNotifications}
                            />
                            <DangerZoneCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;