import React from 'react';
import styles from '../../../styles/admin/blog-management/BlogManagementHeader.module.css';

const BlogManagementHeader = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>Blog Management</h1>
            <p className={styles.subtitle}>
                Manage platform content, visibility, and featured stories.
            </p>
        </div>
    );
};

export default BlogManagementHeader;