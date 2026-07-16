import React, { useState } from 'react';
import TopNavbar from '../components/navigation/TopNavbar';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileSearchBar from '../components/profile/ProfileSearchBar';
import ProfileBlogCard from '../components/profile/ProfileBlogCard';
import styles from '../styles/profile/Profile.module.css';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('blogs');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const user = {
        name: 'Alex Chen',
        handle: '@alexchen',
        role: 'AI Researcher',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop',
        bio: 'Exploring the intersection of artificial intelligence and creative writing. Helping brands tell smarter stories through data-driven narratives and editorial precision.',
        location: 'San Francisco, CA',
        website: 'alexchen.dev',
        joined: 'March 2023',
        authProvider: 'Google',
        stats: {
            followers: '12.4K',
            following: '842',
            published: 12,
            drafts: 4,
            bookmarks: 15,
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

    const blogs = [
        {
            id: 1,
            title: 'The Future of Generative AI in Professional...',
            description: 'How neural networks are reshaping the way we work...',
            coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=340&fit=crop',
            status: 'PUBLISHED',
            readTime: '5 min read',
            views: '1.2K views',
            date: '2 days ago',
        },
        {
            id: 2,
            title: 'Mastering the Human-AI Hybrid Content Workflow',
            description: 'A deep dive into the systems and tools I use to augment my...',
            coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=340&fit=crop',
            status: 'PUBLISHED',
            readTime: '8 min read',
            views: '854 views',
            date: '1 week ago',
        },
        {
            id: 3,
            title: 'Ethical Implications of Large Language Models',
            description: 'Navigating the complex landscape of training data...',
            coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop',
            status: 'PUBLISHED',
            readTime: '12 min read',
            views: '3.8K views',
            date: '2 weeks ago',
        },
    ];

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.profilePage}>
            <ProfileSidebar
                user={user}
                navItems={sidebarNavItems}
            />

            <div className={styles.mainContent}>
                <TopNavbar />

                <div className={styles.scrollArea}>
                    <ProfileHeader user={user} />
                    <ProfileStats stats={user.stats} />

                    <div className={styles.contentSection}>
                        <div className={styles.tabsRow}>
                            <ProfileTabs
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                                counts={{
                                    blogs: user.stats.published,
                                    drafts: user.stats.drafts,
                                    bookmarks: user.stats.bookmarks,
                                }}
                            />
                            <ProfileSearchBar
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                sortBy={sortBy}
                                onSortChange={setSortBy}
                            />
                        </div>

                        <div className={styles.blogGrid}>
                            {filteredBlogs.map(blog => (
                                <ProfileBlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>

                        <button className={styles.loadMore}>
                            Load More Articles
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;