import React from 'react';
import { ChevronDown } from 'lucide-react';
import styles from '../../../styles/admin/blog-management/BlogFilterBar.module.css';

const BlogFilterBar = ({ category, status, featured, onCategoryChange, onStatusChange, onFeaturedChange }) => {
    return (
        <div className={styles.filterRow}>
            <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Category</label>
                <div className={styles.selectWrapper}>
                    <select
                        className={styles.select}
                        value={category || 'All Categories'}
                        onChange={(e) => onCategoryChange?.(e.target.value)}
                    >
                        {['All Categories', 'General', 'Technology', 'AI', 'Design', 'Marketing'].map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <ChevronDown size={14} className={styles.selectIcon} />
                </div>
            </div>

            <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Status</label>
                <div className={styles.selectWrapper}>
                    <select
                        className={styles.select}
                        value={status || 'All Statuses'}
                        onChange={(e) => onStatusChange?.(e.target.value)}
                    >
                        {['All Statuses', 'Published', 'Draft'].map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <ChevronDown size={14} className={styles.selectIcon} />
                </div>
            </div>

            <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Featured</label>
                <div className={styles.selectWrapper}>
                    <select
                        className={styles.select}
                        value={featured || 'All Posts'}
                        onChange={(e) => onFeaturedChange?.(e.target.value)}
                    >
                        {['All Posts', 'Featured', 'Not Featured'].map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <ChevronDown size={14} className={styles.selectIcon} />
                </div>
            </div>
        </div>
    );
};

export default BlogFilterBar;