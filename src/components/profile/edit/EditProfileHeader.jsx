import React from 'react';
import styles from '../../../styles/profile/edit/EditProfileHeader.module.css';

const EditProfileHeader = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>Edit Profile</h1>
            <p className={styles.subtitle}>Manage your personal information and public profile.</p>
        </div>
    );
};

export default EditProfileHeader;