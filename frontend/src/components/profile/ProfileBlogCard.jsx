import React from 'react';
import { FiBookmark } from 'react-icons/fi';
import styles from '../../styles/profile/ProfileBlogCard.module.css';

const ProfileBlogCard = ({
    image,
    category,
    date,
    title,
    excerpt,
    readTime,
    bookmarked = false,
}) => {
    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={image} alt={title} className={styles.image} />
                <div className={styles.imageOverlay}></div>
            </div>

            <div className={styles.content}>
                <div className={styles.meta}>
                    <span className={styles.category}>{category}</span>
                    <span className={styles.date}>{date}</span>
                </div>

                <h3 className={styles.title}>{title}</h3>
                <p className={styles.excerpt}>{excerpt}</p>

                <div className={styles.footer}>
                    <span className={styles.readTime}>{readTime}</span>
                    <button
                        className={`${styles.bookmarkButton} ${bookmarked ? styles.bookmarked : ''}`}
                        aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    >
                        <FiBookmark />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProfileBlogCard;