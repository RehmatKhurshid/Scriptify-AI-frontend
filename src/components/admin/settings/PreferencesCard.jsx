import React from 'react';
import styles from '../../../styles/admin/settings/PreferencesCard.module.css';

const PreferencesCard = ({ notifications, onNotificationsChange }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>Preferences</h3>

            <div className={styles.preferenceSection}>
                <div className={styles.toggleRow}>
                    <div className={styles.toggleInfo}>
                        <span className={styles.sectionLabel}>Email Notifications</span>
                        <span className={styles.toggleSub}>
                            Receive alerts for system updates and security events.
                        </span>
                    </div>
                    <button
                        className={`${styles.toggle} ${notifications ? styles.on : ''}`}
                        onClick={() => onNotificationsChange(!notifications)}
                    >
                        <span className={styles.toggleThumb} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreferencesCard;