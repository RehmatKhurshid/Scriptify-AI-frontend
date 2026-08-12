import React from 'react';
import { KeyRound } from 'lucide-react';
import styles from '../../../styles/admin/settings/SecurityCard.module.css';

const SecurityCard = ({ data, onChangePassword }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>Security</h3>

            <div className={styles.securityItems}>
                <div className={styles.securityItem}>
                    <div className={styles.securityInfo}>
                        <span className={styles.securityLabel}>Password</span>
                        <span className={styles.securitySub}>Last changed {data.passwordLastChanged}</span>
                    </div>
                    <button className={styles.actionBtn} onClick={onChangePassword}>
                        <KeyRound size={14} />
                        Change Password
                    </button>
                </div>

                <div className={styles.divider} />

                <div className={styles.securityItem}>
                    <div className={styles.securityInfo}>
                        <span className={styles.securityLabel}>Active Sessions</span>
                        <span className={styles.securitySub}>
                            Currently logged in on {data.activeSessions} devices
                        </span>
                    </div>
                    <button className={styles.textLink}>Manage Devices</button>
                </div>
            </div>
        </div>
    );
};

export default SecurityCard;