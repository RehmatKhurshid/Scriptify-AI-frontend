import React from 'react';
import { FiSliders } from 'react-icons/fi';
import ArticleCard from './ArticleCard';
import styles from '../../styles/home-feed/FeedSection.module.css';

const articles = [
    {
        id: 1,
        author: 'Julian Hayes',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        category: 'Future Tech',
        title: 'Cognitive Load and the Disappearing Interface',
        excerpt: 'Why the best user interfaces of 2025 are the ones you barely notice, and how predictive agents are replacing explicit commands.',
        date: 'Oct 11',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
    },
    {
        id: 2,
        author: 'Sarah Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        category: 'Machine Learning',
        title: 'The Poetry of Latent Space',
        excerpt: 'Navigating the high-dimensional geometry where language models store concepts, and why it resembles human intuition more than cold logic.',
        date: 'Oct 09',
        readTime: '12 min read',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    },
];

const FeedSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Your Feed</h2>
                <button className={styles.customizeButton}>
                    <FiSliders className={styles.customizeIcon} />
                    Customize
                </button>
            </div>

            <div className={styles.articlesList}>
                {articles.map((article) => (
                    <ArticleCard key={article.id} {...article} />
                ))}
            </div>
        </section>
    );
};

export default FeedSection;