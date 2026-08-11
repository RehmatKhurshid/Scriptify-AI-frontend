import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiCalendar, FiUserPlus, FiUserCheck, FiRefreshCw, FiEdit, FiBookOpen, FiClock, FiUsers } from 'react-icons/fi';
import TopNavbar from '../../components/navigation/TopNavbar';
import BlogDetailModal from '../../components/blog/BlogDetailModal';
import BlogInteractionBar from '../../components/common/BlogInteractionBar';
import FollowingList from '../../components/profile/FollowingList';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { blogService } from '../../services/blogService';
import styles from '../../styles/profile/UserProfile.module.css';

import { getAvatarUrl } from '../../utils/avatar';

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: authUser, updateUser } = useAuth();

    const [profileUser, setProfileUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [actionLoading, setActionLoading] = useState(false);

    // Active Tab state: 'blogs' | 'followers' | 'following'
    const [activeTab, setActiveTab] = useState('blogs');

    // Following / followers lists and auth map
    const [authFollowingMap, setAuthFollowingMap] = useState({});
    const [actionLoadingMap, setActionLoadingMap] = useState({});

    // Blog modal state
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Blog likes tracking map
    const [blogLikesState, setBlogLikesState] = useState({});

    const currentUserId = authUser?._id || authUser?.id;
    const isOwnProfile = String(currentUserId) === String(id);

    useEffect(() => {
        if (id) {
            fetchUserProfileAndBlogs();
        }
    }, [id, currentUserId]);

    const fetchUserProfileAndBlogs = async () => {
        setLoading(true);
        setError(null);
        try {
            const promises = [
                userService.getUserById(id),
                blogService.getAllBlogs({ author: id }),
            ];

            if (currentUserId) {
                promises.push(userService.getUserById(currentUserId).catch(() => null));
            }

            const [userData, blogsData, currentUserData] = await Promise.all(promises);

            setProfileUser(userData);

            const rawBlogs = blogsData.blogs || [];
            setBlogs(rawBlogs);

            // Initialize like state for blogs
            const initialLikesMap = {};
            rawBlogs.forEach((b) => {
                const likes = Array.isArray(b.likes) ? b.likes : [];
                const isLiked = currentUserId
                    ? likes.some((uId) => String(typeof uId === 'object' ? uId._id || uId.id : uId) === String(currentUserId))
                    : false;
                initialLikesMap[b._id] = {
                    likesCount: typeof b.likesCount === 'number' ? b.likesCount : likes.length,
                    isLiked,
                    commentsCount: typeof b.commentsCount === 'number' ? b.commentsCount : 0,
                };
            });
            setBlogLikesState(initialLikesMap);

            // Follow state calculation for current profile user
            const followers = Array.isArray(userData.followers) ? userData.followers : [];
            setFollowersCount(followers.length);

            const currentlyFollowed = followers.some((f) => {
                const fId = String(typeof f === 'object' ? f._id || f.id : f);
                return fId === String(currentUserId);
            });

            setIsFollowing(currentlyFollowed);

            // Build auth user following map for list actions
            const rawAuthFollowing = currentUserData?.following || authUser?.following || [];
            const authFollowingIds = rawAuthFollowing.map((f) => String(typeof f === 'object' ? f._id || f.id : f));

            const map = {};
            authFollowingIds.forEach((fId) => {
                map[fId] = true;
            });
            setAuthFollowingMap(map);

            // Sync auth context if fresh user data came back
            if (currentUserData && updateUser) {
                updateUser({
                    _id: currentUserId,
                    id: currentUserId,
                    following: authFollowingIds,
                });
            }
        } catch (err) {
            console.error('Failed to load user profile:', err);
            setError(err.message || 'Unable to load user profile.');
        } finally {
            setLoading(false);
        }
    };

    const handleFollowToggleHeader = async () => {
        if (actionLoading || isOwnProfile || !authUser) return;

        const previousState = isFollowing;
        const previousCount = followersCount;

        // Optimistic UI update
        setIsFollowing(!previousState);
        setFollowersCount(previousState ? Math.max(0, previousCount - 1) : previousCount + 1);
        setActionLoading(true);

        try {
            const res = await userService.toggleFollow(id);
            const serverFollowing = typeof res.isFollowing === 'boolean' ? res.isFollowing : !previousState;
            setIsFollowing(serverFollowing);

            setAuthFollowingMap((prev) => ({ ...prev, [String(id)]: serverFollowing }));

            if (updateUser && authUser) {
                const prevFollowing = Array.isArray(authUser.following)
                    ? authUser.following.map((f) => String(typeof f === 'object' ? f._id || f.id : f))
                    : [];
                let updatedFollowing;
                if (serverFollowing) {
                    updatedFollowing = [...new Set([...prevFollowing, String(id)])];
                } else {
                    updatedFollowing = prevFollowing.filter((fId) => fId !== String(id));
                }
                updateUser({
                    _id: currentUserId,
                    id: currentUserId,
                    following: updatedFollowing,
                });
            }
        } catch (err) {
            console.error('Failed to update follow status:', err.message);
            setIsFollowing(previousState);
            setFollowersCount(previousCount);
        } finally {
            setActionLoading(false);
        }
    };

    const handleFollowToggleInList = async (targetUserId, isCurrentlyFollowing) => {
        if (actionLoadingMap[targetUserId] || !authUser) return;

        setActionLoadingMap((prev) => ({ ...prev, [targetUserId]: true }));
        setAuthFollowingMap((prev) => ({ ...prev, [String(targetUserId)]: !isCurrentlyFollowing }));

        if (String(targetUserId) === String(id)) {
            setIsFollowing(!isCurrentlyFollowing);
            setFollowersCount((prev) => (isCurrentlyFollowing ? Math.max(0, prev - 1) : prev + 1));
        }

        try {
            const res = await userService.toggleFollow(targetUserId);
            const serverFollowing = typeof res.isFollowing === 'boolean' ? res.isFollowing : !isCurrentlyFollowing;

            setAuthFollowingMap((prev) => ({ ...prev, [String(targetUserId)]: serverFollowing }));

            if (updateUser && authUser) {
                const prevFollowing = Array.isArray(authUser.following)
                    ? authUser.following.map((f) => String(typeof f === 'object' ? f._id || f.id : f))
                    : [];
                let updatedFollowing;
                if (serverFollowing) {
                    updatedFollowing = [...new Set([...prevFollowing, String(targetUserId)])];
                } else {
                    updatedFollowing = prevFollowing.filter((fId) => fId !== String(targetUserId));
                }
                updateUser({
                    _id: currentUserId,
                    id: currentUserId,
                    following: updatedFollowing,
                });
            }
        } catch (err) {
            console.error('Failed to toggle follow status:', err.message);
            setAuthFollowingMap((prev) => ({ ...prev, [String(targetUserId)]: isCurrentlyFollowing }));
            if (String(targetUserId) === String(id)) {
                setIsFollowing(isCurrentlyFollowing);
            }
        } finally {
            setActionLoadingMap((prev) => ({ ...prev, [targetUserId]: false }));
        }
    };

    const handleBlogLikeToggle = async (blogId) => {
        if (!authUser) {
            if (window.confirm('You must be signed in to like posts. Would you like to sign in now?')) {
                navigate('/signin');
            }
            return;
        }

        const current = blogLikesState[blogId] || { isLiked: false, likesCount: 0, commentsCount: 0 };
        const nextLiked = !current.isLiked;
        const nextCount = current.isLiked ? Math.max(0, current.likesCount - 1) : current.likesCount + 1;

        setBlogLikesState((prev) => ({
            ...prev,
            [blogId]: { ...current, isLiked: nextLiked, likesCount: nextCount },
        }));

        try {
            const res = await blogService.toggleLike(blogId);
            setBlogLikesState((prev) => ({
                ...prev,
                [blogId]: {
                    ...current,
                    isLiked: res.liked,
                    likesCount: typeof res.likesCount === 'number' ? res.likesCount : nextCount,
                },
            }));
        } catch (err) {
            console.error('Failed to toggle blog like:', err.message);
            setBlogLikesState((prev) => ({
                ...prev,
                [blogId]: current,
            }));
        }
    };

    const handleOpenBlogModal = (b) => {
        const authorName = `${profileUser?.firstName || ''} ${profileUser?.lastName || ''}`.trim() || 'Author';
        const likeInfo = blogLikesState[b._id] || {};

        setSelectedBlog({
            _id: b._id,
            id: b._id,
            title: b.title,
            content: b.content,
            excerpt: b.excerpt,
            category: b.category,
            author: authorName,
            authorAvatar: profileUser?.avatar,
            createdAt: b.createdAt,
            readTime: b.readTime,
            thumbnailUrl: b.thumbnailUrl,
            likesCount: likeInfo.likesCount !== undefined ? likeInfo.likesCount : (b.likesCount || 0),
            commentsCount: likeInfo.commentsCount !== undefined ? likeInfo.commentsCount : (b.commentsCount || 0),
            isLiked: likeInfo.isLiked || false,
            likes: b.likes || [],
        });
        setIsModalOpen(true);
    };

    if (loading) {
        return (
            <div className={styles.pageContainer}>
                <TopNavbar />
                <div className={styles.loadingContainer}>
                    <FiRefreshCw className={styles.spinner} size={32} />
                    <p style={{ marginTop: '12px' }}>Loading public profile...</p>
                </div>
            </div>
        );
    }

    if (error || !profileUser) {
        return (
            <div className={styles.pageContainer}>
                <TopNavbar />
                <div className={styles.errorContainer}>
                    <h3>User Profile Not Found</h3>
                    <p>{error || 'The requested user profile does not exist.'}</p>
                    <button
                        onClick={() => navigate('/home-feed')}
                        style={{
                            marginTop: '16px',
                            padding: '8px 20px',
                            borderRadius: '8px',
                            backgroundColor: '#6366f1',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Back to Home Feed
                    </button>
                </div>
            </div>
        );
    }

    const fullName = `${profileUser.firstName || ''} ${profileUser.lastName || ''}`.trim() || 'Author';
    const avatar = getAvatarUrl(profileUser, fullName);
    const joinedDate = profileUser.createdAt ? new Date(profileUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently';

    const followingUsers = Array.isArray(profileUser.following) ? profileUser.following : [];
    const followerUsers = Array.isArray(profileUser.followers) ? profileUser.followers : [];
    const followingCount = followingUsers.length;

    return (
        <div className={styles.pageContainer}>
            <TopNavbar />

            <div className={styles.mainContent}>
                {/* Header Card */}
                <div className={styles.headerCard}>
                    <div className={styles.banner}>
                        <div className={styles.bannerOverlay} />
                    </div>

                    <div className={styles.profileInfoBar}>
                        <div className={styles.topRow}>
                            <div className={styles.avatarWrapper}>
                                <img src={avatar} alt={fullName} className={styles.avatarImg} />
                            </div>

                            <div className={styles.actionArea}>
                                {isOwnProfile ? (
                                    <Link to="/edit-profile" className={styles.editBtn}>
                                        <FiEdit size={16} />
                                        <span>Edit Profile</span>
                                    </Link>
                                ) : (
                                    <button
                                        className={`${styles.followBtn} ${isFollowing ? styles.followBtnFollowing : styles.followBtnNotFollowing}`}
                                        onClick={handleFollowToggleHeader}
                                        disabled={actionLoading}
                                    >
                                        {actionLoading ? (
                                            <FiRefreshCw className={styles.spinner} size={16} />
                                        ) : isFollowing ? (
                                            <>
                                                <FiUserCheck size={16} />
                                                <span>Following</span>
                                            </>
                                        ) : (
                                            <>
                                                <FiUserPlus size={16} />
                                                <span>Follow</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className={styles.detailsGroup}>
                            <div className={styles.nameRow}>
                                <h1 className={styles.userName}>{fullName}</h1>
                                {profileUser.role && (
                                    <span className={styles.roleBadge}>{profileUser.role}</span>
                                )}
                            </div>

                            <p className={styles.userHandle}>@{profileUser.firstName ? profileUser.firstName.toLowerCase() : 'user'}</p>

                            {profileUser.bio ? (
                                <p className={styles.bio}>{profileUser.bio}</p>
                            ) : (
                                <p className={styles.bio} style={{ color: '#64748b', fontStyle: 'italic' }}>
                                    No bio provided.
                                </p>
                            )}

                            <div className={styles.metaRow}>
                                <span className={styles.metaItem}>
                                    <FiCalendar size={14} />
                                    Joined {joinedDate}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Bar (Clickable tabs) */}
                <div className={styles.statsBar}>
                    <div
                        className={`${styles.statCard} ${activeTab === 'followers' ? styles.activeStatCard : ''}`}
                        onClick={() => setActiveTab('followers')}
                    >
                        <span className={styles.statLabel}>Followers</span>
                        <span className={styles.statValue} style={{ color: '#a855f7' }}>{followersCount}</span>
                    </div>
                    <div
                        className={`${styles.statCard} ${activeTab === 'following' ? styles.activeStatCard : ''}`}
                        onClick={() => setActiveTab('following')}
                    >
                        <span className={styles.statLabel}>Following</span>
                        <span className={styles.statValue} style={{ color: '#3b82f6' }}>{followingCount}</span>
                    </div>
                    <div
                        className={`${styles.statCard} ${activeTab === 'blogs' ? styles.activeStatCard : ''}`}
                        onClick={() => setActiveTab('blogs')}
                    >
                        <span className={styles.statLabel}>Published Blogs</span>
                        <span className={styles.statValue} style={{ color: '#10b981' }}>{blogs.length}</span>
                    </div>
                </div>

                {/* Tab Content Section */}
                <div>
                    {activeTab === 'followers' ? (
                        <div>
                            <h2 className={styles.sectionTitle}>
                                <FiUsers size={20} style={{ color: '#a855f7' }} />
                                Followers of {fullName}
                            </h2>
                            <FollowingList
                                users={followerUsers}
                                followingMap={authFollowingMap}
                                onFollowToggle={handleFollowToggleInList}
                                actionLoading={actionLoadingMap}
                                type="followers"
                            />
                        </div>
                    ) : activeTab === 'following' ? (
                        <div>
                            <h2 className={styles.sectionTitle}>
                                <FiUsers size={20} style={{ color: '#3b82f6' }} />
                                Creators followed by {fullName}
                            </h2>
                            <FollowingList
                                users={followingUsers}
                                followingMap={authFollowingMap}
                                onFollowToggle={handleFollowToggleInList}
                                actionLoading={actionLoadingMap}
                                type="following"
                            />
                        </div>
                    ) : (
                        <div>
                            <h2 className={styles.sectionTitle}>
                                <FiBookOpen size={20} style={{ color: '#8b5cf6' }} />
                                Published Articles
                            </h2>

                            {blogs.length === 0 ? (
                                <div className={styles.emptyBlogs}>
                                    <p>{fullName} has not published any blogs yet.</p>
                                </div>
                            ) : (
                                <div className={styles.blogsGrid}>
                                    {blogs.map((b) => {
                                        const wordCount = b.content ? b.content.trim().split(/\s+/).filter(Boolean).length : 0;
                                        const calculatedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
                                        const date = b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently';
                                        const excerpt = b.excerpt || (b.content ? b.content.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...' : 'No description provided.');

                                        const likeInfo = blogLikesState[b._id] || { isLiked: false, likesCount: 0, commentsCount: 0 };

                                        return (
                                            <div
                                                key={b._id}
                                                className={styles.blogCard}
                                                onClick={() => handleOpenBlogModal(b)}
                                            >
                                                {b.thumbnailUrl && (
                                                    <img src={b.thumbnailUrl} alt={b.title} className={styles.blogImage} />
                                                )}
                                                <div className={styles.blogBody}>
                                                    <span className={styles.blogCategory}>{b.category || 'Editorial'}</span>
                                                    <h3 className={styles.blogTitle}>{b.title}</h3>
                                                    <p className={styles.blogExcerpt}>{excerpt}</p>

                                                    <div className={styles.blogMeta}>
                                                        <span>{date}</span>
                                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                            <FiClock size={12} />
                                                            {calculatedReadTime}
                                                        </span>
                                                    </div>

                                                    <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                                                        <BlogInteractionBar
                                                            likesCount={likeInfo.likesCount}
                                                            commentsCount={likeInfo.commentsCount}
                                                            isLiked={likeInfo.isLiked}
                                                            onLikeToggle={() => handleBlogLikeToggle(b._id)}
                                                            onCommentToggle={() => handleOpenBlogModal(b)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for full blog view */}
            {selectedBlog && (
                <BlogDetailModal
                    blog={selectedBlog}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedBlog(null);
                    }}
                    onLikeChange={(liked, count) => {
                        setBlogLikesState((prev) => ({
                            ...prev,
                            [selectedBlog._id]: {
                                ...(prev[selectedBlog._id] || {}),
                                isLiked: liked,
                                likesCount: count,
                            },
                        }));
                    }}
                    onCommentCountChange={(count) => {
                        setBlogLikesState((prev) => ({
                            ...prev,
                            [selectedBlog._id]: {
                                ...(prev[selectedBlog._id] || {}),
                                commentsCount: count,
                            },
                        }));
                    }}
                />
            )}
        </div>
    );
};

export default UserProfile;
