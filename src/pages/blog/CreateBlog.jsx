import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText,
    Plus,
    Calendar,
    Clock,
    Edit3,
    Trash2,
    RefreshCw,
    LayoutDashboard,
    Eye,
    CheckCircle,
    FileSpreadsheet,
    Sparkles,
    X
} from 'lucide-react';
import EditorNavbar from '../../components/editor/EditorNavbar';
import EditorSidebar from '../../components/editor/EditorSidebar';
import EditorCanvas from '../../components/editor/EditorCanvas';
import PostSettingsPanel from '../../components/editor/PostSettingsPanel';
import { blogService } from '../../services/blogService';
import { aiService } from '../../services/aiService';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/editor/CreateBlog.module.css';

const CreateBlog = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, updateUser } = useAuth();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState('editor'); // 'editor' | 'drafts' | 'dashboard'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Drafts List state
    const [draftsList, setDraftsList] = useState([]);
    const [loadingDrafts, setLoadingDrafts] = useState(false);

    // Dashboard User Blogs state
    const [userBlogs, setUserBlogs] = useState([]);
    const [loadingUserBlogs, setLoadingUserBlogs] = useState(false);
    const [dashboardFilter, setDashboardFilter] = useState('all'); // 'all' | 'published' | 'draft'

    const [editingDraftId, setEditingDraftId] = useState(null);

    const navItems = [
        { id: 'editor', label: 'Create Blog', icon: 'FileText' },
        { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
        { id: 'drafts', label: 'My Drafts', icon: 'FileText' },
    ];

    const [blogData, setBlogData] = useState({
        title: '',
        category: 'Artificial Intelligence',
        tags: '',
        excerpt: '',
        content: '',
        status: 'published',
    });

    const [manualImageFile, setManualImageFile] = useState(null);
    const [manualImagePreview, setManualImagePreview] = useState(null);
    const [aiThumbnailPreview, setAiThumbnailPreview] = useState(null);

    // AI Features loading state
    const [aiLoading, setAiLoading] = useState({
        draft: false,
        tags: false,
        summary: false,
        improve: null,
        thumbnail: false,
        titles: false,
        content: false,
    });
    const [aiTitles, setAiTitles] = useState([]);
    const [showTitleModal, setShowTitleModal] = useState(false);

    const inferCategoryFromTopic = (topic = '') => {
        const text = topic.toLowerCase();
        if (text.includes('machine learning') || text.includes('ml') || text.includes('model') || text.includes('neural')) return 'Machine Learning';
        if (text.includes('ai') || text.includes('artificial intelligence') || text.includes('gpt') || text.includes('llm') || text.includes('agent')) return 'Artificial Intelligence';
        if (text.includes('web') || text.includes('react') || text.includes('javascript') || text.includes('code') || text.includes('frontend') || text.includes('backend') || text.includes('developer')) return 'Web Development';
        if (text.includes('design') || text.includes('ui') || text.includes('ux') || text.includes('figma')) return 'Design';
        if (text.includes('productivity') || text.includes('work') || text.includes('time') || text.includes('habit')) return 'Productivity';
        if (text.includes('business') || text.includes('startup') || text.includes('money') || text.includes('market')) return 'Business';
        return 'Technology';
    };

    // 0. Generate AI Title suggestions
    const handleGenerateTitles = async () => {
        if (!blogData.title && !blogData.content && !blogData.category) {
            setError('Please enter a title, category, or content first to generate title suggestions.');
            return;
        }
        setError('');
        setAiLoading((prev) => ({ ...prev, titles: true }));
        try {
            const data = await aiService.generateTitles(blogData.title || blogData.category, blogData.content);
            if (data.titles && Array.isArray(data.titles) && data.titles.length > 0) {
                setAiTitles(data.titles);
                setShowTitleModal(true);
                setSuccessMessage('AI Title suggestions generated!');
            } else {
                setError('No titles generated. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'Failed to generate title suggestions.');
        } finally {
            setAiLoading((prev) => ({ ...prev, titles: false }));
        }
    };

    // 0b. Generate AI Blog Content
    const handleGenerateContent = async () => {
        const topicOrTitle = blogData.title || blogData.category;
        if (!topicOrTitle || !topicOrTitle.trim()) {
            setError('Please enter a Title or Category first so AI knows what content to generate.');
            return;
        }
        setError('');
        setAiLoading((prev) => ({ ...prev, content: true }));
        try {
            const data = await aiService.generateDraft(topicOrTitle);
            if (data.draft) {
                const { title, category, introduction, sections, conclusion, suggestedTags } = data.draft;
                const fullContent = [
                    introduction,
                    ...(sections || []).map((s) => `## ${s.heading}\n\n${s.content}`),
                    conclusion ? `## Conclusion\n\n${conclusion}` : '',
                ].filter(Boolean).join('\n\n');

                setBlogData((prev) => ({
                    ...prev,
                    title: prev.title || title || '',
                    category: prev.category || category || 'Technology',
                    content: fullContent,
                    tags: prev.tags || (Array.isArray(suggestedTags) ? suggestedTags.join(', ') : ''),
                }));
                setSuccessMessage('AI Content generated successfully!');
            }
        } catch (err) {
            setError(err.message || 'Failed to generate blog content.');
        } finally {
            setAiLoading((prev) => ({ ...prev, content: false }));
        }
    };

    // 1. Generate Blog Draft
    const handleGenerateDraft = async (ideaText) => {
        if (!ideaText || !ideaText.trim()) {
            setError('Please enter a blog idea first.');
            return;
        }
        setError('');
        setAiLoading((prev) => ({ ...prev, draft: true }));
        try {
            const data = await aiService.generateDraft(ideaText);
            if (data.draft) {
                const { title, category, introduction, sections, conclusion, suggestedTags } = data.draft;
                const fullContent = [
                    introduction,
                    ...(sections || []).map((s) => `## ${s.heading}\n\n${s.content}`),
                    conclusion ? `## Conclusion\n\n${conclusion}` : '',
                ].filter(Boolean).join('\n\n');

                const determinedCategory = category || inferCategoryFromTopic(ideaText);

                setBlogData((prev) => ({
                    ...prev,
                    title: title || prev.title,
                    category: determinedCategory || prev.category,
                    content: fullContent || prev.content,
                    tags: Array.isArray(suggestedTags) ? suggestedTags.join(', ') : prev.tags,
                }));
                setSuccessMessage('AI Blog draft generated successfully!');
            }
        } catch (err) {
            setError(err.message || 'Failed to generate blog draft.');
        } finally {
            setAiLoading((prev) => ({ ...prev, draft: false }));
        }
    };

    // 2. Generate SEO Tags
    const handleGenerateTags = async () => {
        if (!blogData.title && !blogData.content) {
            setError('Please enter a title or content before generating tags.');
            return;
        }
        setError('');
        setAiLoading((prev) => ({ ...prev, tags: true }));
        try {
            const data = await aiService.generateSEOTags(blogData.title, blogData.content);
            if (data.seoData) {
                const { tags, category } = data.seoData;
                setBlogData((prev) => ({
                    ...prev,
                    tags: Array.isArray(tags) ? tags.join(', ') : prev.tags,
                    category: category || prev.category,
                }));
                setSuccessMessage('SEO Tags generated successfully!');
            }
        } catch (err) {
            setError(err.message || 'Failed to generate SEO tags.');
        } finally {
            setAiLoading((prev) => ({ ...prev, tags: false }));
        }
    };

    // 3. Generate Summary
    const handleGenerateSummary = async () => {
        if (!blogData.content || !blogData.content.trim()) {
            setError('Please enter blog content first to generate a summary.');
            return;
        }
        setError('');
        setAiLoading((prev) => ({ ...prev, summary: true }));
        try {
            const data = await aiService.summarizeBlog(blogData.content);
            if (data.summary) {
                const cleanSummary = data.summary.length > 300 ? data.summary.substring(0, 300).trim() : data.summary;
                setBlogData((prev) => ({
                    ...prev,
                    excerpt: cleanSummary,
                }));
                setSuccessMessage('Summary generated successfully!');
            }
        } catch (err) {
            setError(err.message || 'Failed to generate summary.');
        } finally {
            setAiLoading((prev) => ({ ...prev, summary: false }));
        }
    };

    // 4. Improve Content
    const handleImproveContent = async (actionKey = 'improve', instruction = 'Improve grammar, clarity, readability, and professional tone.') => {
        const textToImprove = (blogData.content || blogData.excerpt || blogData.title || ideaText || '').trim();
        if (!textToImprove) {
            setError('Please write a title, excerpt, or content first before using AI content tools.');
            return;
        }
        setError('');
        setAiLoading((prev) => ({ ...prev, improve: actionKey }));
        try {
            const data = await aiService.improveContent(textToImprove, instruction);
            if (data && data.improved) {
                const cleaned = data.improved
                    .replace(/^```(?:markdown)?\s*/i, '')
                    .replace(/\s*```$/, '')
                    .trim();

                setBlogData((prev) => {
                    const nextContent = actionKey === 'continue'
                        ? (prev.content ? `${prev.content}\n\n${cleaned}` : cleaned)
                        : cleaned;
                    return {
                        ...prev,
                        content: nextContent,
                    };
                });
                setSuccessMessage(
                    actionKey === 'continue'
                        ? 'Continued writing content successfully!'
                        : actionKey === 'rewrite'
                            ? 'Content rewritten successfully!'
                            : actionKey === 'expand'
                                ? 'Content expanded successfully!'
                                : actionKey === 'shorten'
                                    ? 'Content shortened successfully!'
                                    : 'Content improved successfully!'
                );
            }
        } catch (err) {
            console.error('Failed to improve content:', err);
            setError(err.message || 'Failed to process content operation.');
        } finally {
            setAiLoading((prev) => ({ ...prev, improve: null }));
        }
    };

    // 5. Generate AI Thumbnail
    const handleGenerateThumbnail = async (ideaPrompt) => {
        const topicOrTitle = (ideaPrompt || blogData.title || blogData.excerpt || '').trim();
        if (!topicOrTitle) {
            setError('Please enter a blog title or describe your blog idea first to generate an AI cover graphic.');
            return;
        }

        setError('');
        setAiLoading((prev) => ({ ...prev, thumbnail: true }));
        try {
            const data = await aiService.generateThumbnail(blogData.title, blogData.excerpt, topicOrTitle);
            const generatedUrl = data?.imageUrl;

            if (generatedUrl) {
                setAiThumbnailPreview(generatedUrl);
                setSuccessMessage('AI Cover graphic generated successfully!');
            } else {
                const cleanTopic = topicOrTitle.replace(/[^a-zA-Z0-9 ]/g, " ").trim().substring(0, 150);
                const encoded = encodeURIComponent(`${cleanTopic} professional editorial cover graphic 4k no text`);
                const fallbackUrl = `https://image.pollinations.ai/prompt/${encoded}?width=1200&height=630&seed=${Date.now()}&nologo=true`;
                setAiThumbnailPreview(fallbackUrl);
                setSuccessMessage('AI Cover graphic generated successfully!');
            }
        } catch (err) {
            console.error('Thumbnail generation error:', err);
            setError(err.message || 'Failed to generate AI cover graphic.');
        } finally {
            setAiLoading((prev) => ({ ...prev, thumbnail: false }));
        }
    };

    // Auto-vanish notification messages
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Fetch data when switching tabs
    useEffect(() => {
        if (activeNavItem === 'drafts' && isAuthenticated) {
            fetchUserDrafts();
        } else if (activeNavItem === 'dashboard' && isAuthenticated) {
            fetchUserAllBlogs();
        }
    }, [activeNavItem, isAuthenticated]);

    const fetchUserDrafts = async () => {
        setLoadingDrafts(true);
        try {
            const data = await blogService.getMyBlogs({ status: 'draft', limit: 200 });
            setDraftsList(data.blogs || []);
        } catch (err) {
            console.error('Failed to fetch drafts:', err.message);
        } finally {
            setLoadingDrafts(false);
        }
    };

    const fetchUserAllBlogs = async () => {
        setLoadingUserBlogs(true);
        try {
            const data = await blogService.getMyBlogs({ limit: 200 });
            setUserBlogs(data.blogs || []);
        } catch (err) {
            console.error('Failed to fetch user dashboard blogs:', err.message);
        } finally {
            setLoadingUserBlogs(false);
        }
    };

    const handleManualImageSelect = (file) => {
        if (!file) return;
        setManualImageFile(file);
        setManualImagePreview(URL.createObjectURL(file));
        setSuccessMessage('Manual image file attached successfully!');
    };

    const handleRemoveManualImage = () => {
        setManualImageFile(null);
        setManualImagePreview(null);
    };

    const handleRemoveAiThumbnail = () => {
        setAiThumbnailPreview(null);
    };

    const handleSavePost = async (targetStatus = 'published') => {
        setError('');
        setSuccessMessage('');

        if (!isAuthenticated) {
            setError('Please sign in to create or save a blog post.');
            setTimeout(() => navigate('/signin'), 2000);
            return;
        }

        if (!blogData.title.trim()) {
            setError('Blog title is required.');
            return;
        }

        if (!blogData.content.trim()) {
            setError('Blog content cannot be empty.');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', blogData.title.trim());
            formData.append('content', blogData.content);
            formData.append('category', blogData.category);
            formData.append('excerpt', (blogData.excerpt || '').substring(0, 300).trim());
            formData.append('tags', blogData.tags);
            formData.append('status', targetStatus);

            if (manualImageFile) {
                formData.append('thumbnail', manualImageFile);
            } else if (manualImagePreview) {
                formData.append('thumbnailUrl', manualImagePreview);
            } else if (aiThumbnailPreview) {
                formData.append('thumbnailUrl', aiThumbnailPreview);
            }

            let response;
            if (editingDraftId) {
                response = await blogService.updateBlog(editingDraftId, formData);
            } else {
                response = await blogService.createBlog(formData);
            }

            if (updateUser && (response?.userRole === 'blogger' || user?.role === 'reader')) {
                updateUser({ role: 'blogger' });
            }

            if (targetStatus === 'draft') {
                setSuccessMessage('Blog saved as draft successfully');
            } else {
                setSuccessMessage('Blog published successfully');
            }

            if (targetStatus === 'draft') {
                fetchUserDrafts();
                setTimeout(() => {
                    setActiveNavItem('drafts');
                }, 1200);
            } else {
                setTimeout(() => {
                    navigate('/Home-Feed');
                }, 1500);
            }
        } catch (err) {
            setError(err.message || 'Failed to save blog post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLoadDraftIntoEditor = async (draft) => {
        const draftId = draft._id || draft.id;
        setEditingDraftId(draftId);
        setLoading(true);
        try {
            const res = await blogService.getBlogById(draftId);
            const fullDraft = res.blog || res || draft;
            setBlogData({
                title: fullDraft.title || draft.title || '',
                category: fullDraft.category || draft.category || 'Artificial Intelligence',
                tags: Array.isArray(fullDraft.tags) ? fullDraft.tags.join(', ') : fullDraft.tags || draft.tags || '',
                excerpt: fullDraft.excerpt || draft.excerpt || '',
                content: fullDraft.content || draft.content || '',
                status: fullDraft.status || draft.status || 'draft',
            });
            const isAiUrl = (url = '') => {
                if (!url) return false;
                return url.includes('pollinations.ai') || url.includes('generativelanguage') || url.includes('unsplash.com');
            };

            const savedThumbnail = fullDraft.thumbnailUrl || draft.thumbnailUrl || fullDraft.coverImage || draft.coverImage || fullDraft.image || draft.image || null;
            if (savedThumbnail) {
                if (isAiUrl(savedThumbnail)) {
                    setAiThumbnailPreview(savedThumbnail);
                    setManualImagePreview(null);
                    setManualImageFile(null);
                } else {
                    setManualImagePreview(savedThumbnail);
                    setAiThumbnailPreview(null);
                    setManualImageFile(null);
                }
            } else {
                setManualImagePreview(null);
                setManualImageFile(null);
                setAiThumbnailPreview(null);
            }
        } catch (err) {
            console.error('Error fetching full draft details:', err);
            setBlogData({
                title: draft.title || '',
                category: draft.category || 'Artificial Intelligence',
                tags: Array.isArray(draft.tags) ? draft.tags.join(', ') : draft.tags || '',
                excerpt: draft.excerpt || '',
                content: draft.content || '',
                status: draft.status || 'draft',
            });
            const fallbackThumbnail = draft.thumbnailUrl || draft.coverImage || draft.image || null;
            if (fallbackThumbnail) {
                if (fallbackThumbnail.includes('pollinations.ai') || fallbackThumbnail.includes('unsplash.com')) {
                    setAiThumbnailPreview(fallbackThumbnail);
                    setManualImagePreview(null);
                } else {
                    setManualImagePreview(fallbackThumbnail);
                    setAiThumbnailPreview(null);
                }
            } else {
                setManualImagePreview(null);
                setAiThumbnailPreview(null);
            }
        } finally {
            setLoading(false);
            setActiveNavItem('editor');
        }
    };

    const handleDeleteBlog = async (blogId, e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                await blogService.deleteBlog(blogId);
                setDraftsList((prev) => prev.filter((d) => d._id !== blogId));
                setUserBlogs((prev) => prev.filter((b) => b._id !== blogId));
            } catch (err) {
                alert(err.message || 'Failed to delete blog');
            }
        }
    };

    const handlePublishDraftDirectly = async (draftId, e) => {
        e.stopPropagation();
        try {
            await blogService.updateBlog(draftId, { status: 'published' });
            setSuccessMessage('Blog published successfully!');
            setDraftsList((prev) => prev.filter((d) => d._id !== draftId));
            setUserBlogs((prev) => prev.map((b) => (b._id === draftId ? { ...b, status: 'published' } : b)));
            setTimeout(() => {
                navigate('/Home-Feed');
            }, 1200);
        } catch (err) {
            alert(err.message || 'Failed to publish draft');
        }
    };

    const handleCreateNewBlank = () => {
        setEditingDraftId(null);
        setError('');
        setSuccessMessage('');
        setBlogData({
            title: '',
            category: 'Artificial Intelligence',
            tags: '',
            excerpt: '',
            content: '',
            status: 'published',
        });
        setThumbnailFile(null);
        setThumbnailPreview(null);
        setActiveNavItem('editor');
    };

    const handleNavItemClick = (itemId) => {
        if (itemId === 'editor') {
            handleCreateNewBlank();
        } else {
            setActiveNavItem(itemId);
        }
    };

    // Filter dashboard blogs
    const filteredDashboardBlogs = userBlogs.filter((b) => {
        if (dashboardFilter === 'published') return b.status === 'published';
        if (dashboardFilter === 'draft') return b.status === 'draft';
        return true;
    });

    const totalPublishedCount = userBlogs.filter((b) => b.status === 'published').length;
    const totalDraftsCount = userBlogs.filter((b) => b.status === 'draft').length;

    return (
        <div className={styles.createBlogPage}>
            <EditorSidebar
                navItems={navItems}
                activeItem={activeNavItem}
                onNavItemClick={handleNavItemClick}
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <div className={styles.mainArea}>
                <EditorNavbar
                    activeTab={activeNavItem}
                    activeTabLabel={navItems.find((item) => item.id === activeNavItem)?.label || 'Create Blog'}
                    onPublish={() => handleSavePost('published')}
                    onSaveDraft={() => handleSavePost('draft')}
                    loading={loading}
                />

                {(error || successMessage) && (
                    <div style={{ padding: '12px 24px' }}>
                        {error && (
                            <div style={{
                                padding: '10px 16px',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '8px',
                                color: '#ef4444',
                                fontSize: '13px',
                                textAlign: 'center',
                            }}>
                                {error}
                            </div>
                        )}
                        {successMessage && (
                            <div style={{
                                padding: '10px 16px',
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                borderRadius: '8px',
                                color: '#10b981',
                                fontSize: '13px',
                                textAlign: 'center',
                            }}>
                                {successMessage}
                            </div>
                        )}
                    </div>
                )}

                {/* Dashboard Tab */}
                {activeNavItem === 'dashboard' ? (
                    <div style={{ padding: '32px 40px', color: '#f8fafc', overflowY: 'auto', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <div>
                                <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 6px 0' }}>
                                    {user ? `${user.firstName}'s Workspace Dashboard` : 'My Blogs Dashboard'}
                                </h1>
                                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
                                    Overview of all blogs and drafts created by you.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleCreateNewBlank}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '10px 18px',
                                    backgroundColor: '#7c3aed',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}
                            >
                                <Plus size={16} />
                                Create Post
                            </button>
                        </div>

                        {/* Quick Stats Banner */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                            <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <span style={{ fontSize: '13px', color: '#94a3b8' }}>Total Blogs</span>
                                <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#f8fafc', margin: '8px 0 0 0' }}>{userBlogs.length}</h3>
                            </div>
                            <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <span style={{ fontSize: '13px', color: '#10b981' }}>Published Posts</span>
                                <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#10b981', margin: '8px 0 0 0' }}>{totalPublishedCount}</h3>
                            </div>
                            <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <span style={{ fontSize: '13px', color: '#eab308' }}>Saved Drafts</span>
                                <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#eab308', margin: '8px 0 0 0' }}>{totalDraftsCount}</h3>
                            </div>
                        </div>

                        {/* Filter Tabs */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                            {['all', 'published', 'draft'].map((filterKey) => (
                                <button
                                    key={filterKey}
                                    type="button"
                                    onClick={() => setDashboardFilter(filterKey)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        border: '1px solid',
                                        borderColor: dashboardFilter === filterKey ? '#7c3aed' : 'rgba(255, 255, 255, 0.1)',
                                        backgroundColor: dashboardFilter === filterKey ? 'rgba(124, 58, 237, 0.2)' : 'transparent',
                                        color: dashboardFilter === filterKey ? '#c4b5fd' : '#94a3b8',
                                        fontSize: '13px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {filterKey === 'all' ? `All (${userBlogs.length})` : filterKey === 'published' ? `Published (${totalPublishedCount})` : `Drafts (${totalDraftsCount})`}
                                </button>
                            ))}
                        </div>

                        {loadingUserBlogs ? (
                            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
                                Loading your blogs...
                            </div>
                        ) : filteredDashboardBlogs.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '60px 20px',
                                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                                border: '1px dashed #334155',
                                borderRadius: '12px',
                            }}>
                                <LayoutDashboard size={48} style={{ color: '#475569', marginBottom: '16px' }} />
                                <h3 style={{ fontSize: '18px', color: '#e2e8f0', margin: '0 0 8px 0' }}>No Blogs Found</h3>
                                <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '20px' }}>You haven't created any blog posts yet.</p>
                                <button
                                    type="button"
                                    onClick={handleCreateNewBlank}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#7c3aed',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Create Your First Blog
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                                {filteredDashboardBlogs.map((b) => (
                                    <div
                                        key={b._id}
                                        onClick={() => handleLoadDraftIntoEditor(b)}
                                        style={{
                                            backgroundColor: 'rgba(30, 41, 59, 0.6)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            borderRadius: '12px',
                                            padding: '20px',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s, border-color 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = '#7c3aed';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <span style={{
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                textTransform: 'uppercase',
                                                padding: '4px 10px',
                                                backgroundColor: b.status === 'published' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                                                color: b.status === 'published' ? '#10b981' : '#eab308',
                                                borderRadius: '20px',
                                            }}>
                                                {b.status === 'published' ? 'Published' : 'Draft'}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={(e) => handleDeleteBlog(b._id, e)}
                                                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                                                title="Delete blog"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        {b.thumbnailUrl && (
                                            <div style={{ marginBottom: '12px', borderRadius: '8px', overflow: 'hidden', height: '140px' }}>
                                                <img
                                                    src={b.thumbnailUrl}
                                                    alt={b.title || 'Blog Thumbnail'}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}

                                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#f8fafc', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                                            {b.title || 'Untitled Post'}
                                        </h3>

                                        <p style={{
                                            fontSize: '13px',
                                            color: '#94a3b8',
                                            margin: '0 0 16px 0',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}>
                                            {b.excerpt || 'No excerpt available...'}
                                        </p>

                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Calendar size={13} />
                                                {new Date(b.createdAt).toLocaleDateString()}
                                            </span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                {b.status === 'draft' && (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handlePublishDraftDirectly(b._id, e)}
                                                        style={{
                                                            padding: '4px 10px',
                                                            backgroundColor: '#7c3aed',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            fontSize: '11px',
                                                            fontWeight: '600',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        Publish
                                                    </button>
                                                )}
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#c4b5fd' }}>
                                                    <Edit3 size={13} />
                                                    Edit
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : activeNavItem === 'drafts' ? (
                    /* Drafts Tab */
                    <div style={{ padding: '32px 40px', color: '#f8fafc', overflowY: 'auto', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <div>
                                <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 6px 0' }}>Saved Drafts</h1>
                                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>View and manage your saved draft posts.</p>
                            </div>
                            <button
                                type="button"
                                onClick={handleCreateNewBlank}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '10px 18px',
                                    backgroundColor: '#7c3aed',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}
                            >
                                <Plus size={16} />
                                New Post
                            </button>
                        </div>

                        {loadingDrafts ? (
                            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
                                Loading your saved drafts...
                            </div>
                        ) : draftsList.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '60px 20px',
                                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                                border: '1px dashed #334155',
                                borderRadius: '12px',
                            }}>
                                <FileText size={48} style={{ color: '#475569', marginBottom: '16px' }} />
                                <h3 style={{ fontSize: '18px', color: '#e2e8f0', margin: '0 0 8px 0' }}>No Drafts Found</h3>
                                <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '20px' }}>You haven't saved any blog drafts yet.</p>
                                <button
                                    type="button"
                                    onClick={handleCreateNewBlank}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#7c3aed',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Create First Draft
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                                {draftsList.map((draft) => (
                                    <div
                                        key={draft._id}
                                        onClick={() => handleLoadDraftIntoEditor(draft)}
                                        style={{
                                            backgroundColor: 'rgba(30, 41, 59, 0.6)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            borderRadius: '12px',
                                            padding: '20px',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s, border-color 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = '#7c3aed';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <span style={{
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                textTransform: 'uppercase',
                                                padding: '4px 10px',
                                                backgroundColor: 'rgba(234, 179, 8, 0.15)',
                                                color: '#eab308',
                                                borderRadius: '20px',
                                            }}>
                                                Draft
                                            </span>
                                            <button
                                                type="button"
                                                onClick={(e) => handleDeleteBlog(draft._id, e)}
                                                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                                                title="Delete draft"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        {draft.thumbnailUrl && (
                                            <div style={{ marginBottom: '12px', borderRadius: '8px', overflow: 'hidden', height: '140px' }}>
                                                <img
                                                    src={draft.thumbnailUrl}
                                                    alt={draft.title || 'Draft Thumbnail'}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}

                                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#f8fafc', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                                            {draft.title || 'Untitled Draft'}
                                        </h3>

                                        <p style={{
                                            fontSize: '13px',
                                            color: '#94a3b8',
                                            margin: '0 0 16px 0',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}>
                                            {draft.excerpt || 'No description provided...'}
                                        </p>

                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Calendar size={13} />
                                                {new Date(draft.createdAt).toLocaleDateString()}
                                            </span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <button
                                                    type="button"
                                                    onClick={(e) => handlePublishDraftDirectly(draft._id, e)}
                                                    style={{
                                                        padding: '4px 10px',
                                                        backgroundColor: '#7c3aed',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        fontSize: '11px',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Publish
                                                </button>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#c4b5fd' }}>
                                                    <Edit3 size={13} />
                                                    Edit
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    /* Editor Canvas */
                    <div className={styles.editorContainer}>
                        <EditorCanvas
                            blogData={blogData}
                            onChange={setBlogData}
                            onGenerateTitles={handleGenerateTitles}
                            onGenerateContent={handleGenerateContent}
                            onGenerateTags={handleGenerateTags}
                            onGenerateSummary={handleGenerateSummary}
                            onImproveContent={handleImproveContent}
                            aiLoading={aiLoading}
                        />
                        <PostSettingsPanel
                            manualImageFile={manualImageFile}
                            manualImagePreview={manualImagePreview}
                            onManualImageSelect={handleManualImageSelect}
                            onRemoveManualImage={handleRemoveManualImage}
                            aiThumbnailPreview={aiThumbnailPreview}
                            onGenerateThumbnail={handleGenerateThumbnail}
                            onRemoveAiThumbnail={handleRemoveAiThumbnail}
                            onGenerateDraft={handleGenerateDraft}
                            aiLoading={aiLoading}
                        />
                    </div>
                )}
            </div>

            {/* Modal: Title Select Suggestions */}
            {showTitleModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        backgroundColor: '#18181b',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '12px',
                        padding: '24px',
                        maxWidth: '550px',
                        width: '90%',
                        color: '#ffffff'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Sparkles size={20} style={{ color: '#a855f7' }} />
                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>AI Title Suggestions</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowTitleModal(false)}
                                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '16px' }}>
                            Choose one of the generated options to apply it to your blog post title:
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {aiTitles.map((option, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                        setBlogData((prev) => ({ ...prev, title: option }));
                                        setShowTitleModal(false);
                                        setSuccessMessage('AI Title applied successfully!');
                                    }}
                                    style={{
                                        textAlign: 'left',
                                        padding: '12px 16px',
                                        backgroundColor: '#27272a',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '8px',
                                        color: '#f4f4f5',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#a855f7';
                                        e.currentTarget.style.backgroundColor = '#3f3f46';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.backgroundColor = '#27272a';
                                    }}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateBlog;