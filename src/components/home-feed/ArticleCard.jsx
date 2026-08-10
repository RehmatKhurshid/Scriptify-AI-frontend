import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';
import Avatar from '../../components/common/Avatar';
import BlogInteractionBar from '../../components/common/BlogInteractionBar';
import CommentsSection from '../../components/common/CommentsSection';
import BlogDetailModal from '../../components/blog/BlogDetailModal';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services/blogService';
import { formatISTTime } from '../../utils/dateUtils';
import styles from '../../styles/home-feed/ArticleCard.module.css';

const ArticleCard = ({
    id,
    author,
    authorAvatar,
    category,
    title,
    excerpt,
    content,
    date,
    readTime,
    createdAt,
    image,
    initialLikes = 0,
    initialComments = 0,
    initialIsLiked = false,
}) => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [commentsCount, setCommentsCount] = useState(initialComments);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setLikesCount(initialLikes);
        setCommentsCount(initialComments);
        setIsLiked(initialIsLiked);
    }, [initialLikes, initialComments, initialIsLiked]);



    const postTimeIST = createdAt
        ? formatISTTime(createdAt)
        : (readTime && readTime.includes('IST') ? readTime : formatISTTime(new Date()));

    const handleLikeToggle = async () => {
        if (!user) {
            if (window.confirm('You must be signed in to like posts. Would you like to sign in now?')) {
                navigate('/signin');
            }
            return;
        }

        if (id) {
            try {
                const res = await blogService.toggleLike(id);
                setIsLiked(res.liked);
                setLikesCount(res.likeCount);
            } catch (err) {
                console.error('Failed to toggle like:', err.message);
            }
        } else {
            setIsLiked(!isLiked);
            setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
        }
    };

    const blogData = {
        id,
        title,
        excerpt,
        content,
        author,
        authorAvatar,
        category,
        date,
        createdAt,
        readTime: postTimeIST,
        image,
        thumbnailUrl: image,
        likesCount,
        commentsCount,
        isLiked,
    };

    return (
        <>
            <article
                className={styles.card}
                onClick={() => setIsModalOpen(true)}
                style={{ cursor: 'pointer' }}
            >
                <div className={styles.mainLayout}>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <div className={styles.authorRow}>
                                <Avatar src={authorAvatar} alt={author} size="sm" />
                                <span className={styles.authorName}>{author}</span>
                                <span className={styles.divider}>in</span>
                                <span className={styles.category}>{category}</span>
                            </div>
                        </div>

                        <h3 className={styles.title} title="Read full article">
                            {title}
                        </h3>
                        <p className={styles.excerpt}>
                            {excerpt}
                        </p>

                        <div className={styles.footer}>
                            <span className={styles.date}>{date}</span>
                            <span className={styles.metaDivider}></span>
                            <span className={styles.readTime}>
                                <FiClock className={styles.readTimeIcon} />
                                {postTimeIST}
                            </span>
                        </div>
                    </div>

                    <div className={styles.imageWrapper}>
                        <img src={image} alt={title} className={styles.image} />
                    </div>
                </div>

                {/* Likes & Comments Bar (Only for Logged-In Users) */}
                {isAuthenticated && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <BlogInteractionBar
                            likesCount={likesCount}
                            commentsCount={commentsCount}
                            isLiked={isLiked}
                            onLikeToggle={handleLikeToggle}
                            onCommentToggle={() => setIsCommentsOpen(!isCommentsOpen)}
                            isCommentsOpen={isCommentsOpen}
                        />

                        {/* Expandable Comments Drawer */}
                        {isCommentsOpen && (
                            <CommentsSection
                                blogId={id}
                                onCommentCountChange={(count) => setCommentsCount(count)}
                            />
                        )}
                    </div>
                )}
            </article>

            {/* Modal for full blog view */}
            <BlogDetailModal
                blog={blogData}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onLikeChange={(liked, count) => {
                    setIsLiked(liked);
                    setLikesCount(count);
                }}
                onCommentCountChange={(count) => setCommentsCount(count)}
            />
        </>
    );
};

export default ArticleCard;