import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileLayout from '../components/layout/ProfileLayout';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileBlogCard from '../components/profile/ProfileBlogCard';
import styles from '../styles/profile/Profile.module.css';

const blogs = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
        category: 'Tech',
        date: 'Oct 12',
        title: 'The Future of Generative UI in Web Design',
        excerpt: 'Exploring how AI models are fundamentally changing the way we structure and render...',
        readTime: '5 min read',
        bookmarked: false,
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
        category: 'Productivity',
        date: 'Sep 20',
        title: 'Mastering Deep Work in an AI Era',
        excerpt: 'Strategies to maintain focus and leverage intelligent tools without losing your creative...',
        readTime: '8 min read',
        bookmarked: true,
    },
];

const Profile = () => {
    const [activeTab, setActiveTab] = useState('blogs');
    const navigate = useNavigate();

    const handleTabChange = (tabId) => {
        if (tabId === 'bookmarks') {
            navigate('/bookmarks');
        } else {
            setActiveTab(tabId);
        }
    };

    return (
        <ProfileLayout>
            <ProfileHeader />
            <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {activeTab === 'blogs' && (
                <div className={styles.grid}>
                    {blogs.map((blog) => (
                        <ProfileBlogCard key={blog.id} {...blog} />
                    ))}
                </div>
            )}

            {activeTab === 'drafts' && (
                <div className={styles.emptyState}>
                    <p>No drafts yet.</p>
                </div>
            )}

            {activeTab === 'bookmarks' && (
                <div className={styles.emptyState}>
                    <p>No bookmarks yet.</p>
                </div>
            )}
        </ProfileLayout>
    );
};

export default Profile;