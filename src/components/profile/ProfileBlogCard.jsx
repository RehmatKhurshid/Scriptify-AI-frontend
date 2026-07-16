import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, Clock } from 'lucide-react';
import styles from '../../styles/profile/ProfileBlogCard.module.css';

const ProfileBlogCard = ({ blog }) => {
    return (
        <article className={styles.card}>
            <div className={styles.coverWrapper}>
                <img src={blog.coverImage} alt={blog.title} className={styles.cover} />
                <div className={styles.statusBadge}>
                    <span className={styles.statusDot} />
                    {blog.status}
                </div>
                <div className={styles.readTime}>
                    <Clock size={12} />
                    {blog.readTime}
                </div>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{blog.title}</h3>
                <p className={styles.description}>{blog.description}</p>

                <div className={styles.footer}>
                    <div className={styles.stats}>
                        <Eye size={14} />
                        <span>{blog.views}</span>
                    </div>

                    <div className={styles.actions}>
                        <Link to={`/edit/${blog.id}`} className={styles.actionBtn} title="Edit">
                            <Edit size={14} />
                        </Link>
                        <button className={styles.actionBtn} title="View">
                            <Eye size={14} />
                        </button>
                        <button className={styles.actionBtn} title="Delete">
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProfileBlogCard;