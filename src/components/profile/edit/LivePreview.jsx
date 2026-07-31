import React from 'react';
import { FiEye } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import Avatar from '../../common/Avatar';
import styles from '../../../styles/profile/edit/LivePreview.module.css';

const LivePreview = ({ formData, avatarPreview }) => {
    const { user } = useAuth();

    const firstName = formData?.firstName ?? user?.firstName ?? '';
    const lastName = formData?.lastName ?? user?.lastName ?? '';
    const fullName = `${firstName} ${lastName}`.trim() || 'Logged User';
    
    const previewAvatar = avatarPreview || user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName || 'User')}`;
    const userRole = (user?.role ? user.role : 'blogger').toUpperCase();
    
    const joinedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'March 2024';

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <FiEye className={styles.headerIcon} />
                <h3 className={styles.headerTitle}>Live Preview</h3>
            </div>

            <div className={styles.card}>
                <div className={styles.avatarSection}>
                    <Avatar
                        src={previewAvatar}
                        alt={fullName}
                        size="xl"
                    />
                </div>

                <div className={styles.info}>
                    <h2 className={styles.name}>{fullName || 'Scriptify User'}</h2>
                    <p className={styles.role}>{userRole}</p>
                    {formData?.bio ? (
                        <p className={styles.bio}>{formData.bio}</p>
                    ) : null}


                </div>



                <div className={styles.details}>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Role</span>
                        <span className={styles.detailValue}>{userRole}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Auth Provider</span>
                        <span className={styles.detailValue}>{user?.googleId ? 'Google' : 'Email/Password'}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Verification</span>
                        <span className={`${styles.detailValue} ${styles.verified}`}>Verified User</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Joined Date</span>
                        <span className={styles.detailValue}>{joinedDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LivePreview;