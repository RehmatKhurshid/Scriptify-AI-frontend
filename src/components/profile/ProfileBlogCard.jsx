import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2, Clock, Heart, MessageSquare } from 'lucide-react';
import BlogInteractionBar from '../common/BlogInteractionBar';
import CommentsSection from '../common/CommentsSection';
import BlogDetailModal from '../blog/BlogDetailModal';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services/blogService';
import { formatISTTime } from '../../utils/dateUtils';
import styles from '../../styles/profile/ProfileBlogCard.module.css';

const ProfileBlogCard = ({ blog, onDelete, onPublish }) => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const isPublished = (blog.status || '').toLowerCase() === 'published';
    const [likesCount, setLikesCount] = useState(blog.likesCount || (blog.likes ? blog.likes.length : 0));
    const [commentsCount, setCommentsCount] = useState(blog.commentsCount || 0);
    const [isLiked, setIsLiked] = useState(() => {
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
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const bId = blog._id || blog.id;
        if (bId && !String(bId).startsWith('fallback-')) {
            blogService.getComments(bId).then((data) => {
                if (data && typeof data.total === 'number') {
                    setCommentsCount(data.total);
                }
            }).catch(() => {});
        }
    }, [blog._id, blog.id]);

    const handleLikeToggle = async () => {
        if (!user) {
            if (window.confirm('You must be signed in to like posts. Would you like to sign in now?')) {
                navigate('/signin');
            }
            return;
        }

        const bId = blog._id || blog.id;
        if (bId) {
            try {
                const res = await blogService.toggleLike(bId);
                setIsLiked(res.liked);
                setLikesCount(res.likeCount);
            } catch (err) {
                console.error('Failed to toggle like on profile blog:', err.message);
            }
        } else {
            setIsLiked(!isLiked);
            setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
        }
    };

    const statusStyle = isPublished
        ? {
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: '#10b981',
            border: '1px solid rgba(16, 185, 129, 0.3)',
        }
        : {
            backgroundColor: 'rgba(234, 179, 8, 0.15)',
            color: '#eab308',
            border: '1px solid rgba(234, 179, 8, 0.3)',
        };

    const dotColor = isPublished ? '#10b981' : '#eab308';
    const postTimeIST = blog.createdAt
        ? formatISTTime(blog.createdAt)
        : (blog.readTime && blog.readTime.includes('IST') ? blog.readTime : formatISTTime(new Date()));

    const blogModalData = {
        id: blog._id || blog.id,
        title: blog.title || 'Untitled Post',
        excerpt: blog.description || 'No summary available...',
        content: blog.content,
        author: blog.authorName || 'Author',
        category: blog.category || 'Blog',
        date: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Recently',
        readTime: postTimeIST,
        createdAt: blog.createdAt,
        image: blog.coverImage,
        likesCount,
        commentsCount,
        isLiked,
        comments: blog.comments || [],
    };

    return (
        <>
            <article
                className={styles.card}
                onClick={() => setIsModalOpen(true)}
                style={{ cursor: 'pointer' }}
            >
                {/* Top Meta Row (Status Badge & Timestamp for ALL posts) */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div className={styles.statusBadge} style={{ ...statusStyle, position: 'static' }}>
                        <span className={styles.statusDot} style={{ backgroundColor: dotColor }} />
                        {isPublished ? 'Published' : 'Draft'}
                    </div>
                    <div className={styles.readTime} style={{ position: 'static', backgroundColor: 'transparent', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}>
                        <Clock size={13} />
                        <span>{postTimeIST}</span>
                    </div>
                </div>

                {/* Cover Image (if present) */}
                {blog.coverImage && (
                    <div className={styles.coverWrapper} style={{ marginBottom: '14px' }}>
                        <img src={blog.coverImage} alt={blog.title} className={styles.cover} />
                    </div>
                )}

                <div className={styles.content}>
                    <h3 className={styles.title}>
                        {blog.title || 'Untitled Post'}
                    </h3>
                    <p className={styles.description}>{blog.description || 'No summary available...'}</p>

                    {/* Draft Actions */}
                    {!isPublished && onPublish && (
                        <div className={styles.footer}>
                            <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
                                <button
                                    type="button"
                                    className={styles.publishBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onPublish(blog._id || blog.id);
                                    }}
                                    title="Publish Draft"
                                >
                                    Publish
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Single working Interactive bar and comments for published posts */}
                    {isPublished && isAuthenticated && (
                        <div onClick={(e) => e.stopPropagation()} style={{ marginTop: '12px' }}>
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
                                    blogId={blog._id || blog.id}
                                    initialComments={blog.comments || []}
                                    onCommentCountChange={(count) => setCommentsCount(count)}
                                />
                            )}
                        </div>
                    )}
                </div>
            </article>

            {/* Article modal */}
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

export default ProfileBlogCard;