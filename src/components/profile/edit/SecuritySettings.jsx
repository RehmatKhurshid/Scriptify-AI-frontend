import React from 'react';
import { FiShield, FiChevronRight } from 'react-icons/fi';
import styles from '../../../styles/profile/edit/SecuritySettings.module.css';

const SecuritySettings = () => {
    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <FiShield className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Security</h3>
            </div>

            <div className={styles.options}>
                <button className={styles.option}>
                    <div className={styles.optionContent}>
                        <h4 className={styles.optionTitle}>Change Password</h4>
                        <p className={styles.optionDesc}>Update your account password regularly for better security.</p>
                    </div>
                    <FiChevronRight className={styles.optionArrow} />
                </button>

                <div className={styles.row}>
                    <div className={styles.optionHalf}>
                        <h4 className={styles.optionTitle}>Manage Sessions</h4>
                        <p className={styles.optionDesc}>Review and sign out from active sessions.</p>
                    </div>
                    <div className={styles.optionHalf}>
                        <h4 className={styles.optionTitle}>Two-Factor Auth</h4>
                        <p className={styles.optionDesc}>Add an extra layer of protection.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;