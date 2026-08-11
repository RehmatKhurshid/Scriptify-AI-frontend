import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Clock, Calendar, Loader2, Sparkles } from 'lucide-react';
import Avatar from '../common/Avatar';
import BlogInteractionBar from '../common/BlogInteractionBar';
import CommentsSection from '../common/CommentsSection';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services/blogService';
import { aiService } from '../../services/aiService';
import { formatISTTime } from '../../utils/dateUtils';
import styles from '../../styles/blog/BlogDetailModal.module.css';
import { getAvatarUrl } from '../../utils/avatar';

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
    const modalContentRef = React.useRef(null);

    const [activeBlog, setActiveBlog] = useState(blog);
    const [fullBlog, setFullBlog] = useState(null);
    const [loadingContent, setLoadingContent] = useState(false);
    const [likesCount, setLikesCount] = useState(blog.likesCount || 0);
    const [commentsCount, setCommentsCount] = useState(blog.commentsCount || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(true);
    const [similarBlogs, setSimilarBlogs] = useState([]);

    const propBlogId = blog?._id || blog?.id;
    const blogId = activeBlog?._id || activeBlog?.id || propBlogId;

    useEffect(() => {
        if (blog) {
            setActiveBlog(blog);
        }
    }, [propBlogId]);

    useEffect(() => {
        setFullBlog(null);
        setSimilarBlogs([]);

        if (!activeBlog) return;

        const currentLikesCount = typeof activeBlog.likesCount === 'number'
            ? activeBlog.likesCount
            : (Array.isArray(activeBlog.likes) ? activeBlog.likes.length : 0);
        setLikesCount(currentLikesCount);

        const currentCommentsCount = typeof activeBlog.commentsCount === 'number'
            ? activeBlog.commentsCount
            : (Array.isArray(activeBlog.comments) ? activeBlog.comments.length : 0);
        setCommentsCount(currentCommentsCount);

        if (activeBlog.isLiked !== undefined) {
            setIsLiked(activeBlog.isLiked);
        } else if (user && Array.isArray(activeBlog.likes)) {
            const userId = String(user._id || user.id || user.userId || '');
            const likedByMe = Boolean(
                userId && activeBlog.likes.some((uId) => {
                    if (!uId) return false;
                    const targetId = typeof uId === 'object' ? String(uId._id || uId.id || '') : String(uId);
                    return targetId === userId;
                })
            );
            setIsLiked(likedByMe);
        } else {
            setIsLiked(false);
        }

        if (isOpen && blogId && !String(blogId).startsWith('fallback-')) {
            setLoadingContent(true);
            blogService.getBlogById(blogId)
                .then((res) => {
                    const fetched = res.blog || res;
                    if (fetched) {
                        setFullBlog(fetched);
                        if (typeof fetched.likesCount === 'number') setLikesCount(fetched.likesCount);
                        else if (Array.isArray(fetched.likes)) setLikesCount(fetched.likes.length);

                        if (typeof fetched.commentsCount === 'number') setCommentsCount(fetched.commentsCount);
                        else if (Array.isArray(fetched.comments)) setCommentsCount(fetched.comments.length);
                    }
                })
                .catch((err) => {
                    console.error('Failed to load full blog content:', err.message);
                })
                .finally(() => {
                    setLoadingContent(false);
                });

            // Fetch Similar Blogs
            aiService.getSimilarBlogs(blogId)
                .then((res) => {
                    if (res?.blogs && Array.isArray(res.blogs)) {
                        setSimilarBlogs(res.blogs);
                    }
                })
                .catch((err) => {
                    console.error('Failed to fetch similar blogs:', err.message);
                });
        }
    }, [blogId, isOpen, activeBlog]);

    // Reading Duration Logger Effect
    useEffect(() => {
        if (!isOpen || !blogId || String(blogId).startsWith('fallback-') || !isAuthenticated) {
            return;
        }

        const startTime = Date.now();

        return () => {
            const durationInSeconds = Math.round((Date.now() - startTime) / 1000);
            if (durationInSeconds >= 3) {
                aiService.logReadingDuration(blogId, durationInSeconds).catch(() => { });
            }
        };
    }, [blogId, isOpen, isAuthenticated]);

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
                const newLiked = typeof res.liked === 'boolean' ? res.liked : !isLiked;
                const newCount = typeof res.likeCount === 'number'
                    ? res.likeCount
                    : (typeof res.likesCount === 'number' ? res.likesCount : (newLiked ? likesCount + 1 : Math.max(0, likesCount - 1)));
                setIsLiked(newLiked);
                setLikesCount(newCount);
                if (onLikeChange) onLikeChange(newLiked, newCount);
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

    const authorName = (typeof activeBlog?.author === 'string' ? activeBlog.author : null) ||
        (fullBlog?.author ? `${fullBlog.author.firstName || ''} ${fullBlog.author.lastName || ''}`.trim() : null) ||
        (activeBlog?.authorName || 'Scriptify Author');

    const authorAvatar = getAvatarUrl(fullBlog?.author || activeBlog?.authorAvatar || activeBlog?.author, authorName);
    const createdTimeIST = activeBlog?.createdAt || fullBlog?.createdAt
        ? formatISTTime(activeBlog?.createdAt || fullBlog?.createdAt)
        : (activeBlog?.readTime && activeBlog.readTime.includes('IST') ? activeBlog.readTime : formatISTTime(new Date()));

    const getCategoryFallbackImage = (catName = '') => {
        const cat = catName.toLowerCase();
        if (cat.includes('ai') || cat.includes('artificial') || cat.includes('machine') || cat.includes('model')) {
            return 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80';
        }
        if (cat.includes('code') || cat.includes('web') || cat.includes('dev') || cat.includes('tech') || cat.includes('programming')) {
            return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
        }
        if (cat.includes('design') || cat.includes('art') || cat.includes('creative') || cat.includes('ui')) {
            return 'https://images.unsplash.com/photo-1542744094-3a317272018a?auto=format&fit=crop&w=1200&q=80';
        }
        return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';
    };

    const displayTitle = fullBlog?.title || activeBlog?.title || 'Untitled Blog Post';
    const displayExcerpt = fullBlog?.excerpt || activeBlog?.excerpt;
    const displayContent = fullBlog?.content || activeBlog?.content;
    const displayCategory = fullBlog?.category || activeBlog?.category || 'Article';
    const displayImage = fullBlog?.thumbnailUrl || fullBlog?.thumbnail || activeBlog?.thumbnailUrl || activeBlog?.image || activeBlog?.thumbnail || activeBlog?.coverImage || activeBlog?.raw?.thumbnailUrl || activeBlog?.raw?.thumbnail || getCategoryFallbackImage(displayCategory);

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modalContent} ref={modalContentRef} onClick={(e) => e.stopPropagation()}>
                {/* Header controls */}
                <button type="button" className={styles.closeBtn} onClick={onClose} title="Close Article">
                    <X size={16} />
                </button>

                {/* Hero Featured Cover Banner */}
                {displayImage && (
                    <div className={styles.coverWrapper} style={{ marginTop: '10px', marginBottom: '20px' }}>
                        <img
                            src={displayImage}
                            alt={displayTitle}
                            className={styles.coverImage}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = getCategoryFallbackImage(displayCategory);
                            }}
                        />
                    </div>
                )}

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

                {/* Similar Articles Section */}
                {similarBlogs.length > 0 && (
                    <div style={{
                        marginTop: '32px',
                        paddingTop: '24px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                        <h3 style={{
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            color: '#f4f4f5',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <Sparkles size={18} style={{ color: '#a855f7' }} />
                            You Might Also Like
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '14px'
                        }}>
                            {similarBlogs.map((simBlog) => {
                                const simAuthor = typeof simBlog.author === 'string'
                                    ? simBlog.author
                                    : `${simBlog.author?.firstName || ''} ${simBlog.author?.lastName || ''}`.trim() || 'Author';
                                const simAvatar = getAvatarUrl(simBlog.author, simAuthor);
                                const simCover = simBlog.thumbnailUrl || simBlog.image || getCategoryFallbackImage(simBlog.category);

                                return (
                                    <div
                                        key={simBlog._id}
                                        onClick={() => {
                                            setActiveBlog(simBlog);
                                            if (modalContentRef.current) {
                                                modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                                            }
                                        }}
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            padding: '12px',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s ease, border-color 0.2s ease',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                        }}
                                    >
                                        {simCover && (
                                            <img
                                                src={simCover}
                                                alt={simBlog.title}
                                                style={{
                                                    width: '100%',
                                                    height: '110px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                    marginBottom: '10px'
                                                }}
                                            />
                                        )}
                                        <span style={{
                                            fontSize: '0.72rem',
                                            color: '#a855f7',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            {simBlog.category || 'Related'}
                                        </span>
                                        <h4 style={{
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            color: '#f3f4f6',
                                            margin: '4px 0 8px',
                                            lineHeight: '1.3',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {simBlog.title}
                                        </h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: 'auto', paddingTop: '6px' }}>
                                            <img src={simAvatar} alt={simAuthor} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                                            <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{simAuthor}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogDetailModal;
