import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/admin/admin-dashboard/FeaturedBlogsPanel.module.css';

const FeaturedBlogsPanel = ({ blogs = [] }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.panel}>
            <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Featured Blogs</h3>
                <button className={styles.manageBtn} onClick={() => navigate('/admin/blogs')}>Manage</button>
            </div>

            <div className={styles.blogList}>
                {blogs.length === 0 ? (
                    <div style={{ color: '#64748b', fontSize: '13px', padding: '16px 0', textAlign: 'center' }}>
                        No featured blogs yet
                    </div>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog.id} className={styles.blogItem} onClick={() => navigate('/admin/blogs')}>
                            <div className={styles.blogThumb}>
                                {blog.image ? (
                                    <img src={blog.image} alt={blog.title} className={styles.thumbImage} />
                                ) : (
                                    <div
                                        className={styles.thumbFallback}
                                        style={{ background: `linear-gradient(135deg, ${blog.color || '#6366f1'}33, ${blog.color || '#6366f1'}11)` }}
                                    >
                                        <div className={styles.thumbInner} style={{ background: blog.color || '#6366f1' }} />
                                    </div>
                                )}
                            </div>
                            <div className={styles.blogInfo}>
                                <h4 className={styles.blogTitle} title={blog.title}>{blog.title}</h4>
                                <p className={styles.blogMeta}>
                                    Featured {blog.featured} • {blog.views}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button className={styles.promoteBtn} onClick={() => navigate('/create')}>
                <Plus size={16} />
                <span>Promote New Blog</span>
            </button>
        </div>
    );
};

export default FeaturedBlogsPanel;