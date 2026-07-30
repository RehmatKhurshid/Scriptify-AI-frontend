import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiPenTool, FiGlobe, FiUser, FiRefreshCw } from 'react-icons/fi';
import HomeFeedLayout from '../../components/layout/HomeFeedLayout';
import HeroArticle from '../../components/home-feed/HeroArticle';
import FeedSection from '../../components/home-feed/FeedSection';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services/blogService';
import styles from '../../styles/home-feed/HomeFeed.module.css';

const HomeFeed = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [feedTab, setFeedTab] = useState('all'); // 'all' | 'my'
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, [feedTab, isAuthenticated]);

    const fetchBlogs = async () => {
        setLoading(true);
        setError(null);
        try {
            let data;
            if (feedTab === 'my' && isAuthenticated) {
                data = await blogService.getMyBlogs({ status: 'published' });
            } else {
                data = await blogService.getAllBlogs({ limit: 30 });
            }

            const rawBlogs = data.blogs || [];

            // Format raw backend blogs for component rendering
            const formatted = rawBlogs.map((b) => {
                const authorName = b.author
                    ? `${b.author.firstName || ''} ${b.author.lastName || ''}`.trim()
                    : 'Anonymous Author';

                const avatar = b.author?.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(authorName || 'User')}`;

                const cleanExcerpt = b.excerpt ||
                    (b.content ? b.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...' : 'No description provided');

                const wordCount = b.content ? b.content.trim().split(/\s+/).filter(Boolean).length : 0;
                const calculatedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

                return {
                    _id: b._id,
                    title: b.title || 'Untitled Post',
                    excerpt: cleanExcerpt,
                    author: authorName,
                    authorAvatar: avatar,
                    category: b.category || 'Editorial',
                    date: b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
                    readTime: calculatedReadTime,
                    image: b.thumbnailUrl || null,
                    raw: b,
                };
            });

            setBlogs(formatted);
        } catch (err) {
            console.error('Failed to fetch feed blogs:', err);
            setError(err.message || 'Failed to load published blogs.');
        } finally {
            setLoading(false);
        }
    };

    const handleArticleClick = (article) => {
        if (!article?._id) return;
        navigate(`/edit/${article._id}`);
    };

    const featuredBlog = blogs.length > 0 ? blogs[0] : null;
    const remainingBlogs = blogs.length > 1 ? blogs.slice(1) : [];

    return (
        <HomeFeedLayout>
            <div className={styles.container}>
                {/* Top Control Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    marginBottom: '8px'
                }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => setFeedTab('all')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 18px',
                                borderRadius: '10px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                backgroundColor: feedTab === 'all' ? '#6366f1' : 'rgba(255, 255, 255, 0.05)',
                                color: feedTab === 'all' ? '#ffffff' : '#94a3b8',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <FiGlobe size={16} />
                            All Published Blogs
                        </button>

                        {isAuthenticated && (
                            <button
                                onClick={() => setFeedTab('my')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '10px 18px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    backgroundColor: feedTab === 'my' ? '#6366f1' : 'rgba(255, 255, 255, 0.05)',
                                    color: feedTab === 'my' ? '#ffffff' : '#94a3b8',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <FiUser size={16} />
                                My Published Blogs
                            </button>
                        )}
                    </div>

                    <Link
                        to="/create"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            backgroundColor: 'rgba(139, 92, 246, 0.15)',
                            color: '#a78bfa',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <FiPenTool size={16} />
                        Write Article
                    </Link>
                </div>

                {loading ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        color: '#94a3b8',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <FiRefreshCw size={24} style={{ animation: 'spin 1s linear infinite', color: '#8b5cf6' }} />
                        <span>Loading published articles...</span>
                    </div>
                ) : error ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        color: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.08)',
                        borderRadius: '12px',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}>
                        <p>{error}</p>
                        <button
                            onClick={fetchBlogs}
                            style={{
                                marginTop: '12px',
                                padding: '8px 16px',
                                backgroundColor: '#6366f1',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                        >
                            Retry
                        </button>
                    </div>
                ) : blogs.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        border: '1px dashed rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        margin: '20px 0'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', color: '#f3f4f6', marginBottom: '8px' }}>
                            {feedTab === 'my' ? "You haven't published any blogs yet" : "No published blogs found"}
                        </h3>
                        <p style={{ color: '#9ca3af', marginBottom: '24px', maxWidth: '450px', margin: '0 auto 24px' }}>
                            {feedTab === 'my'
                                ? "Share your ideas and structural insights with the community by publishing your first article."
                                : "Be the first author to publish a blog post on Scriptify AI!"}
                        </p>
                        <Link
                            to="/create"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 24px',
                                borderRadius: '10px',
                                backgroundColor: '#6366f1',
                                color: '#ffffff',
                                fontWeight: '600',
                                textDecoration: 'none'
                            }}
                        >
                            <FiPenTool size={18} />
                            Create Blog Post
                        </Link>
                    </div>
                ) : (
                    <>
                        {featuredBlog && (
                            <HeroArticle
                                blog={featuredBlog}
                                onClick={() => handleArticleClick(featuredBlog)}
                            />
                        )}

                        {remainingBlogs.length > 0 && (
                            <FeedSection
                                blogs={remainingBlogs}
                                title={feedTab === 'my' ? 'My Published Articles' : 'Recent Articles'}
                                onArticleClick={handleArticleClick}
                            />
                        )}
                    </>
                )}
            </div>
        </HomeFeedLayout>
    );
};

export default HomeFeed;