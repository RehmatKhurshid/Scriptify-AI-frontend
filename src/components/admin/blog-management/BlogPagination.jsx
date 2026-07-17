import React from 'react';
import styles from '../../../styles/admin/blog-management/BlogPagination.module.css';

const BlogPagination = ({ currentPage, totalPages, totalItems, itemsPerPage }) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className={styles.paginationBar}>
            <span className={styles.showingText}>
                Showing {startItem}-{endItem} of {totalItems} Blogs
            </span>

            <div className={styles.pageControls}>
                <button className={styles.pageBtn} disabled={currentPage === 1}>
                    Previous
                </button>

                <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
                <button className={styles.pageBtn}>2</button>
                <button className={styles.pageBtn}>3</button>

                <button className={styles.pageBtn} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default BlogPagination;