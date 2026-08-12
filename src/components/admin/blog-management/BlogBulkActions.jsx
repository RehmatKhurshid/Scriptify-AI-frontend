import React from 'react';
import { Star, EyeOff, Download, Trash2 } from 'lucide-react';
import styles from '../../../styles/admin/blog-management/BlogBulkActions.module.css';

const BlogBulkActions = ({ selectedCount = 0, onMarkFeatured, onDeleteSelected }) => {
    return (
        <div className={styles.bulkActions}>
            <span className={styles.label}>Bulk Actions ({selectedCount}):</span>

            <button className={styles.actionBtn} disabled={!selectedCount} onClick={onMarkFeatured}>
                <Star size={14} />
                Mark Featured
            </button>

            <button className={`${styles.actionBtn} ${styles.deleteBtn}`} disabled={!selectedCount} onClick={onDeleteSelected}>
                <Trash2 size={14} />
                Delete
            </button>
        </div>
    );
};

export default BlogBulkActions;