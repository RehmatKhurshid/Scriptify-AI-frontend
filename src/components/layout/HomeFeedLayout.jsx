import React from 'react';
import TopNavbar from '../navigation/TopNavbar';
import styles from '../../styles/layout/HomeFeedLayout.module.css';

const HomeFeedLayout = ({ children }) => {
    return (
        <div className={styles.container}>
            <TopNavbar />
            <main className={styles.main}>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default HomeFeedLayout;