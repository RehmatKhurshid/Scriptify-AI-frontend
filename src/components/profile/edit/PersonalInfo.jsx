import React from 'react';
import { FiUser } from 'react-icons/fi';
import styles from '../../../styles/profile/edit/PersonalInfo.module.css';

const PersonalInfo = () => {
    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <FiUser className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Personal Information</h3>
            </div>

            <div className={styles.grid}>
                <div className={styles.field}>
                    <label className={styles.label}>First Name</label>
                    <input type="text" className={styles.input} defaultValue="Alex" />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Last Name</label>
                    <input type="text" className={styles.input} defaultValue="Chen" />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Mobile Number</label>
                    <input type="tel" className={styles.input} defaultValue="+1 (555) 012-3456" />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Email Address</label>
                    <div className={styles.emailWrapper}>
                        <input type="email" className={styles.input} defaultValue="alex.chen@scriptify.ai" readOnly />
                        <span className={styles.verifiedBadge}>Verified</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;