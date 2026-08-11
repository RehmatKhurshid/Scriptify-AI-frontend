import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiPenTool, FiRefreshCw } from 'react-icons/fi';
import HomeFeedLayout from '../../components/layout/HomeFeedLayout';
import HeroArticle from '../../components/home-feed/HeroArticle';
import FeedSection from '../../components/home-feed/FeedSection';
import DiscoverSidebar from '../../components/home-feed/DiscoverSidebar';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services/blogService';
import { aiService } from '../../services/aiService';
import styles from '../../styles/home-feed/HomeFeed.module.css';

import { getAvatarUrl } from '../../utils/avatar';

const HomeFeed = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [isPersonalized, setIsPersonalized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, [isAuthenticated]);

    const fetchBlogs = async () => {
        setLoading(true);
        setError(null);
        try {
            let data;
            if (isAuthenticated) {
                try {
                    data = await aiService.getPersonalizedFeed(1, 30);
                    if (data?.isPersonalized) {
                        setIsPersonalized(true);
                    }
                } catch (recErr) {
                    console.warn('Personalized feed fallback to getAllBlogs:', recErr.message);
                    data = await blogService.getAllBlogs({ limit: 30 });
                }
            } else {
                data = await blogService.getAllBlogs({ limit: 30 });
            }

            const rawBlogs = data.blogs || [];

            // Format raw backend blogs for component rendering
            const formatted = rawBlogs.map((b) => {
                const authorName = b.author
                    ? `${b.author.firstName || ''} ${b.author.lastName || ''}`.trim()
                    : 'Anonymous Author';

                const avatar = getAvatarUrl(b.author, authorName);

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
                    commentsCount: typeof b.commentsCount === 'number' ? b.commentsCount : 0,
                    likesCount: Array.isArray(b.likes) ? b.likes.length : 0,
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
                <div className={`${styles.feedWrapper} ${isAuthenticated ? styles.feedWrapperWithSidebar : ''}`}>
                    <main className={styles.mainFeed}>
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
                                <span>Loading...</span>
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
                                    No published blogs found
                                </h3>
                                <p style={{ color: '#9ca3af', marginBottom: '24px', maxWidth: '450px', margin: '0 auto 24px' }}>
                                    Be the first author to publish a blog post on Scriptify AI!
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
                                        title={isAuthenticated ? (isPersonalized ? "✨ Recommended For You" : "Articles For You") : "Recent Articles"}
                                        onArticleClick={handleArticleClick}
                                    />
                                )}
                            </>
                        )}
                    </main>

                    {isAuthenticated && (
                        <div className={styles.sidebarWrapper}>
                            <DiscoverSidebar />
                        </div>
                    )}
                </div>
            </div>
        </HomeFeedLayout>
    );
};

export default HomeFeed;