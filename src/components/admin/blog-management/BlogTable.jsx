import React from 'react';
import { Eye, Star, Pencil, Trash2, Heart } from 'lucide-react';
import styles from '../../../styles/admin/blog-management/BlogTable.module.css';

const BlogTable = ({ blogs, selectedRows, onToggleRow, onToggleAll }) => {
    const allSelected = selectedRows.length === blogs.length && blogs.length > 0;

    const getCategoryStyle = (category) => {
        switch (category) {
            case 'Design': return styles.catDesign;
            case 'AI': return styles.catAI;
            case 'Tech': return styles.catTech;
            default: return styles.catDefault;
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Published': return styles.statusPublished;
            case 'Draft': return styles.statusDraft;
            default: return styles.statusDefault;
        }
    };

    return (
        <div className={styles.tableCard}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={styles.thCheckbox}>
                            <div className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={onToggleAll}
                                />
                            </div>
                        </th>
                        <th className={styles.th}>POST DETAILS</th>
                        <th className={styles.th}>CATEGORY</th>
                        <th className={styles.th}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            VIEWS
                        </th>
                        <th className={styles.th}>
                            <Heart size={14} style={{ marginRight: '4px', verticalAlign: 'middle', fill: 'currentColor' }} />
                            LIKES
                        </th>
                        <th className={styles.th}>STATUS</th>
                        <th className={styles.th}>PUBLISHED</th>
                        <th className={styles.thActions}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id} className={styles.row}>
                            <td className={styles.tdCheckbox}>
                                <div className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(blog.id)}
                                        onChange={() => onToggleRow(blog.id)}
                                    />
                                </div>
                            </td>
                            <td className={styles.tdPost}>
                                <div className={styles.postCell}>
                                    {blog.thumbnail ? (
                                        <div className={styles.thumbnail}>
                                            <img src={blog.thumbnail} alt={blog.title} />
                                        </div>
                                    ) : (
                                        <div className={styles.thumbnailPlaceholder}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className={styles.postInfo}>
                                        <span className={`${styles.postTitle} ${!blog.thumbnail ? styles.draftTitle : ''}`}>
                                            {blog.title}
                                        </span>
                                        <div className={styles.authorRow}>
                                            <div className={styles.authorAvatar}>
                                                <img src={blog.authorAvatar} alt={blog.author} />
                                            </div>
                                            <span className={styles.authorName}>{blog.author}</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className={styles.td}>
                                <span className={`${styles.categoryBadge} ${getCategoryStyle(blog.category)}`}>
                                    {blog.category}
                                </span>
                            </td>
                            <td className={styles.td}>
                                <span className={styles.metric}>{blog.views}</span>
                            </td>
                            <td className={styles.td}>
                                <span className={styles.metric}>{blog.likes}</span>
                            </td>
                            <td className={styles.td}>
                                <div className={`${styles.statusBadge} ${getStatusStyle(blog.status)}`}>
                                    <span className={styles.statusDot} />
                                    {blog.status}
                                </div>
                            </td>
                            <td className={styles.td}>
                                <span className={styles.date}>{blog.published}</span>
                            </td>
                            <td className={styles.tdActions}>
                                <div className={styles.actionButtons}>
                                    <button className={styles.actionBtn} title="View">
                                        <Eye size={16} />
                                    </button>
                                    <button className={`${styles.actionBtn} ${blog.featured ? styles.starred : ''}`} title="Feature">
                                        <Star size={16} />
                                    </button>
                                    <button className={styles.actionBtn} title="Edit">
                                        <Pencil size={16} />
                                    </button>
                                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlogTable;