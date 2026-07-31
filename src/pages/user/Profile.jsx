import React, { useState, useEffect } from 'react';
import TopNavbar from '../../components/navigation/TopNavbar';
import ProfileSidebar from '../../components/profile/ProfileSidebar';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileStats from '../../components/profile/ProfileStats';
import ProfileTabs from '../../components/profile/ProfileTabs';
import ProfileSearchBar from '../../components/profile/ProfileSearchBar';
import ProfileBlogCard from '../../components/profile/ProfileBlogCard';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services/blogService';
import styles from '../../styles/profile/Profile.module.css';

const Profile = () => {
    const { user: authUser, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const [userBlogs, setUserBlogs] = useState([]);
    const [blogCounts, setBlogCounts] = useState({ all: 0, published: 0, drafts: 0 });
    const [loadingBlogs, setLoadingBlogs] = useState(true);

    useEffect(() => {
        if (authUser) {
            fetchUserBlogs();
        }
    }, [authUser]);

    const fetchUserBlogs = async () => {
        setLoadingBlogs(true);
        try {
            const data = await blogService.getMyBlogs({ limit: 200 });
            const blogs = data.blogs || [];
            setUserBlogs(blogs);

            if (data.counts) {
                setBlogCounts(data.counts);
            } else {
                const pub = blogs.filter((b) => b.status === 'published').length;
                const drf = blogs.filter((b) => b.status === 'draft').length;
                setBlogCounts({ all: blogs.length, published: pub, drafts: drf });
            }

            // Auto-upgrade local state role if user has created a blog
            if (blogs.length > 0 && authUser?.role === 'reader' && updateUser) {
                updateUser({ role: 'blogger' });
            }
        } catch (err) {
            console.error('Failed to fetch user profile blogs:', err.message);
        } finally {
            setLoadingBlogs(false);
        }
    };

    const publishedBlogs = userBlogs.filter((b) => b.status === 'published');
    const draftBlogs = userBlogs.filter((b) => b.status === 'draft');

    const fullName = authUser ? `${authUser.firstName || ''} ${authUser.lastName || ''}`.trim() : 'Logged User';
    const computedRole = (authUser?.role || (userBlogs.length > 0 ? 'blogger' : 'reader')).toUpperCase();

    const user = {
        name: fullName || 'Scriptify Author',
        handle: `@${(authUser?.firstName || 'user').toLowerCase()}`,
        role: computedRole,
        avatar: authUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName || 'User')}`,
        banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop',
        bio: authUser?.bio || '',
        joined: authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'March 2024',
        authProvider: authUser?.googleId ? 'Google' : 'Email/Password',
        stats: {
            followers: authUser?.followers?.length || 0,
            following: authUser?.following?.length || 0,
            all: blogCounts.all,
            published: blogCounts.published,
            drafts: blogCounts.drafts,
        },
    };

    const sidebarNavItems = [
        { id: 'feed', label: 'My Feed', icon: 'Rss' },
        { id: 'trending', label: 'Trending', icon: 'TrendingUp' },
        { id: 'library', label: 'Library', icon: 'BookOpen' },
        { id: 'workspace', label: 'AI Workspace', icon: 'Sparkles' },
        { id: 'profile', label: 'Profile', icon: 'User', active: true },
        { id: 'settings', label: 'Settings', icon: 'Settings' },
    ];

    let currentTabBlogs = userBlogs;
    if (activeTab === 'published' || activeTab === 'blogs') {
        currentTabBlogs = publishedBlogs;
    } else if (activeTab === 'drafts') {
        currentTabBlogs = draftBlogs;
    } else if (activeTab === 'all') {
        currentTabBlogs = userBlogs;
    }

    const formattedBlogs = currentTabBlogs.map((b) => ({
        id: b._id,
        title: b.title || 'Untitled Post',
        description: b.excerpt || (b.content ? b.content.substring(0, 140) + '...' : 'No description provided'),
        coverImage: b.thumbnailUrl || null,
        status: (b.status || 'published').toLowerCase(),
        readTime: `${Math.max(1, Math.ceil((b.content ? b.content.trim().split(/\s+/).length : 0) / 200))} min read`,
        views: `${b.views || 0} views`,
        date: new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));

    const filteredBlogs = formattedBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDeleteBlog = async (blogId) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;
        try {
            await blogService.deleteBlog(blogId);
            fetchUserBlogs();
        } catch (err) {
            console.error('Failed to delete blog:', err.message);
        }
    };

    const handlePublishDraft = async (blogId) => {
        try {
            await blogService.publishBlog(blogId);
            fetchUserBlogs();
        } catch (err) {
            console.error('Failed to publish draft:', err.message);
        }
    };

    return (
        <div className={styles.profilePage}>
            <ProfileSidebar user={user} />

            <div className={styles.mainContent}>
                <TopNavbar />

                <div className={styles.scrollArea}>
                    <ProfileHeader user={user} />
                    <ProfileStats stats={user.stats} activeTab={activeTab} onTabChange={setActiveTab} />

                    <div className={styles.contentSection}>
                        <div className={styles.tabsRow}>
                            <ProfileTabs
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                                counts={{
                                    all: user.stats.all,
                                    published: user.stats.published,
                                    drafts: user.stats.drafts,
                                }}
                            />
                            <ProfileSearchBar
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                sortBy={sortBy}
                                onSortChange={setSortBy}
                            />
                        </div>

                        {loadingBlogs ? (
                            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
                                Loading your articles...
                            </div>
                        ) : filteredBlogs.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
                                No articles found in this category.
                            </div>
                        ) : (
                            <div className={styles.blogGrid}>
                                {filteredBlogs.map(blog => (
                                    <ProfileBlogCard
                                        key={blog.id}
                                        blog={blog}
                                        onDelete={handleDeleteBlog}
                                        onPublish={handlePublishDraft}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;