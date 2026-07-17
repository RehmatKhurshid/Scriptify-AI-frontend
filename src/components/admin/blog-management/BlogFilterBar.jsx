import React from 'react';
import { ChevronDown } from 'lucide-react';
import styles from '../../../styles/admin/blog-management/BlogFilterBar.module.css';

const BlogFilterBar = () => {
    const filters = [
        { label: 'Category', value: 'All Categories', options: ['All Categories', 'Design', 'AI', 'Tech', 'Marketing'] },
        { label: 'Status', value: 'All Statuses', options: ['All Statuses', 'Published', 'Draft', 'Hidden'] },
        { label: 'Featured', value: 'All Posts', options: ['All Posts', 'Featured', 'Not Featured'] },
    ];

    return (
        <div className={styles.filterRow}>
            {filters.map((filter, index) => (
                <div key={index} className={styles.filterGroup}>
                    <label className={styles.filterLabel}>{filter.label}</label>
                    <div className={styles.selectWrapper}>
                        <select className={styles.select} defaultValue={filter.value}>
                            {filter.options.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className={styles.selectIcon} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogFilterBar;