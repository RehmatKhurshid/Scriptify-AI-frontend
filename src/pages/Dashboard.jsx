import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import HeroArticle from '../components/dashboard/HeroArticle';
import FeedSection from '../components/dashboard/FeedSection';
import RecommendedTopics from '../components/dashboard/RecommendedTopics';
import styles from '../styles/dashboard/Dashboard.module.css';

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className={styles.grid}>
                <div className={styles.mainColumn}>
                    <HeroArticle />
                    <FeedSection />
                </div>
                <aside className={styles.sidebar}>
                    <RecommendedTopics />
                </aside>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;