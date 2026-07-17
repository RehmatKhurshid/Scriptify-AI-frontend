import React from 'react';
import { Star, EyeOff, Download, Trash2 } from 'lucide-react';
import styles from '../../../styles/admin/blog-management/BlogBulkActions.module.css';

const BlogBulkActions = ({ selectedCount }) => {
    return (
        <div className={styles.bulkActions}>
            <span className={styles.label}>Bulk Actions:</span>

            <button className={styles.actionBtn}>
                <Star size={14} />
                Mark Featured
            </button>

            <button className={styles.actionBtn}>
                <EyeOff size={14} />
                Hide
            </button>

            <button className={styles.actionBtn}>
                <Download size={14} />
                Export
            </button>

            <button className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                <Trash2 size={14} />
                Delete
            </button>
        </div>
    );
};

export default BlogBulkActions;