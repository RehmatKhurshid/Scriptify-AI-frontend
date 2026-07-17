import React from 'react';
import { Eye, Pencil, Trash2, Ban, Mail, CheckCircle } from 'lucide-react';
import styles from '../../../styles/admin/user-management/UsersTable.module.css';

const UsersTable = ({ users, onUserClick, selectedUserId }) => {
    const getRoleStyle = (role) => {
        switch (role) {
            case 'Admin': return styles.roleAdmin;
            case 'Blogger': return styles.roleBlogger;
            case 'Reader': return styles.roleReader;
            default: return styles.roleReader;
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Active': return styles.statusActive;
            case 'Suspended': return styles.statusSuspended;
            default: return styles.statusActive;
        }
    };

    const getAuthIcon = (auth) => {
        if (auth === 'Google') {
            return (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
            );
        }
        return <Mail size={14} />;
    };

    return (
        <div className={styles.tableCard}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.thCheckbox}>
                            <div className={styles.checkbox}>
                                <input type="checkbox" id="selectAll" />
                            </div>
                        </th>
                        <th className={styles.th}>USER</th>
                        <th className={styles.th}>AUTH</th>
                        <th className={styles.th}>ROLE</th>
                        <th className={styles.th}>STATUS</th>
                        <th className={styles.th}>JOINED</th>
                        <th className={styles.thActions}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className={`${styles.row} ${selectedUserId === user.id ? styles.selected : ''}`}
                            onClick={() => onUserClick(user)}
                        >
                            <td className={styles.tdCheckbox}>
                                <div className={styles.checkbox}>
                                    <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                                </div>
                            </td>
                            <td className={styles.tdUser}>
                                <div className={styles.userCell}>
                                    <div className={styles.userAvatar}>
                                        <img src={user.avatar} alt={user.name} />
                                    </div>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userNameRow}>
                                            <span className={styles.userName}>{user.name}</span>
                                            {user.verified && (
                                                <CheckCircle size={14} className={styles.verifiedBadge} />
                                            )}
                                        </div>
                                        <span className={styles.userEmail}>{user.email}</span>
                                    </div>
                                </div>
                            </td>
                            <td className={styles.td}>
                                <div className={styles.authCell}>
                                    {getAuthIcon(user.auth)}
                                    <span>{user.auth}</span>
                                </div>
                            </td>
                            <td className={styles.td}>
                                <span className={`${styles.roleBadge} ${getRoleStyle(user.role)}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className={styles.td}>
                                <div className={`${styles.statusBadge} ${getStatusStyle(user.status)}`}>
                                    <span className={styles.statusDot} />
                                    {user.status}
                                </div>
                            </td>
                            <td className={styles.td}>
                                <span className={styles.joined}>{user.joined}</span>
                            </td>
                            <td className={styles.tdActions}>
                                <div className={styles.actionButtons}>
                                    <button className={styles.actionBtn} title="View">
                                        <Eye size={16} />
                                    </button>
                                    <button className={styles.actionBtn} title="Edit">
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        className={`${styles.actionBtn} ${user.status === 'Suspended' ? styles.banBtn : styles.deleteBtn}`}
                                        title={user.status === 'Suspended' ? 'Unban' : 'Delete/Ban'}
                                    >
                                        {user.status === 'Suspended' ? <Ban size={16} /> : <Trash2 size={16} />}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;