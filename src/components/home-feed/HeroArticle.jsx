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
import styles from '../../styles/home-feed/HeroArticle.module.css';

const HeroArticle = ({ blog: propBlog }) => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [heroBlog, setHeroBlog] = useState(null);
    const [likesCount, setLikesCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (propBlog) {
            const b = propBlog.raw || propBlog;
            applyBlogData(b);
        } else {
            fetchHeroBlog();
        }
    }, [propBlog, user]);

    const applyBlogData = (b) => {
        setHeroBlog(b);
        if (typeof b.likesCount === 'number') setLikesCount(b.likesCount);
        if (typeof b.commentsCount === 'number') setCommentsCount(b.commentsCount);
        if (user && Array.isArray(b.likes)) {
            const userId = String(user._id || user.id || user.userId || '');
            const likedByMe = Boolean(
                userId && b.likes.some((uId) => {
                    if (!uId) return false;
                    const targetId = typeof uId === 'object' ? String(uId._id || uId.id || '') : String(uId);
                    return targetId === userId;
                })
            );
            setIsLiked(likedByMe);
        }

        const blogId = b._id || b.id;
        if (blogId && !String(blogId).startsWith('fallback-')) {
            blogService.getComments(blogId).then((commentRes) => {
                if (commentRes && typeof commentRes.total === 'number') {
                    setCommentsCount(commentRes.total);
                }
            }).catch(() => {});
        }
    };

    const fetchHeroBlog = async () => {
        try {
            const data = await blogService.getAllBlogs({ limit: 1 });
            if (data.blogs && data.blogs.length > 0) {
                applyBlogData(data.blogs[0]);
            }
        } catch (err) {
            console.error('Failed to fetch hero blog:', err.message);
        }
    };

    const handleLikeToggle = async () => {
        if (!user) {
            if (window.confirm('You must be signed in to like posts. Would you like to sign in now?')) {
                navigate('/signin');
            }
            return;
        }

        if (heroBlog?._id) {
            try {
                const res = await blogService.toggleLike(heroBlog._id);
                setIsLiked(res.liked);
                setLikesCount(res.likeCount);
            } catch (err) {
                console.error('Failed to toggle like on hero article:', err.message);
            }
        } else {
            setIsLiked(!isLiked);
            setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
        }
    };

    const fallbackArticle = {
        title: "The Architecture of Tomorrow: AI's Role in Generative Design",
        excerpt: "Exploring how neural networks are moving beyond image generation to create functional, structurally sound, and impossibly beautiful buildings that defy conventions...",
        author: "Dr. Elena Rostova",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        date: "Oct 12",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&h=600&fit=crop",
        category: "Generative AI",
    };

    const displayTitle = heroBlog ? heroBlog.title : fallbackArticle.title;
    const displayExcerpt = heroBlog
        ? (heroBlog.excerpt || (heroBlog.content ? heroBlog.content.substring(0, 180) + '...' : ''))
        : fallbackArticle.excerpt;

    const authorName = heroBlog?.author
        ? `${heroBlog.author.firstName || ''} ${heroBlog.author.lastName || ''}`.trim()
        : fallbackArticle.author;

    const authorAvatar = heroBlog?.author?.avatar || fallbackArticle.authorAvatar;
    const image = heroBlog?.thumbnailUrl || fallbackArticle.image;

    const postTimeIST = heroBlog?.createdAt
        ? formatISTTime(heroBlog.createdAt)
        : formatISTTime(new Date());

    const dateStr = heroBlog
        ? new Date(heroBlog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : fallbackArticle.date;

    const blogModalData = {
        id: heroBlog?._id || 'hero-1',
        title: displayTitle,
        excerpt: displayExcerpt,
        content: heroBlog?.content,
        author: authorName,
        authorAvatar,
        category: heroBlog?.category || 'Featured Release',
        date: dateStr,
        readTime: postTimeIST,
        createdAt: heroBlog?.createdAt,
        image,
        thumbnailUrl: heroBlog?.thumbnailUrl || image,
        likesCount,
        commentsCount,
        isLiked,
    };

    return (
        <>
            <article
                className={styles.hero}
                onClick={() => setIsModalOpen(true)}
                style={{ cursor: 'pointer' }}
            >
                <div className={styles.imageWrapper}>
                    <img src={image} alt={displayTitle} className={styles.image} />
                    <div className={styles.imageOverlay}></div>
                    <div className={styles.trendingBadge}>
                        <span className={styles.trendingDot}></span>
                        {heroBlog ? 'Latest Release' : 'Trending on Scriptify AI'}
                    </div>
                </div>

                <div className={styles.content}>
                    <h2
                        className={styles.title}
                        title="Read featured article"
                    >
                        {displayTitle}
                    </h2>
                    <p className={styles.excerpt}>
                        {displayExcerpt}
                    </p>

                    <div className={styles.meta}>
                        <div className={styles.author}>
                            <Avatar src={authorAvatar} alt={authorName} size="sm" />
                            <span className={styles.authorName}>{authorName}</span>
                        </div>
                        <div className={styles.metaDivider}></div>
                        <span className={styles.date}>{dateStr}</span>
                        <div className={styles.metaDivider}></div>
                        <span className={styles.readTime}>
                            <FiClock className={styles.readTimeIcon} />
                            {postTimeIST}
                        </span>
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
                                    blogId={heroBlog?._id}
                                    onCommentCountChange={(count) => setCommentsCount(count)}
                                />
                            )}
                        </div>
                    )}
                </div>
            </article>

            {/* Modal for full hero article view */}
            <BlogDetailModal
                blog={blogModalData}
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

export default HeroArticle;