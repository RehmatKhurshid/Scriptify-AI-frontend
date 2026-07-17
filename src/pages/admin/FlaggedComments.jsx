import React, { useState } from 'react';
import FlaggedSidebar from '../../components/admin/flagged-comments/FlaggedSidebar';
import FlaggedTopNavbar from '../../components/admin/flagged-comments/FlaggedTopNavbar';
import FlaggedCommentCard from '../../components/admin/flagged-comments/FlaggedCommentCard';
import FlaggedEmptyState from '../../components/admin/flagged-comments/FlaggedEmptyState';
import styles from '../../styles/admin/flagged-comments/FlaggedComments.module.css';

const FlaggedComments = () => {
    const [comments, setComments] = useState([
        {
            id: 1,
            user: {
                name: 'Alex Mercer',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
                id: '#U-8924',
                priorFlags: 3,
            },
            postTitle: 'The Future of AGI Models',
            postLink: '#',
            reportedTime: '10 mins ago',
            status: 'Pending Review',
            content: '"This article is complete garbage written by a clueless idiot. Anyone who believes this nonsense should jump off a bridge. You clearly have no idea what you\'re talking about."',
            analysis: {
                toxicity: { value: '92%', severity: 'Severe', color: '#f87171' },
                sentiment: { value: 'Hostile', color: '#94a3b8' },
                policy: { value: 'Harassment (Rule 2)', color: '#94a3b8' },
                aiConfidence: { value: '96%', color: '#a78bfa' },
            },
        },
        {
            id: 2,
            user: {
                name: 'TechObserver99',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tech',
                id: '#U-2105',
                priorFlags: 0,
                isNewUser: true,
            },
            postTitle: 'Optimizing React Performance',
            postLink: '#',
            reportedTime: '45 mins ago',
            status: 'Pending Review',
            content: '"I don\'t understand how the author can claim this works. It\'s a completely stupid approach that will break production. Buy my course at http://spam-link-block.co to actually learn how to code."',
            analysis: {
                toxicity: { value: '45%', severity: 'Moderate', color: '#fbbf24' },
                sentiment: { value: 'Hostile', color: '#94a3b8' },
                policy: { value: 'Self-Promo/Spam', color: '#94a3b8' },
                aiConfidence: { value: '82%', color: '#a78bfa' },
            },
        },
    ]);

    const sidebarNavItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
        { id: 'users', label: 'Users', icon: 'users' },
        { id: 'blogs', label: 'Blogs', icon: 'blogs' },
        { id: 'flagged', label: 'Flagged Comments', icon: 'flagged', active: true, badge: 12 },
        { id: 'settings', label: 'Settings', icon: 'settings' },
    ];

    const handleDelete = (id) => {
        setComments(prev => prev.filter(c => c.id !== id));
    };

    const handleHide = (id) => {
        setComments(prev => prev.filter(c => c.id !== id));
    };

    const handleApprove = (id) => {
        setComments(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div className={styles.page}>
            <FlaggedSidebar navItems={sidebarNavItems} />

            <div className={styles.mainArea}>
                <FlaggedTopNavbar />

                <div className={styles.contentArea}>
                    {comments.length === 0 ? (
                        <FlaggedEmptyState />
                    ) : (
                        <div className={styles.commentsList}>
                            {comments.map((comment) => (
                                <FlaggedCommentCard
                                    key={comment.id}
                                    comment={comment}
                                    onDelete={() => handleDelete(comment.id)}
                                    onHide={() => handleHide(comment.id)}
                                    onApprove={() => handleApprove(comment.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FlaggedComments;