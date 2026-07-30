import React from 'react';
import { FiClock } from 'react-icons/fi';
import Avatar from '../../components/common/Avatar';
import styles from '../../styles/home-feed/ArticleCard.module.css';

const ArticleCard = ({
    _id,
    author,
    authorAvatar,
    category,
    title,
    excerpt,
    date,
    readTime,
    image,
    onClick,
}) => {
    return (
        <article className={styles.card} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
            <div className={styles.mainLayout}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.authorRow}>
                            <Avatar src={authorAvatar} alt={author || 'Author'} size="sm" />
                            <span className={styles.authorName}>{author}</span>
                            <span className={styles.divider}>in</span>
                            <span className={styles.category}>{category}</span>
                        </div>
                    </div>

                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.excerpt}>{excerpt}</p>

                    <div className={styles.footer}>
                        <span className={styles.date}>{date}</span>
                        <span className={styles.metaDivider}></span>
                        <span className={styles.readTime}>
                            <FiClock className={styles.readTimeIcon} />
                            {readTime}
                        </span>
                    </div>
                </div>

                {image && (
                    <div className={styles.imageWrapper}>
                        <img src={image} alt={title} className={styles.image} />
                    </div>
                )}
            </div>
        </article>
    );
};

export default ArticleCard;