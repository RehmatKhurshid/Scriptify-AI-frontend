import React, { useState, useEffect } from 'react';
import TopNavbar from '../../components/navigation/TopNavbar';
import ProfileSidebar from '../../components/profile/ProfileSidebar';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileStats from '../../components/profile/ProfileStats';
import ProfileBlogCard from '../../components/profile/ProfileBlogCard';
import FollowingList from '../../components/profile/FollowingList';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services/blogService';
import { userService } from '../../services/userService';
import styles from '../../styles/profile/Profile.module.css';

import { getAvatarUrl } from '../../utils/avatar';

const Profile = () => {
    const { user: authUser, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('all');

    const [userBlogs, setUserBlogs] = useState([]);
    const [blogCounts, setBlogCounts] = useState({ all: 0, published: 0, drafts: 0 });
    const [loadingBlogs, setLoadingBlogs] = useState(true);

    const [followingUsers, setFollowingUsers] = useState([]);
    const [followerUsers, setFollowerUsers] = useState([]);
    const [followingMap, setFollowingMap] = useState({});
    const [actionLoading, setActionLoading] = useState({});

    const currentUserId = authUser?._id || authUser?.id;

    useEffect(() => {
        if (currentUserId) {
            fetchUserBlogs();
            fetchUserProfileDetails();
        }
    }, [currentUserId]);

    const fetchUserProfileDetails = async () => {
        if (!currentUserId) return;
        try {
            const userData = await userService.getUserById(currentUserId);
            const following = Array.isArray(userData.following) ? userData.following : [];
            const followers = Array.isArray(userData.followers) ? userData.followers : [];

            setFollowingUsers(following);
            setFollowerUsers(followers);

            // Build following map
            const map = {};
            following.forEach((u) => {
                const uId = typeof u === 'object' ? u._id || u.id : u;
                if (uId) map[String(uId)] = true;
            });
            setFollowingMap(map);

            // Keep authUser context up to date
            if (updateUser && authUser) {
                updateUser({
                    _id: currentUserId,
                    id: currentUserId,
                    following: following.map((u) => (typeof u === 'object' ? u._id || u.id : u)),
                    followers: followers.map((u) => (typeof u === 'object' ? u._id || u.id : u)),
                });
            }
        } catch (err) {
            console.error('Failed to fetch user profile details:', err.message);
        }
    };

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

    const handleFollowToggleInProfile = async (targetUserId, isCurrentlyFollowing) => {
        if (actionLoading[targetUserId]) return;

        // Optimistic UI updates
        setActionLoading((prev) => ({ ...prev, [targetUserId]: true }));
        setFollowingMap((prev) => ({ ...prev, [String(targetUserId)]: !isCurrentlyFollowing }));

        if (isCurrentlyFollowing) {
            setFollowingUsers((prev) => prev.filter((u) => String(typeof u === 'object' ? u._id || u.id : u) !== String(targetUserId)));
        }

        try {
            const res = await userService.toggleFollow(targetUserId);
            const serverFollowing = typeof res.isFollowing === 'boolean' ? res.isFollowing : !isCurrentlyFollowing;

            setFollowingMap((prev) => ({ ...prev, [String(targetUserId)]: serverFollowing }));

            // Re-fetch populated details to ensure exact list sync
            fetchUserProfileDetails();
        } catch (err) {
            console.error('Failed to toggle follow status:', err.message);
            // Revert on error
            setFollowingMap((prev) => ({ ...prev, [String(targetUserId)]: isCurrentlyFollowing }));
            fetchUserProfileDetails();
        } finally {
            setActionLoading((prev) => ({ ...prev, [targetUserId]: false }));
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
        avatar: getAvatarUrl(authUser, fullName || 'User'),
        banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop',
        bio: authUser?.bio || '',
        joined: authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'March 2024',
        authProvider: authUser?.googleId ? 'Google' : 'Email/Password',
        stats: {
            followers: followerUsers.length,
            following: followingUsers.length,
            all: blogCounts.all,
            published: blogCounts.published,
            drafts: blogCounts.drafts,
        },
    };

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
        _id: b._id,
        title: b.title || 'Untitled Post',
        description: b.excerpt || (b.content ? b.content.substring(0, 140) + '...' : 'No description provided'),
        content: b.content,
        coverImage: b.thumbnailUrl || null,
        status: (b.status || 'published').toLowerCase(),
        readTime: `${Math.max(1, Math.ceil((b.content ? b.content.trim().split(/\s+/).length : 0) / 200))} min read`,
        views: b.views || 0,
        date: new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        createdAt: b.createdAt,
        likes: b.likes || [],
        likesCount: Array.isArray(b.likes) ? b.likes.length : (b.likesCount || 0),
        commentsCount: typeof b.commentsCount === 'number' ? b.commentsCount : (Array.isArray(b.comments) ? b.comments.length : 0),
        authorName: fullName,
        category: b.category || 'Blog',
    }));

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
                        {activeTab === 'following' ? (
                            <FollowingList
                                users={followingUsers}
                                followingMap={followingMap}
                                onFollowToggle={handleFollowToggleInProfile}
                                actionLoading={actionLoading}
                                type="following"
                            />
                        ) : activeTab === 'followers' ? (
                            <FollowingList
                                users={followerUsers}
                                followingMap={followingMap}
                                onFollowToggle={handleFollowToggleInProfile}
                                actionLoading={actionLoading}
                                type="followers"
                            />
                        ) : loadingBlogs ? (
                            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
                                Loading your articles...
                            </div>
                        ) : formattedBlogs.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
                                No articles found in this category.
                            </div>
                        ) : (
                            <div className={styles.blogGrid}>
                                {formattedBlogs.map(blog => (
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