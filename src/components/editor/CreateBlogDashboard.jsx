import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText,
    Globe,
    FileCode,
    Plus,
    Search,
    Edit3,
    Trash2,
    Send,
    RefreshCw,
    TrendingUp,
    BarChart2,
    CheckCircle2,
    Clock
} from 'lucide-react';
import { blogService } from '../../services/blogService';
import styles from '../../styles/editor/CreateBlogDashboard.module.css';

const CreateBlogDashboard = ({ onWriteClick, initialTab = 'all' }) => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(initialTab); // 'all' | 'published' | 'drafts'
    const [searchQuery, setSearchQuery] = useState('');
    const [actionLoadingId, setActionLoadingId] = useState(null);

    const [blogCounts, setBlogCounts] = useState({ all: 0, published: 0, drafts: 0 });

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    const fetchMyBlogs = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await blogService.getMyBlogs({ limit: 200 });
            const rawBlogs = data.blogs || [];
            setBlogs(rawBlogs);
            if (data.counts) {
                setBlogCounts(data.counts);
            } else {
                const pub = rawBlogs.filter(b => b.status === 'published').length;
                const drf = rawBlogs.filter(b => b.status === 'draft').length;
                setBlogCounts({ all: rawBlogs.length, published: pub, drafts: drf });
            }
        } catch (err) {
            console.error('Failed to fetch user blogs:', err);
            setError(err.message || 'Failed to load user blogs and statistics.');
        } finally {
            setLoading(false);
        }
    };

    const publishedBlogs = blogs.filter(b => b.status === 'published');
    const draftBlogs = blogs.filter(b => b.status === 'draft');

    const stats = {
        total: blogCounts.all !== undefined ? blogCounts.all : blogs.length,
        published: blogCounts.published !== undefined ? blogCounts.published : publishedBlogs.length,
        drafts: blogCounts.drafts !== undefined ? blogCounts.drafts : draftBlogs.length,
    };

    const handlePublishDraft = async (blogId, e) => {
        e.stopPropagation();
        setActionLoadingId(blogId);
        try {
            await blogService.updateBlog(blogId, { status: 'published' });
            await fetchMyBlogs();
        } catch (err) {
            console.error('Failed to publish draft:', err);
            alert('Failed to publish draft: ' + (err.message || 'Unknown error'));
        } finally {
            setActionLoadingId(null);
        }
    };

    const handleDeleteBlog = async (blogId, e) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this blog post?')) return;
        setActionLoadingId(blogId);
        try {
            await blogService.deleteBlog(blogId);
            await fetchMyBlogs();
        } catch (err) {
            console.error('Failed to delete blog:', err);
            alert('Failed to delete blog: ' + (err.message || 'Unknown error'));
        } finally {
            setActionLoadingId(null);
        }
    };

    let filteredBlogs = blogs;
    if (activeTab === 'published') {
        filteredBlogs = publishedBlogs;
    } else if (activeTab === 'drafts') {
        filteredBlogs = draftBlogs;
    }

    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filteredBlogs = filteredBlogs.filter(b =>
            (b.title || '').toLowerCase().includes(query) ||
            (b.category || '').toLowerCase().includes(query) ||
            (b.excerpt || '').toLowerCase().includes(query)
        );
    }

    return (
        <div className={styles.dashboardContainer}>
            {/* Top Banner */}
            <div className={styles.headerBanner}>
                <div className={styles.headerText}>
                    <div className={styles.badge}>
                        <TrendingUp size={14} />
                        <span>Creator Hub</span>
                    </div>
                    <h1 className={styles.title}>Blog Dashboard & Statistics</h1>
                    <p className={styles.subtitle}>
                        Overview of your published articles, saved drafts, and content metrics.
                    </p>
                </div>
                <button className={styles.createBtn} onClick={onWriteClick}>
                    <Plus size={18} />
                    <span>Create New Blog</span>
                </button>
            </div>

            {/* Statistics Cards */}
            <div className={styles.statsGrid}>
                <div
                    className={`${styles.statCard} ${activeTab === 'all' ? styles.activeCard : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                        <FileText size={22} />
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Total Blogs</span>
                        <span className={styles.statValue}>{stats.total}</span>
                    </div>
                    <div className={styles.statFooter}>All Created Content</div>
                </div>

                <div
                    className={`${styles.statCard} ${activeTab === 'published' ? styles.activeCard : ''}`}
                    onClick={() => setActiveTab('published')}
                >
                    <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                        <Globe size={22} />
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Published Blogs</span>
                        <span className={styles.statValue}>{stats.published}</span>
                    </div>
                    <div className={styles.statFooter}>Live for Community</div>
                </div>

                <div
                    className={`${styles.statCard} ${activeTab === 'drafts' ? styles.activeCard : ''}`}
                    onClick={() => setActiveTab('drafts')}
                >
                    <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                        <FileCode size={22} />
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Saved Drafts</span>
                        <span className={styles.statValue}>{stats.drafts}</span>
                    </div>
                    <div className={styles.statFooter}>Work in Progress</div>
                </div>
            </div>

            {/* Content Control Bar */}
            <div className={styles.controlBar}>
                <div className={styles.tabsGroup}>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'all' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        <BarChart2 size={16} />
                        <span>All Blogs ({stats.total})</span>
                    </button>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'published' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('published')}
                    >
                        <CheckCircle2 size={16} />
                        <span>Published ({stats.published})</span>
                    </button>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'drafts' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('drafts')}
                    >
                        <Clock size={16} />
                        <span>Drafts ({stats.drafts})</span>
                    </button>
                </div>

                <div className={styles.searchBox}>
                    <Search size={16} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search your blogs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            {/* Blog List Area */}
            {loading ? (
                <div className={styles.loadingState}>
                    <RefreshCw size={24} className={styles.spinIcon} />
                    <span>Loading your blogs and statistics...</span>
                </div>
            ) : error ? (
                <div className={styles.errorState}>
                    <p>{error}</p>
                    <button className={styles.retryBtn} onClick={fetchMyBlogs}>Retry</button>
                </div>
            ) : filteredBlogs.length === 0 ? (
                <div className={styles.emptyState}>
                    <FileText size={40} className={styles.emptyIcon} />
                    <h3>No {activeTab !== 'all' ? activeTab : ''} blogs found</h3>
                    <p>
                        {activeTab === 'drafts'
                            ? "You don't have any saved drafts currently."
                            : activeTab === 'published'
                                ? "You haven't published any blogs yet."
                                : "Start expressing your thoughts by creating your first article!"}
                    </p>
                    <button className={styles.createBtn} onClick={onWriteClick}>
                        <Plus size={16} />
                        <span>Start Writing</span>
                    </button>
                </div>
            ) : (
                <div className={styles.blogGrid}>
                    {filteredBlogs.map((blog) => {
                        const isPublished = blog.status === 'published';
                        const isActionLoading = actionLoadingId === blog._id;

                        return (
                            <div
                                key={blog._id}
                                className={styles.blogCard}
                                onClick={() => navigate(`/edit/${blog._id}`)}
                            >
                                <div className={styles.cardHeader}>
                                    <span className={styles.categoryBadge}>
                                        {blog.category || 'General'}
                                    </span>
                                    <span className={`${styles.statusBadge} ${isPublished ? styles.publishedStatus : styles.draftStatus}`}>
                                        {isPublished ? '● Published' : '○ Draft'}
                                    </span>
                                </div>

                                <h3 className={styles.blogTitle}>{blog.title || 'Untitled Blog Post'}</h3>
                                <p className={styles.blogExcerpt}>
                                    {blog.excerpt || (blog.content ? blog.content.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...' : 'No excerpt provided.')}
                                </p>

                                <div className={styles.cardFooter}>
                                    <span className={styles.blogDate}>
                                        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                                    </span>

                                    <div className={styles.cardActions}>
                                        {!isPublished && (
                                            <button
                                                className={styles.publishBtn}
                                                onClick={(e) => handlePublishDraft(blog._id, e)}
                                                disabled={isActionLoading}
                                                title="Publish Draft"
                                            >
                                                <Send size={14} />
                                                <span>Publish</span>
                                            </button>
                                        )}

                                        <button
                                            className={styles.actionBtn}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/edit/${blog._id}`);
                                            }}
                                            title="Edit Blog"
                                        >
                                            <Edit3 size={14} />
                                        </button>

                                        <button
                                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                            onClick={(e) => handleDeleteBlog(blog._id, e)}
                                            disabled={isActionLoading}
                                            title="Delete Blog"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CreateBlogDashboard;
