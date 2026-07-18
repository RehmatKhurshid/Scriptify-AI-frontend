import React from 'react';
import styles from '../../../styles/admin/settings/AccountOverviewCard.module.css';

const AccountOverviewCard = ({ data }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>Account Overview</h3>

            <div className={styles.overviewGrid}>
                <div className={styles.overviewItem}>
                    <div className={`${styles.iconWrapper} ${styles.statusIcon}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="12" r="6" fill="currentColor" fillOpacity="0.2" />
                            <circle cx="12" cy="12" r="3" fill="currentColor" />
                        </svg>
                    </div>
                    <div className={styles.overviewContent}>
                        <span className={styles.overviewLabel}>STATUS</span>
                        <div className={styles.statusRow}>
                            <span className={styles.statusDot} />
                            <span className={styles.statusText}>{data.status}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.overviewItem}>
                    <div className={`${styles.iconWrapper} ${styles.emailIcon}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <polyline points="9 11 11 13 15 9" />
                        </svg>
                    </div>
                    <div className={styles.overviewContent}>
                        <span className={styles.overviewLabel}>EMAIL VERIFIED</span>
                        <span className={styles.overviewValue}>{data.emailVerified}</span>
                    </div>
                </div>

                <div className={styles.overviewItem}>
                    <div className={`${styles.iconWrapper} ${styles.authIcon}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <text x="12" y="15" fontSize="10" fontWeight="bold" fill="currentColor" textAnchor="middle">B</text>
                        </svg>
                    </div>
                    <div className={styles.overviewContent}>
                        <span className={styles.overviewLabel}>AUTH PROVIDER</span>
                        <span className={styles.overviewValue}>{data.authProvider}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountOverviewCard;