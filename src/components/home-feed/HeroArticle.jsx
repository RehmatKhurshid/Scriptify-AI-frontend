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
import { getAvatarUrl } from '../../utils/avatar';

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
        const resolvedLikesCount = typeof b.likesCount === 'number'
            ? b.likesCount
            : (Array.isArray(b.likes) ? b.likes.length : 0);
        setLikesCount(resolvedLikesCount);

        const resolvedCommentsCount = typeof b.commentsCount === 'number'
            ? b.commentsCount
            : (Array.isArray(b.comments) ? b.comments.length : 0);
        setCommentsCount(resolvedCommentsCount);

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
                const newLiked = typeof res.liked === 'boolean' ? res.liked : !isLiked;
                const newCount = typeof res.likeCount === 'number'
                    ? res.likeCount
                    : (typeof res.likesCount === 'number' ? res.likesCount : (newLiked ? likesCount + 1 : Math.max(0, likesCount - 1)));
                setIsLiked(newLiked);
                setLikesCount(newCount);
            } catch (err) {
                console.error('Failed to toggle like on hero article:', err.message);
            }
        } else {
            setIsLiked(!isLiked);
            setLikesCount((prev) => (isLiked ? Math.max(0, prev - 1) : prev + 1));
        }
    };

    const fallbackArticle = {
        title: "The Architecture of Tomorrow: AI's Role in Generative Design",
        excerpt: "Exploring how neural networks are moving beyond image generation to create functional, structurally sound, and impossibly beautiful buildings that defy conventions...",
        author: "Dr. Elena Rostova",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena%20Rostova",
        date: "Oct 12",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&h=600&fit=crop",
        category: "Generative AI",
    };

    const displayTitle = heroBlog ? heroBlog.title : fallbackArticle.title;
    const displayExcerpt = heroBlog
        ? (heroBlog.excerpt || (heroBlog.content ? heroBlog.content.substring(0, 180) + '...' : ''))
        : fallbackArticle.excerpt;

    const authorName = heroBlog
        ? (typeof heroBlog.author === 'string'
            ? heroBlog.author
            : `${heroBlog.author?.firstName || ''} ${heroBlog.author?.lastName || ''}`.trim() || heroBlog.author?.username || 'Author')
        : fallbackArticle.author;

    const authorAvatar = heroBlog?.authorAvatar || getAvatarUrl(heroBlog?.author, authorName);
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

    const isRecentlyPublished = heroBlog?.createdAt && (Date.now() - new Date(heroBlog.createdAt).getTime()) < 48 * 60 * 60 * 1000;
    const badgeLabel = heroBlog
        ? (isRecentlyPublished ? 'Latest Release' : 'Top Recommendation')
        : 'Trending on Scriptify AI';

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
                        {badgeLabel}
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