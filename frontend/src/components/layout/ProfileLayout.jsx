import React from 'react';
import TopNavbar from '../navigation/TopNavbar';
import styles from '../../styles/layout/ProfileLayout.module.css';

const ProfileLayout = ({ children }) => {
    return (
        <div className={styles.container}>
            <TopNavbar />
            <main className={styles.main}>{children}</main>
        </div>
    );
};

export default ProfileLayout;