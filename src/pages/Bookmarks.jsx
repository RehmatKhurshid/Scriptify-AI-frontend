import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import BookmarksHeader from '../components/bookmarks/BookmarkHeader';
import BookmarksToolbar from '../components/bookmarks/BookmarksToolbar';
import BookmarksGrid from '../components/bookmarks/BookmarksGrid';
import BookmarksSidebar from '../components/bookmarks/BookmarksSidebar';
import styles from '../styles/bookmarks/BookmarksPage.module.css';

const Bookmarks = () => {
    return (
        <div className={styles.container}>
            <LandingNavbar />

            <main className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.leftColumn}>
                        <BookmarksHeader />
                        <BookmarksToolbar />
                        <BookmarksGrid />
                    </div>

                    <BookmarksSidebar />
                </div>
            </main>
        </div>
    );
};

export default Bookmarks;