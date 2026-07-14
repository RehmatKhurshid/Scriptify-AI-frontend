import React from 'react';
import styles from '../../styles/bookmarks/BookmarksHeader.module.css';

const BookmarksHeader = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>My Bookmarks</h1>
            <p className={styles.subtitle}>Access all your saved blogs in one place.</p>
        </div>
    );
};

export default BookmarksHeader;