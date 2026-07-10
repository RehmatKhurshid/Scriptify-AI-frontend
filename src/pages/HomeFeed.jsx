import React from 'react';
import HomeFeedLayout from '../components/layout/HomeFeedLayout';
import HeroArticle from '../components/home-feed/HeroArticle';
import FeedSection from '../components/home-feed/FeedSection';
import RecommendedTopics from '../components/home-feed/RecommendedTopics';
import styles from '../styles/home-feed/HomeFeed.module.css';

const HomeFeed = () => {
    return (
        <HomeFeedLayout>
            <div className={styles.grid}>
                <div className={styles.mainColumn}>
                    <HeroArticle />
                    <FeedSection />
                </div>
                <aside className={styles.sidebar}>
                    <RecommendedTopics />
                </aside>
            </div>
        </HomeFeedLayout>
    );
};

export default HomeFeed;