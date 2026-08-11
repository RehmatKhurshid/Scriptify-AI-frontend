import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Heart, Trash2, MessageSquare } from 'lucide-react';
import Avatar from './Avatar';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services/blogService';
import { formatISTTime } from '../../utils/dateUtils';
import { getAvatarUrl } from '../../utils/avatar';
import styles from '../../styles/common/CommentsSection.module.css';

const CommentsSection = ({
    blogId,
    initialComments = [],
    onCommentCountChange,
    className = '',
}) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [comments, setComments] = useState(initialComments);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (blogId) {
            fetchComments();
        }
    }, [blogId]);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const data = await blogService.getComments(blogId);
            const rawComments = data.comments || [];

            const formatted = rawComments.map((c) => {
                const authorObj = c.author || {};
                const name = `${authorObj.firstName || ''} ${authorObj.lastName || ''}`.trim() || 'User';
                const avatar = getAvatarUrl(authorObj, name);
                const userId = user ? String(user._id || user.id || user.userId || '') : '';
                const authorId = authorObj ? String(authorObj._id || authorObj.id || '') : '';
                const isOwner = Boolean(userId && authorId && userId === authorId);

                return {
                    id: c._id,
                    authorName: name,
                    authorAvatar: avatar,
                    content: c.text,
                    createdAt: formatISTTime(c.createdAt),
                    likesCount: c.likesCount || 0,
                    isLiked: false,
                    isOwner,
                };
            });

            setComments(formatted);
            if (onCommentCountChange) {
                onCommentCountChange(formatted.length);
            }
        } catch (err) {
            console.error('Failed to fetch blog comments:', err.message);
        } finally {
            setLoading(false);
        }
    };

    const currentUserName = user
        ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'User'
        : 'Guest';

    const currentUserAvatar = getAvatarUrl(user, currentUserName);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Check logged in status
        if (!user) {
            if (window.confirm('You must be signed in to comment on posts. Would you like to sign in now?')) {
                navigate('/signin');
            }
            return;
        }

        if (!text.trim()) return;

        setErrorMsg('');

        // 2. If blogId exists, post to backend API
        if (blogId) {
            try {
                const response = await blogService.addComment(blogId, { text: text.trim() });
                const added = response.comment;

                if (added) {
                    const newCommentObj = {
                        id: added._id || `comment-${Date.now()}`,
                        authorName: currentUserName,
                        authorAvatar: currentUserAvatar,
                        content: added.text || text.trim(),
                        createdAt: 'Just now',
                        likesCount: 0,
                        isLiked: false,
                        isOwner: true,
                    };
                    const updated = [newCommentObj, ...comments];
                    setComments(updated);
                    if (onCommentCountChange) onCommentCountChange(updated.length);
                    if (response.message && response.message.includes('pending review')) {
                        alert('Your comment was submitted and is pending automated review.');
                    }
                } else {
                    fetchComments();
                }
            } catch (err) {
                const message = err.response?.data?.message || err.message || 'Failed to post comment.';
                setErrorMsg(message);
            }
        } else {
            // Local fallback if no blogId
            const localComment = {
                id: `comment-${Date.now()}`,
                authorName: currentUserName,
                authorAvatar: currentUserAvatar,
                content: text.trim(),
                createdAt: 'Just now',
                likesCount: 0,
                isLiked: false,
                isOwner: true,
            };
            const updated = [localComment, ...comments];
            setComments(updated);
            if (onCommentCountChange) onCommentCountChange(updated.length);
        }

        setText('');
    };

    const handleToggleCommentLike = (id) => {
        if (!user) {
            if (window.confirm('You must be signed in to interact with comments. Sign in now?')) {
                navigate('/signin');
            }
            return;
        }

        setComments((prev) =>
            prev.map((c) => {
                if (c.id === id) {
                    const newIsLiked = !c.isLiked;
                    return {
                        ...c,
                        isLiked: newIsLiked,
                        likesCount: newIsLiked ? c.likesCount + 1 : c.likesCount - 1,
                    };
                }
                return c;
            })
        );
    };

    const handleDelete = async (commentId) => {
        if (blogId) {
            try {
                await blogService.deleteComment(blogId, commentId);
            } catch (err) {
                console.error('Failed to delete comment:', err.message);
            }
        }
        const updated = comments.filter((c) => c.id !== commentId);
        setComments(updated);
        if (onCommentCountChange) onCommentCountChange(updated.length);
    };

    return (
        <div className={`${styles.commentsContainer} ${className}`}>
            <div className={styles.header}>
                <MessageSquare size={16} className={styles.headerIcon} />
                <h4 className={styles.title}>Comments ({comments.length})</h4>
            </div>

            {errorMsg && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '10px' }}>
                    {errorMsg}
                </div>
            )}

            {/* Input form */}
            <form onSubmit={handleSubmit} className={styles.commentForm}>
                <Avatar src={currentUserAvatar} alt={currentUserName} size="sm" />
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder={user ? "Write your thoughts or feedback..." : "Sign in to leave a comment..."}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        type="submit"
                        className={styles.sendBtn}
                        disabled={!text.trim()}
                        title={user ? "Post Comment" : "Sign in to comment"}
                    >
                        <Send size={15} />
                    </button>
                </div>
            </form>

            {/* Comments list */}
            <div className={styles.commentsList}>
                {loading ? (
                    <div className={styles.emptyState}>Loading comments...</div>
                ) : comments.length === 0 ? (
                    <div className={styles.emptyState}>No comments yet. Be the first to share your thoughts!</div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className={styles.commentItem}>
                            <Avatar src={comment.authorAvatar} alt={comment.authorName} size="sm" />
                            <div className={styles.commentContentWrapper}>
                                <div className={styles.commentMeta}>
                                    <span className={styles.authorName}>{comment.authorName}</span>
                                    <span className={styles.timestamp}>{comment.createdAt}</span>
                                </div>
                                <p className={styles.commentText}>{comment.content}</p>
                                <div className={styles.commentFooter}>
                                    <button
                                        type="button"
                                        className={`${styles.likeBtn} ${comment.isLiked ? styles.commentLiked : ''}`}
                                        onClick={() => handleToggleCommentLike(comment.id)}
                                    >
                                        <Heart
                                            size={13}
                                            fill={comment.isLiked ? '#ec4899' : 'none'}
                                        />
                                        <span>{comment.likesCount}</span>
                                    </button>

                                    {comment.isOwner && (
                                        <button
                                            type="button"
                                            className={styles.deleteBtn}
                                            onClick={() => handleDelete(comment.id)}
                                            title="Delete comment"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentsSection;
