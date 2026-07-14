import React, { useState } from 'react';
import { FiAlertTriangle, FiCheck } from 'react-icons/fi';
import styles from '../../../styles/profile/edit/DangerZone.module.css';

const DangerZone = () => {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <FiAlertTriangle className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Danger Zone</h3>
            </div>

            <div className={styles.content}>
                <div className={styles.warning}>
                    <div className={styles.warningText}>
                        <h4 className={styles.warningTitle}>Delete or Disable Account</h4>
                        <p className={styles.warningDesc}>
                            Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                    </div>
                    <div className={styles.warningActions}>
                        <button className={styles.deactivateButton}>
                            Deactivate
                        </button>
                        <button className={styles.deleteButton}>
                            Delete Account
                        </button>
                    </div>
                </div>

                {saved && (
                    <div className={styles.successToast}>
                        <FiCheck className={styles.successIcon} />
                        Profile updated successfully!
                    </div>
                )}
            </div>
        </div>
    );
};

export default DangerZone;