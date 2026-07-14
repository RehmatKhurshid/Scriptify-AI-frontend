import React from 'react';
import { FiEye, FiMessageSquare, FiShare2, FiBookmark, FiArrowRight } from 'react-icons/fi';
import styles from '../../styles/bookmarks/BookmarkCard.module.css';

const BookmarkCard = ({
    image,
    category,
    categoryColor,
    author,
    authorAvatar,
    date,
    title,
    excerpt,
    views,
    likes,
}) => {
    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={image} alt={title} className={styles.image} />
                <span className={styles.category} style={{ backgroundColor: categoryColor }}>
                    {category}
                </span>
            </div>

            <div className={styles.content}>
                <div className={styles.meta}>
                    <div className={styles.author}>
                        <img src={authorAvatar} alt={author} className={styles.authorAvatar} />
                        <span className={styles.authorName}>{author}</span>
                    </div>
                    <span className={styles.date}>{date}</span>
                </div>

                <h3 className={styles.title}>{title}</h3>
                <p className={styles.excerpt}>{excerpt}</p>

                <div className={styles.footer}>
                    <div className={styles.stats}>
                        <span className={styles.stat}>
                            <FiEye className={styles.statIcon} />
                            {views}
                        </span>
                        <span className={styles.stat}>
                            <FiMessageSquare className={styles.statIcon} />
                            {likes}
                        </span>
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.actionButton} aria-label="Share">
                            <FiShare2 />
                        </button>
                        <button className={styles.actionButton} aria-label="Bookmark">
                            <FiBookmark className={styles.bookmarked} />
                        </button>
                        <button className={styles.readButton}>
                            Read
                            <FiArrowRight className={styles.readIcon} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BookmarkCard;