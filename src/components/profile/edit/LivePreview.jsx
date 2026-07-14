import React from 'react';
import { FiEye } from 'react-icons/fi';
import Avatar from '../../common/Avatar';
import styles from '../../../styles/profile/edit/LivePreview.module.css';

const LivePreview = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <FiEye className={styles.headerIcon} />
                <h3 className={styles.headerTitle}>Live Preview</h3>
            </div>

            <div className={styles.card}>
                <div className={styles.avatarSection}>
                    <Avatar
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                        alt="Alex Chen"
                        size="xl"
                    />
                </div>

                <div className={styles.info}>
                    <h2 className={styles.name}>Alex Chen</h2>
                    <p className={styles.role}>Blogger & Technologist</p>
                    <p className={styles.bio}>
                        AI Enthusiast & Tech Blogger exploring the intersection of design, code, and generative intelligence.
                    </p>

                    <div className={styles.tags}>
                        <span className={styles.tag}>Technology</span>
                        <span className={styles.tag}>AI</span>
                        <span className={styles.tag}>Design</span>
                    </div>

                    <button className={styles.viewProfileButton}>
                        View Public Profile
                    </button>
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>2.4k</span>
                        <span className={styles.statLabel}>Followers</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>800</span>
                        <span className={styles.statLabel}>Following</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>124</span>
                        <span className={styles.statLabel}>Bookmarks</span>
                    </div>
                </div>

                <div className={styles.details}>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Role</span>
                        <span className={styles.detailValue}>Blogger</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Auth Provider</span>
                        <span className={styles.detailValue}>Google</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Verification</span>
                        <span className={`${styles.detailValue} ${styles.verified}`}>Verified</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Joined</span>
                        <span className={styles.detailValue}>Oct 12, 2023</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Last Updated</span>
                        <span className={styles.detailValue}>2 days ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LivePreview;