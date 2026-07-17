import React from 'react';
import styles from '../../../styles/admin/user-management/UserManagementHeader.module.css';

const UserManagementHeader = ({ totalUsers }) => {
    return (
        <div className={styles.header}>
            <div className={styles.titleSection}>
                <h1 className={styles.title}>User Management</h1>
                <p className={styles.subtitle}>
                    Manage accounts, roles, and access across the platform.
                </p>
            </div>

            <div className={styles.statCard}>
                <span className={styles.statLabel}>TOTAL USERS</span>
                <span className={styles.statValue}>{totalUsers}</span>
            </div>
        </div>
    );
};

export default UserManagementHeader;