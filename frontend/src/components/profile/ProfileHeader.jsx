import React from 'react';
import { FiEdit3 } from 'react-icons/fi';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import styles from '../../styles/profile/ProfileHeader.module.css';

const ProfileHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles.avatarWrapper}>
                <Avatar
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                    alt="Alex Chen"
                    size="xl"
                    className={styles.avatar}
                />
            </div>

            <h1 className={styles.name}>Alex Chen</h1>
            <p className={styles.bio}>
                AI Enthusiast & Tech Blogger exploring the intersection of design, code, and generative intelligence.
            </p>

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <span className={styles.statValue}>2.4k</span>
                    <span className={styles.statLabel}>FOLLOWERS</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statValue}>800</span>
                    <span className={styles.statLabel}>FOLLOWING</span>
                </div>
            </div>

            <Button variant="outline" size="sm" icon={<FiEdit3 />}>
                Edit Profile
            </Button>
        </div>
    );
};

export default ProfileHeader;