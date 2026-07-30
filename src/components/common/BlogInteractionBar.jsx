import React from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import styles from '../../styles/common/BlogInteractionBar.module.css';

const BlogInteractionBar = ({
    likesCount = 0,
    commentsCount = 0,
    isLiked = false,
    onLikeToggle,
    onCommentToggle,
    isCommentsOpen = false,
    className = '',
}) => {
    return (
        <div className={`${styles.interactionBar} ${className}`}>
            <div className={styles.leftGroup}>
                <button
                    type="button"
                    className={`${styles.actionBtn} ${isLiked ? styles.liked : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onLikeToggle) onLikeToggle();
                    }}
                    title={isLiked ? 'Unlike' : 'Like'}
                >
                    <Heart
                        size={18}
                        className={`${styles.icon} ${isLiked ? styles.heartIconActive : ''}`}
                        fill={isLiked ? '#ec4899' : 'none'}
                    />
                    <span className={styles.count}>{likesCount}</span>
                </button>

                <button
                    type="button"
                    className={`${styles.actionBtn} ${isCommentsOpen ? styles.activeComment : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onCommentToggle) onCommentToggle();
                    }}
                    title="Comments"
                >
                    <MessageSquare size={18} className={styles.icon} />
                    <span className={styles.count}>{commentsCount}</span>
                </button>
            </div>
        </div>
    );
};

export default BlogInteractionBar;
