import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Clock, Calendar, Loader2 } from 'lucide-react';
import Avatar from '../common/Avatar';
import BlogInteractionBar from '../common/BlogInteractionBar';
import CommentsSection from '../common/CommentsSection';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services/blogService';
import { formatISTTime } from '../../utils/dateUtils';
import styles from '../../styles/blog/BlogDetailModal.module.css';

const BlogDetailModal = ({
    blog,
    isOpen,
    onClose,
    onLikeChange,
    onCommentCountChange,
}) => {
    if (!isOpen || !blog) return null;

    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [fullBlog, setFullBlog] = useState(null);
    const [loadingContent, setLoadingContent] = useState(false);
    const [likesCount, setLikesCount] = useState(blog.likesCount || 0);
    const [commentsCount, setCommentsCount] = useState(blog.commentsCount || 0);
    const [isLiked, setIsLiked] = useState(() => {
        if (blog.isLiked !== undefined) return blog.isLiked;
        if (user && Array.isArray(blog.likes)) {
            const userId = String(user._id || user.id || user.userId || '');
            return Boolean(
                userId && blog.likes.some((uId) => {
                    if (!uId) return false;
                    const targetId = typeof uId === 'object' ? String(uId._id || uId.id || '') : String(uId);
                    return targetId === userId;
                })
            );
        }
        return false;
    });
    const [isCommentsOpen, setIsCommentsOpen] = useState(true);

    const blogId = blog.id || blog._id;

    useEffect(() => {
        setFullBlog(null);
        if (isOpen && blogId && !String(blogId).startsWith('fallback-')) {
            setLoadingContent(true);
            blogService.getBlogById(blogId)
                .then((res) => {
                    const fetched = res.blog || res;
                    if (fetched) {
                        setFullBlog(fetched);
                        if (typeof fetched.likesCount === 'number') setLikesCount(fetched.likesCount);
                        if (typeof fetched.commentsCount === 'number') setCommentsCount(fetched.commentsCount);
                    }
                })
                .catch((err) => {
                    console.error('Failed to load full blog content:', err.message);
                })
                .finally(() => {
                    setLoadingContent(false);
                });
        }
    }, [blogId, isOpen]);

    const handleLikeToggle = async () => {
        if (!user) {
            if (window.confirm('You must be signed in to like posts. Would you like to sign in now?')) {
                navigate('/signin');
            }
            return;
        }

        if (blogId) {
            try {
                const res = await blogService.toggleLike(blogId);
                setIsLiked(res.liked);
                setLikesCount(res.likeCount);
                if (onLikeChange) onLikeChange(res.liked, res.likeCount);
            } catch (err) {
                console.error('Failed to toggle like in modal:', err.message);
            }
        } else {
            const nextLiked = !isLiked;
            const nextCount = isLiked ? likesCount - 1 : likesCount + 1;
            setIsLiked(nextLiked);
            setLikesCount(nextCount);
            if (onLikeChange) onLikeChange(nextLiked, nextCount);
        }
    };

    const authorName = blog.author || (fullBlog?.author ? `${fullBlog.author.firstName || ''} ${fullBlog.author.lastName || ''}`.trim() : 'Scriptify Author');
    const authorAvatar = blog.authorAvatar || fullBlog?.author?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(authorName)}`;
    const createdTimeIST = blog.createdAt || fullBlog?.createdAt
        ? formatISTTime(blog.createdAt || fullBlog?.createdAt)
        : (blog.readTime && blog.readTime.includes('IST') ? blog.readTime : formatISTTime(new Date()));

    const displayTitle = fullBlog?.title || blog.title;
    const displayExcerpt = fullBlog?.excerpt || blog.excerpt;
    const displayContent = fullBlog?.content || blog.content;
    const displayCategory = fullBlog?.category || blog.category || 'Article';
    const displayImage = fullBlog?.thumbnailUrl || blog.image;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {/* Header controls */}
                <button type="button" className={styles.closeBtn} onClick={onClose} title="Close Article">
                    <X size={16} />
                </button>

                {/* Article Header */}
                <div className={styles.articleHeader}>
                    <div className={styles.categoryBadge}>{displayCategory}</div>
                    <h1 className={styles.title}>{displayTitle}</h1>

                    <div className={styles.authorRow}>
                        <Avatar src={authorAvatar} alt={authorName} size="md" />
                        <div className={styles.authorInfo}>
                            <span className={styles.authorName}>{authorName}</span>
                            <div className={styles.metaRow}>
                                <span className={styles.metaItem}>
                                    <Calendar size={12} />
                                    {blog.date || 'Recently published'}
                                </span>
                                <span className={styles.dot}>•</span>
                                <span className={styles.metaItem}>
                                    <Clock size={12} />
                                    {createdTimeIST}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cover Image */}
                {displayImage && (
                    <div className={styles.coverWrapper}>
                        <img src={displayImage} alt={displayTitle} className={styles.coverImage} />
                    </div>
                )}

                {/* Body Content */}
                <div className={styles.bodyContent}>
                    {displayExcerpt && <p className={styles.leadExcerpt}>{displayExcerpt}</p>}
                    
                    {loadingContent ? (
                        <div className={styles.loadingSpinner}>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Fetching full article content...</span>
                        </div>
                    ) : (
                        <div className={styles.paragraphs}>
                            {displayContent ? (
                                displayContent.split('\n\n').map((para, i) => (
                                    <p key={i}>{para.trim()}</p>
                                ))
                            ) : displayExcerpt ? (
                                <p>{displayExcerpt}</p>
                            ) : (
                                <p style={{ fontStyle: 'italic', color: '#94a3b8' }}>No detailed content provided for this article.</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Guest Call-to-Action Banner */}
                {!isAuthenticated ? (
                    <div className={styles.guestBanner}>
                        <h4 className={styles.guestTitle}>Enjoyed reading this article?</h4>
                        <p className={styles.guestSubtitle}>
                            Sign in to like posts, leave comments, and start publishing your own AI-crafted blogs on Scriptify AI.
                        </p>
                        <div className={styles.guestActions}>
                            <Link to="/signin" className={styles.signInBtn}>Sign In</Link>
                            <Link to="/signup" className={styles.signUpBtn}>Create Account</Link>
                        </div>
                    </div>
                ) : (
                    /* Likes & Interaction Bar for Logged In Users */
                    <div className={styles.interactionSection}>
                        <BlogInteractionBar
                            likesCount={likesCount}
                            commentsCount={commentsCount}
                            isLiked={isLiked}
                            onLikeToggle={handleLikeToggle}
                            onCommentToggle={() => setIsCommentsOpen(!isCommentsOpen)}
                            isCommentsOpen={isCommentsOpen}
                        />

                        {isCommentsOpen && (
                            <CommentsSection
                                blogId={blogId}
                                initialComments={blog.comments || []}
                                onCommentCountChange={(count) => {
                                    setCommentsCount(count);
                                    if (onCommentCountChange) onCommentCountChange(count);
                                }}
                                className={styles.modalComments}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogDetailModal;
