import React from 'react';
import ArticleCard from './ArticleCard';
import styles from '../../styles/home-feed/FeedSection.module.css';

const FeedSection = ({ blogs = [], onArticleClick, title = "Published Articles" }) => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
            </div>

            {blogs.length === 0 ? (
                <div style={{
                    padding: '30px',
                    textAlign: 'center',
                    color: '#94a3b8',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    No further published articles in this section.
                </div>
            ) : (
                <div className={styles.articlesList}>
                    {blogs.map((article) => (
                        <ArticleCard
                            key={article._id || article.id}
                            {...article}
                            onClick={() => onArticleClick && onArticleClick(article)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default FeedSection;