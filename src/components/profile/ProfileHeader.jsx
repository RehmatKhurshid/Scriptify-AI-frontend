import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from '../../styles/profile/ProfileHeader.module.css';

const ProfileHeader = ({ user }) => {
    return (
        <div className={styles.header}>
            <div className={styles.banner}>
                <img src={user.banner} alt="Profile banner" />
                <div className={styles.bannerOverlay} />
            </div>

            <div className={styles.headerContent}>
                <div className={styles.avatarSection}>
                    <div className={styles.avatar}>
                        <img src={user.avatar} alt={user.name} />
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.nameRow}>
                        <h1 className={styles.name}>{user.name}</h1>
                    </div>

                    {user.bio ? (
                        <p className={styles.bio}>{user.bio}</p>
                    ) : (
                        <p className={styles.bio} style={{ color: '#64748b', fontStyle: 'italic' }}>
                            No bio provided yet. Click edit profile to add your bio.
                        </p>
                    )}

                    <div className={styles.metaRow}>
                        <span className={styles.metaItem}>
                            <Calendar size={14} />
                            Joined {user.joined}
                        </span>
                        <span className={styles.metaItem}>
                            <CheckCircle size={14} />
                            {user.authProvider}
                        </span>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ProfileHeader;