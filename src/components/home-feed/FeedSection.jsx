import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { blogService } from '../../services/blogService';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/home-feed/FeedSection.module.css';

const defaultFallbackArticles = [
    {
        id: 'fallback-1',
        author: 'Julian Hayes',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        category: 'Future Tech',
        title: 'Cognitive Load and the Disappearing Interface',
        excerpt: 'Why the best user interfaces of 2025 are the ones you barely notice, and how predictive agents are replacing explicit commands.',
        date: 'Oct 11',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
    },
    {
        id: 'fallback-2',
        author: 'Sarah Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        category: 'Machine Learning',
        title: 'The Poetry of Latent Space',
        excerpt: 'Navigating the high-dimensional geometry where language models store concepts, and why it resembles human intuition more than cold logic.',
        date: 'Oct 09',
        readTime: '12 min read',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    },
];

const FeedSection = ({ blogs: propBlogs, title = "Your Feed" }) => {
    const { user } = useAuth();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (propBlogs && propBlogs.length > 0) {
            formatAndSetBlogs(propBlogs);
        } else {
            fetchPublishedBlogs();
        }
    }, [propBlogs, user]);

    const formatAndSetBlogs = (fetchedBlogs) => {
        const formatted = fetchedBlogs.map((b) => {
            const blogObj = b.raw || b;
            const authorName = blogObj.author
                ? (typeof blogObj.author === 'object' ? `${blogObj.author.firstName || ''} ${blogObj.author.lastName || ''}`.trim() : blogObj.author)
                : 'Author';

            const likesArray = Array.isArray(blogObj.likes) ? blogObj.likes : [];
            const initialLikes = typeof blogObj.likesCount === 'number' ? blogObj.likesCount : likesArray.length;
            const userId = user ? String(user._id || user.id || user.userId || '') : '';
            const initialIsLiked = Boolean(
                userId && likesArray.some((uId) => {
                    if (!uId) return false;
                    const targetId = typeof uId === 'object' ? String(uId._id || uId.id || '') : String(uId);
                    return targetId === userId;
                })
            );
            const initialComments = blogObj.commentsCount || 0;

            const dateFormatted = blogObj.createdAt && !isNaN(new Date(blogObj.createdAt).getTime())
                ? new Date(blogObj.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : 'Recently';

            return {
                id: blogObj._id || blogObj.id || `blog-${Math.random()}`,
                author: authorName || 'Anonymous',
                authorAvatar: blogObj.author?.avatar || blogObj.authorAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(authorName)}`,
                category: blogObj.category || 'Technology',
                title: blogObj.title || 'Untitled Post',
                excerpt: blogObj.excerpt || (blogObj.content ? blogObj.content.replace(/<[^>]*>?/gm, '').substring(0, 140) + '...' : ''),
                date: dateFormatted,
                createdAt: blogObj.createdAt,
                image: blogObj.thumbnailUrl || blogObj.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
                initialLikes,
                initialComments,
                initialIsLiked,
            };
        });
        setArticles(formatted);
        setLoading(false);
    };

    const fetchPublishedBlogs = async () => {
        setLoading(true);
        try {
            const data = await blogService.getAllBlogs();
            const fetchedBlogs = data.blogs || [];

            if (fetchedBlogs.length > 0) {
                formatAndSetBlogs(fetchedBlogs);
            } else {
                setArticles(defaultFallbackArticles);
                setLoading(false);
            }
        } catch (err) {
            console.error('Failed to fetch feed blogs:', err.message);
            setArticles(defaultFallbackArticles);
            setLoading(false);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Your Feed</h2>
            </div>

            <div className={styles.articlesList}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
                        Loading latest published posts...
                    </div>
                ) : (
                    articles.map((article) => (
                        <ArticleCard key={article.id} {...article} />
                    ))
                )}
            </div>
        </section>
    );
};

export default FeedSection;