import React from 'react';
import { FiUser } from 'react-icons/fi';
import styles from '../../../styles/profile/edit/PersonalInfo.module.css';

const PersonalInfo = ({ formData, onChange }) => {
    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <FiUser className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Personal Information</h3>
            </div>

            <div className={styles.grid}>
                <div className={styles.field}>
                    <label className={styles.label}>First Name</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={formData.firstName || ''}
                        onChange={(e) => onChange('firstName', e.target.value)}
                        placeholder="Enter your first name"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Last Name</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={formData.lastName || ''}
                        onChange={(e) => onChange('lastName', e.target.value)}
                        placeholder="Enter your last name"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Mobile Number</label>
                    <input
                        type="tel"
                        className={styles.input}
                        value={formData.mobile || ''}
                        onChange={(e) => onChange('mobile', e.target.value)}
                        placeholder="+1 (555) 000-0000"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Email Address</label>
                    <div className={styles.emailWrapper}>
                        <input
                            type="email"
                            className={styles.input}
                            value={formData.email || ''}
                            readOnly
                        />
                        <span className={styles.verifiedBadge}>Verified</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;