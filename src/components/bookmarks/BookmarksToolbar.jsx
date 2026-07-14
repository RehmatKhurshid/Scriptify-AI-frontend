import React, { useState } from 'react';
import { FiFilter, FiCheckSquare, FiTrash2, FiClock, FiChevronDown } from 'react-icons/fi';
import styles from '../../styles/bookmarks/BookmarksToolbar.module.css';

const BookmarksToolbar = () => {
    const [selectedCount, setSelectedCount] = useState(0);

    return (
        <div className={styles.toolbar}>
            <div className={styles.left}>
                <button className={styles.selectAllButton}>
                    <FiCheckSquare className={styles.buttonIcon} />
                    Select All
                </button>
                {selectedCount > 0 && (
                    <button className={styles.removeButton}>
                        <FiTrash2 className={styles.buttonIcon} />
                        Remove Selected
                    </button>
                )}
                <button className={styles.clearAllButton}>
                    Clear All
                </button>
            </div>

            <div className={styles.right}>
                <button className={styles.filterButton}>
                    <FiFilter className={styles.buttonIcon} />
                    Filter
                    <FiChevronDown className={styles.chevron} />
                </button>
                <button className={styles.sortButton}>
                    <FiClock className={styles.buttonIcon} />
                    Recently Bookmarked
                    <FiChevronDown className={styles.chevron} />
                </button>
            </div>
        </div>
    );
};

export default BookmarksToolbar;