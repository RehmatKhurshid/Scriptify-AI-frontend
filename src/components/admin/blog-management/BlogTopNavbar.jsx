import React from 'react';
import { Search } from 'lucide-react';
import styles from '../../../styles/admin/blog-management/BlogTopNavbar.module.css';

const BlogTopNavbar = ({ searchQuery, onSearchChange }) => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.searchWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search blogs by title or author..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.navLinks}>
                <a href="#" className={styles.navLink}>notifications</a>
                <a href="#" className={styles.navLink}>help</a>
            </div>
        </nav>
    );
};

export default BlogTopNavbar;