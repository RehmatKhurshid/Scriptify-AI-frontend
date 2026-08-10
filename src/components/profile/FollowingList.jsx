import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUserCheck, FiUserPlus, FiUsers, FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import styles from '../../styles/profile/FollowingList.module.css';

const FollowingList = ({
    users = [],
    followingMap = {},
    onFollowToggle,
    actionLoading = {},
    searchQuery = '',
    type = 'following', // 'following' | 'followers'
}) => {
    const navigate = useNavigate();
    const [hoveredUser, setHoveredUser] = useState(null);

    const filteredUsers = users.filter((u) => {
        if (!u) return false;
        const fullName = `${u.firstName || ''} ${u.lastName || ''}`.toLowerCase();
        const handle = `@${(u.firstName || 'user').toLowerCase()}`;
        const bio = (u.bio || '').toLowerCase();
        const q = searchQuery.toLowerCase().trim();

        return !q || fullName.includes(q) || handle.includes(q) || bio.includes(q);
    });

    const isFollowingTab = type === 'following';

    if (users.length === 0 || filteredUsers.length === 0) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                    <FiUsers />
                </div>
                <h3 className={styles.emptyTitle}>
                    {users.length === 0
                        ? isFollowingTab
                            ? "You aren't following anyone yet"
                            : "You don't have any followers yet"
                        : "No users found matching search"}
                </h3>
                <p className={styles.emptyText}>
                    {users.length === 0
                        ? isFollowingTab
                            ? "Discover top creators, authors, and fellow writers on Scriptify AI to see their latest posts."
                            : "Share your articles and engage with the community to grow your audience."
                        : "Try searching with a different name or handle."}
                </p>
                {users.length === 0 && isFollowingTab && (
                    <button
                        className={styles.discoverBtn}
                        onClick={() => navigate('/home-feed')}
                    >
                        <FiUserPlus size={16} />
                        <span>Discover People</span>
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {filteredUsers.map((u) => {
                    const userId = u._id;
                    const fullName = `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Scriptify Author';
                    const handle = `@${(u.firstName || 'user').toLowerCase()}`;
                    const avatar = u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}`;
                    const role = (u.role || 'blogger').toUpperCase();

                    // Check if current user is following this user
                    const isFollowing = followingMap[userId] !== undefined ? followingMap[userId] : true;
                    const isSubmitting = !!actionLoading[userId];
                    const isHovered = hoveredUser === userId;

                    return (
                        <div key={userId} className={styles.userCard}>
                            <div
                                className={styles.userMainInfo}
                                onClick={() => navigate(`/profile/${userId}`)}
                            >
                                <div className={styles.avatarWrapper}>
                                    <img src={avatar} alt={fullName} className={styles.avatarImg} />
                                </div>

                                <div className={styles.userDetails}>
                                    <div className={styles.nameRow}>
                                        <span className={styles.userName}>{fullName}</span>
                                        <span className={styles.roleBadge}>{role}</span>
                                    </div>
                                    <span className={styles.userHandle}>{handle}</span>
                                    {u.bio && <p className={styles.userBio}>{u.bio}</p>}
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
                                <div className={styles.actionGroup}>
                                    <button
                                        className={styles.viewProfileBtn}
                                        onClick={() => navigate(`/profile/${userId}`)}
                                        title="View Profile"
                                    >
                                        <FiExternalLink size={14} />
                                        <span>View</span>
                                    </button>

                                    <button
                                        className={`${styles.followBtn} ${
                                            isFollowing ? styles.followingState : styles.notFollowingState
                                        }`}
                                        onClick={() => onFollowToggle && onFollowToggle(userId, isFollowing)}
                                        disabled={isSubmitting}
                                        onMouseEnter={() => setHoveredUser(userId)}
                                        onMouseLeave={() => setHoveredUser(null)}
                                    >
                                        {isSubmitting ? (
                                            <FiRefreshCw className={styles.spinner} size={14} />
                                        ) : isFollowing ? (
                                            <>
                                                <FiUserCheck size={14} />
                                                <span>{isHovered ? 'Unfollow' : 'Following'}</span>
                                            </>
                                        ) : (
                                            <>
                                                <FiUserPlus size={14} />
                                                <span>Follow</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FollowingList;
