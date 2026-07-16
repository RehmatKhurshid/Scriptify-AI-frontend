import React from 'react';
import { PenLine, MapPin, Link as LinkIcon, Calendar, CheckCircle } from 'lucide-react';
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
                        <span className={styles.verifiedBadge}>
                            <CheckCircle size={14} />
                            Verified Author
                        </span>
                    </div>

                    <p className={styles.bio}>{user.bio}</p>

                    <div className={styles.metaRow}>
                        <span className={styles.metaItem}>
                            <MapPin size={14} />
                            {user.location}
                        </span>
                        <span className={styles.metaItem}>
                            <LinkIcon size={14} />
                            {user.website}
                        </span>
                        <span className={styles.metaItem}>
                            <Calendar size={14} />
                            Joined {user.joined}
                        </span>
                        <span className={styles.metaItem}>
                            <CheckCircle size={14} />
                            Authenticated via {user.authProvider}
                        </span>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Link to="/create" className={styles.writeButton}>
                        <PenLine size={16} />
                        <span>Write New Blog</span>
                    </Link>
                    <Link to="/edit-profile" className={styles.editButton} title="Edit Profile">
                        <PenLine size={16} />
                    </Link>
                    <button className={styles.moreButton}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="6" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="12" cy="18" r="2" />
                        </svg>
                    </button>
                    <Link to="/change-password" className={styles.changePassword}>
                        Change Password
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;