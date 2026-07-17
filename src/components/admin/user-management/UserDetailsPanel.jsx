import React from 'react';
import { X, Trash2 } from 'lucide-react';
import styles from '../../../styles/admin/user-management/UserDetailsPanel.module.css';

const UserDetailsPanel = ({ user, isOpen, onClose }) => {
    if (!user) return null;

    return (
        <aside className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
            <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>User Details</h3>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={20} />
                </button>
            </div>

            <div className={styles.panelContent}>
                <div className={styles.userProfile}>
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatar} style={{ background: '#1e293b' }}>
                            <span className={styles.initials}>{user.initials}</span>
                        </div>
                    </div>

                    <h2 className={styles.userName}>{user.name}</h2>
                    <p className={styles.userEmail}>{user.email}</p>
                </div>

                <div className={styles.statsRow}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>FOLLOWERS</span>
                        <span className={styles.statValue}>{user.followers}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>FOLLOWING</span>
                        <span className={styles.statValue}>{user.following}</span>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>BIO</span>
                        <p className={styles.infoValue}>{user.bio}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>MOBILE</span>
                        <p className={styles.infoValue}>{user.mobile}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>JOINED</span>
                        <p className={styles.infoValue}>{user.joined}</p>
                    </div>
                </div>
            </div>

            <div className={styles.panelFooter}>
                <button className={styles.editBtn}>Edit Profile</button>
                <button className={styles.deleteBtn}>
                    <Trash2 size={18} />
                </button>
            </div>
        </aside>
    );
};

export default UserDetailsPanel;