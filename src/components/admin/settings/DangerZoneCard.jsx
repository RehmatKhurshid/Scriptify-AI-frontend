import React from 'react';
import { LogOut, AlertTriangle } from 'lucide-react';
import styles from '../../../styles/admin/settings/DangerZoneCard.module.css';

const DangerZoneCard = ({ onLogout }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.warningIcon}>
                    <AlertTriangle size={16} />
                </div>
                <h3 className={styles.cardTitle}>Danger Zone</h3>
            </div>

            <p className={styles.cardSub}>
                Irreversible administrative actions. Proceed with caution.
            </p>

            <div className={styles.actions}>
                <button className={styles.logoutBtn} onClick={onLogout}>
                    <LogOut size={16} />
                    Logout
                </button>

                <button className={styles.deleteBtn} onClick={onLogout}>
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default DangerZoneCard;