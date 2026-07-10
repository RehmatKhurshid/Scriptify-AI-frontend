import React from 'react';
import { FiBookmark, FiClock } from 'react-icons/fi';
import Avatar from '../../components/common/Avatar';
import Tag from '../../components/common/Tag';
import styles from '../../styles/home-feed/HeroArticle.module.css';

const HeroArticle = () => {
    return (
        <article className={styles.hero}>
            <div className={styles.imageWrapper}>
                <img
                    src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&h=600&fit=crop"
                    alt="Traditional Asian architecture at sunset"
                    className={styles.image}
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.trendingBadge}>
                    <span className={styles.trendingDot}></span>
                    Trending on Scriptify
                </div>
            </div>

            <div className={styles.content}>
                <h2 className={styles.title}>
                    The Architecture of Tomorrow: AI's Role in Generative Design
                </h2>
                <p className={styles.excerpt}>
                    Exploring how neural networks are moving beyond image generation to create functional, structurally sound, and impossibly beautiful buildings that defy conventions in millisecond...
                </p>

                <div className={styles.meta}>
                    <div className={styles.author}>
                        <Avatar
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                            alt="Dr. Elena Rostova"
                            size="sm"
                        />
                        <span className={styles.authorName}>Dr. Elena Rostova</span>
                    </div>
                    <div className={styles.metaDivider}></div>
                    <span className={styles.date}>Oct 12</span>
                    <div className={styles.metaDivider}></div>
                    <span className={styles.readTime}>
                        <FiClock className={styles.readTimeIcon} />
                        8 min read
                    </span>
                    <button className={styles.bookmarkButton} aria-label="Bookmark article">
                        <FiBookmark />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default HeroArticle;