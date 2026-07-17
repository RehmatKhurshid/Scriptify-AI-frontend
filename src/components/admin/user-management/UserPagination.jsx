import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '../../../styles/admin/user-management/UserPagination.module.css';

const UserPagination = ({ currentPage, totalPages, totalItems, itemsPerPage }) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className={styles.pagination}>
            <span className={styles.showingText}>
                Showing {startItem}-{endItem} of {totalItems.toLocaleString()} users
            </span>

            <div className={styles.pageControls}>
                <button className={styles.pageBtn} disabled={currentPage === 1}>
                    <ChevronLeft size={16} />
                </button>

                <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
                <button className={styles.pageBtn}>2</button>
                <button className={styles.pageBtn}>3</button>

                <span className={styles.ellipsis}>...</span>

                <button className={styles.pageBtn}>{totalPages.toLocaleString()}</button>

                <button className={styles.pageBtn} disabled={currentPage === totalPages}>
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default UserPagination;