import React from 'react';
import { FiClock } from 'react-icons/fi';
import Avatar from '../../components/common/Avatar';
import styles from '../../styles/home-feed/HeroArticle.module.css';

const HeroArticle = ({ blog, onClick }) => {
    if (!blog) return null;

    const {
        title,
        excerpt,
        author,
        authorAvatar,
        date,
        readTime,
        image,
        category,
    } = blog;

    return (
        <article className={styles.hero} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
            <div className={styles.imageWrapper}>
                <img
                    src={image || "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&h=600&fit=crop"}
                    alt={title || "Featured Blog"}
                    className={styles.image}
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.trendingBadge}>
                    <span className={styles.trendingDot}></span>
                    Featured Blog
                </div>
            </div>

            <div className={styles.content}>
                <h2 className={styles.title}>
                    {title}
                </h2>
                <p className={styles.excerpt}>
                    {excerpt}
                </p>

                <div className={styles.meta}>
                    <div className={styles.author}>
                        <Avatar
                            src={authorAvatar}
                            alt={author || 'Author'}
                            size="sm"
                        />
                        <span className={styles.authorName}>{author}</span>
                    </div>
                    {category && (
                        <>
                            <div className={styles.metaDivider}></div>
                            <span style={{ color: '#a78bfa', fontSize: '0.85rem' }}>{category}</span>
                        </>
                    )}
                    <div className={styles.metaDivider}></div>
                    <span className={styles.date}>{date}</span>
                    <div className={styles.metaDivider}></div>
                    <span className={styles.readTime}>
                        <FiClock className={styles.readTimeIcon} />
                        {readTime}
                    </span>
                </div>
            </div>
        </article>
    );
};

export default HeroArticle;