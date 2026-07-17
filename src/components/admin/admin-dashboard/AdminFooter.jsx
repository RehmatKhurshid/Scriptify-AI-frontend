import React from 'react';
import styles from '../../../styles/admin/admin-dashboard/AdminFooter.module.css';

const AdminFooter = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLeft}>
                <span className={styles.status}>
                    <span className={styles.statusDot} />
                    System Operational
                </span>
                <span className={styles.version}>v2.4.0-admin</span>
            </div>

            <div className={styles.footerLinks}>
                <a href="#" className={styles.footerLink}>Documentation</a>
                <a href="#" className={styles.footerLink}>API Keys</a>
                <a href="#" className={styles.footerLink}>Support Portal</a>
            </div>

            <div className={styles.footerRight}>
                <span>© 2024 Scriptly AI Core. Intelligence Layer Enabled.</span>
            </div>
        </footer>
    );
};

export default AdminFooter;