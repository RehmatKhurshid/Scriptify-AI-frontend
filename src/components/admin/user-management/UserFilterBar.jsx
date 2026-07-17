import React from 'react';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import styles from '../../../styles/admin/user-management/UserFilterBar.module.css';

const UserFilterBar = () => {
    return (
        <div className={styles.filterBar}>
            <div className={styles.searchWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.filters}>
                <button className={styles.filterButton}>
                    Role: All
                    <ChevronDown size={14} />
                </button>

                <button className={styles.filterButton}>
                    Status: All
                    <ChevronDown size={14} />
                </button>

                <button className={styles.filterButton}>
                    Verified: All
                    <ChevronDown size={14} />
                </button>

                <button className={styles.moreFilters}>
                    <SlidersHorizontal size={14} />
                    More Filters
                </button>
            </div>
        </div>
    );
};

export default UserFilterBar;