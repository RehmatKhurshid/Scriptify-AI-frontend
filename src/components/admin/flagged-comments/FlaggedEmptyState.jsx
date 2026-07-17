import React from 'react';
import { ShieldCheck } from 'lucide-react';
import styles from '../../../styles/admin/flagged-comments/FlaggedEmptyState.module.css';

const FlaggedEmptyState = () => {
    return (
        <div className={styles.emptyState}>
            <div className={styles.icon}>
                <ShieldCheck size={48} />
            </div>
            <h3 className={styles.title}>All Clear!</h3>
            <p className={styles.subtitle}>
                No flagged comments require review at this time.
            </p>
        </div>
    );
};

export default FlaggedEmptyState;