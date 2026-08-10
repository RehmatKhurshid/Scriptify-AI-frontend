import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUserPlus, FiUserCheck, FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import styles from '../../styles/home-feed/DiscoverSidebar.module.css';

const DiscoverSidebar = () => {
    const navigate = useNavigate();
    const { user: authUser, updateUser } = useAuth();

    const [users, setUsers] = useState([]);
    const [followingMap, setFollowingMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState({});

    const currentUserId = authUser?._id || authUser?.id;

    useEffect(() => {
        if (currentUserId) {
            fetchSuggestedUsers();
        }
    }, [currentUserId]);

    const fetchSuggestedUsers = async () => {
        setLoading(true);
        try {
            const [data, currentUserData] = await Promise.all([
                userService.getUsers({ limit: 15 }),
                currentUserId ? userService.getUserById(currentUserId).catch(() => null) : Promise.resolve(null),
            ]);

            const allUsers = data.users || [];

            // Filter out logged-in user
            const suggestions = allUsers.filter((u) => String(u._id) !== String(currentUserId));

            // Get fresh following array from backend if available, fallback to authUser state
            const rawFollowing = currentUserData?.following || authUser?.following || [];
            const currentFollowingIds = rawFollowing.map((f) => String(typeof f === 'object' ? f._id || f.id : f));

            const map = {};
            suggestions.forEach((u) => {
                const uId = String(u._id);
                const isFollowed = currentFollowingIds.includes(uId) ||
                    (Array.isArray(u.followers) && u.followers.some((f) => String(typeof f === 'object' ? f._id || f.id : f) === String(currentUserId)));
                map[u._id] = !!isFollowed;
            });

            setUsers(suggestions);
            setFollowingMap(map);

            // Sync authUser in AuthContext with fresh data
            if (currentUserData && updateUser) {
                updateUser({
                    _id: currentUserId,
                    id: currentUserId,
                    following: currentFollowingIds,
                });
            }
        } catch (err) {
            console.error('Failed to fetch suggested users:', err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFollowToggle = async (e, targetUserId) => {
        e.stopPropagation();
        if (actionLoading[targetUserId]) return;

        const isCurrentlyFollowing = !!followingMap[targetUserId];

        // Optimistic UI update
        setFollowingMap((prev) => ({
            ...prev,
            [targetUserId]: !isCurrentlyFollowing,
        }));

        setActionLoading((prev) => ({ ...prev, [targetUserId]: true }));

        try {
            const res = await userService.toggleFollow(targetUserId);

            const serverFollowing = typeof res.isFollowing === 'boolean'
                ? res.isFollowing
                : !isCurrentlyFollowing;

            setFollowingMap((prev) => ({
                ...prev,
                [targetUserId]: serverFollowing,
            }));

            // Sync with AuthContext user object if available
            if (updateUser && authUser) {
                const prevFollowing = Array.isArray(authUser.following)
                    ? authUser.following.map((f) => String(typeof f === 'object' ? f._id || f.id : f))
                    : [];
                let updatedFollowing;
                if (serverFollowing) {
                    updatedFollowing = [...new Set([...prevFollowing, String(targetUserId)])];
                } else {
                    updatedFollowing = prevFollowing.filter((id) => id !== String(targetUserId));
                }

                updateUser({
                    _id: currentUserId,
                    id: currentUserId,
                    following: updatedFollowing,
                });
            }
        } catch (err) {
            console.error('Failed to toggle follow status:', err.message);
            // Revert optimistic update on error
            setFollowingMap((prev) => ({
                ...prev,
                [targetUserId]: isCurrentlyFollowing,
            }));
        } finally {
            setActionLoading((prev) => ({ ...prev, [targetUserId]: false }));
        }
    };

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
    };

    if (!authUser) return null;

    return (
        <aside className={styles.sidebarContainer}>
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    <FiUserPlus className={styles.titleIcon} />
                    <div>
                        <h3 className={styles.title}>Discover People</h3>
                        <p className={styles.subtitle}>Top creators & authors</p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className={styles.loadingState}>
                    <FiRefreshCw className={styles.spinner} size={20} />
                    <p style={{ marginTop: '8px' }}>Finding authors...</p>
                </div>
            ) : users.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No new user suggestions at the moment.</p>
                </div>
            ) : (
                <div className={styles.userList}>
                    {users.slice(0, 6).map((u) => {
                        const fullName = `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Author';
                        const avatar = u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}`;
                        const isFollowing = !!followingMap[u._id];
                        const isSubmitting = !!actionLoading[u._id];

                        const followerCount = Array.isArray(u.followers) ? u.followers.length : 0;
                        const articlesCount = typeof u.publishedBlogsCount === 'number' ? u.publishedBlogsCount : 0;

                        return (
                            <div key={u._id} className={styles.userCard}>
                                <div className={styles.userInfoGroup} onClick={() => handleUserClick(u._id)}>
                                    <div className={styles.avatarWrapper}>
                                        <img src={avatar} alt={fullName} className={styles.avatarImg} />
                                    </div>
                                    <div className={styles.userDetails}>
                                        <span className={styles.userName}>{fullName}</span>
                                        <span className={styles.userHandle}>@{u.firstName ? u.firstName.toLowerCase() : 'user'}</span>
                                        <span className={styles.userMeta}>
                                            {articlesCount > 0 ? `${articlesCount} ${articlesCount === 1 ? 'article' : 'articles'}` : (u.role ? u.role.charAt(0).toUpperCase() + u.role.slice(1) : 'Author')} • {followerCount} {followerCount === 1 ? 'follower' : 'followers'}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className={`${styles.followBtn} ${isFollowing ? styles.followBtnFollowing : styles.followBtnNotFollowing}`}
                                    onClick={(e) => handleFollowToggle(e, u._id)}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <FiRefreshCw className={styles.spinner} size={12} />
                                    ) : isFollowing ? (
                                        <>
                                            <FiUserCheck size={13} />
                                            <span>Following</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiUserPlus size={13} />
                                            <span>Follow</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </aside>
    );
};

export default DiscoverSidebar;
