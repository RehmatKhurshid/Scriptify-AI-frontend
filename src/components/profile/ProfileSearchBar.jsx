import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import styles from '../../styles/profile/ProfileSearchBar.module.css';

const ProfileSearchBar = ({ searchQuery, onSearchChange, sortBy, onSortChange }) => {
    return (
        <div className={styles.searchBar}>
            <div className={styles.searchInputWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.sortDropdown}>
                <SlidersHorizontal size={14} />
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className={styles.sortSelect}
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="popular">Most Popular</option>
                </select>
            </div>
        </div>
    );
};

export default ProfileSearchBar;