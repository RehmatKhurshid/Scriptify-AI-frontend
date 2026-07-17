import React from 'react';
import { Plus } from 'lucide-react';
import styles from '../../../styles/admin/admin-dashboard/FeaturedBlogsPanel.module.css';

const FeaturedBlogsPanel = ({ blogs }) => {
    return (
        <div className={styles.panel}>
            <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Featured Blogs</h3>
                <button className={styles.manageBtn}>Manage</button>
            </div>

            <div className={styles.blogList}>
                {blogs.map((blog) => (
                    <div key={blog.id} className={styles.blogItem}>
                        <div
                            className={styles.blogThumb}
                            style={{ background: `linear-gradient(135deg, ${blog.color}33, ${blog.color}11)` }}
                        >
                            <div className={styles.thumbInner} style={{ background: blog.color }} />
                        </div>
                        <div className={styles.blogInfo}>
                            <h4 className={styles.blogTitle}>{blog.title}</h4>
                            <p className={styles.blogMeta}>
                                Featured {blog.featured} • {blog.views}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button className={styles.promoteBtn}>
                <Plus size={16} />
                <span>Promote New Blog</span>
            </button>
        </div>
    );
};

export default FeaturedBlogsPanel;