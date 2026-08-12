import React, { useCallback, useEffect, useState } from 'react';
import FlaggedSidebar from '../../components/admin/flagged-comments/FlaggedSidebar';
import FlaggedTopNavbar from '../../components/admin/flagged-comments/FlaggedTopNavbar';
import FlaggedCommentCard from '../../components/admin/flagged-comments/FlaggedCommentCard';
import FlaggedEmptyState from '../../components/admin/flagged-comments/FlaggedEmptyState';
import adminService from '../../services/adminService';
import styles from '../../styles/admin/flagged-comments/FlaggedComments.module.css';

export default function FlaggedComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const d = await adminService.getFlaggedComments();
      const mapped = (d.comments || []).map((c) => ({
        id: c._id,
        user: {
          name: c.user ? `${c.user.firstName || ''} ${c.user.lastName || ''}`.trim() || c.user.email : 'Anonymous',
          avatar: c.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.user?.email || c._id}`,
          id: c.user?._id ? `#U-${c.user._id.slice(-4)}` : '#U-0000',
          priorFlags: 0,
        },
        postTitle: c.blog?.title || 'Blog Post',
        postLink: c.blog?._id ? `/blog/${c.blog._id}` : '#',
        reportedTime: c.createdAt ? new Date(c.createdAt).toLocaleString() : 'Recent',
        status: c.moderationStatus === 'hidden' ? 'Hidden' : c.isFlagged ? 'Flagged' : 'Pending Review',
        content: `"${c.content}"`,
        analysis: {
          toxicity: { value: 'Flagged', severity: 'High', color: '#f87171' },
          sentiment: { value: 'Hostile', color: '#94a3b8' },
          policy: { value: c.flagReason || 'Policy Violation', color: '#94a3b8' },
          aiConfidence: { value: '100%', color: '#a78bfa' },
        },
      }));
      setComments(mapped);
    } catch (e) {
      setError(e.message || 'Unable to load flagged comments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const act = async (id, action) => {
    try {
      await adminService.moderateComment(id, action);
      await load();
    } catch (e) {
      setError(e.message || 'Action failed.');
    }
  };

  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'users', label: 'Users', icon: 'users' },
    { id: 'blogs', label: 'Blogs', icon: 'blogs' },
    { id: 'flagged', label: 'Flagged Comments', icon: 'flagged', active: true, badge: comments.length },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <div className={styles.page}>
      <FlaggedSidebar navItems={nav} />
      <div className={styles.mainArea}>
        <FlaggedTopNavbar />
        <div className={styles.contentArea}>
          {error && <div style={{ color: '#f87171', padding: 12 }}>{error}</div>}
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center' }}>Loading flagged comments...</div>
          ) : comments.length === 0 ? (
            <FlaggedEmptyState />
          ) : (
            <div className={styles.commentsList}>
              {comments.map((comment) => (
                <FlaggedCommentCard
                  key={comment.id}
                  comment={comment}
                  onDelete={() => act(comment.id, 'delete')}
                  onHide={() => act(comment.id, 'hide')}
                  onApprove={() => act(comment.id, 'approve')}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}