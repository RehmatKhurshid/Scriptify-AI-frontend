import React from 'react';
import SummaryCard from './SummaryCard';
import FavoriteCategories from './FavoriteCategories';
import RecentlySaved from './RecentlySaved';
import styles from '../../styles/bookmarks/BookmarksSidebar.module.css';

const BookmarksSidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <SummaryCard />
            <FavoriteCategories />
            <RecentlySaved />
        </aside>
    );
};

export default BookmarksSidebar;