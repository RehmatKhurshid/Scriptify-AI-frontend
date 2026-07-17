import React from 'react';
import { MoreVertical } from 'lucide-react';
import styles from '../../../styles/admin/admin-dashboard/RecentBlogsTable.module.css';

const RecentBlogsTable = ({ blogs }) => {
    return (
        <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
                <h3 className={styles.tableTitle}>Recent Blogs</h3>
                <button className={styles.viewAll}>View All Blogs</button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Post</th>
                            <th className={styles.th}>Author</th>
                            <th className={styles.th}>Views</th>
                            <th className={styles.th}>Status</th>
                            <th className={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog.id} className={styles.row}>
                                <td className={styles.td}>
                                    <div className={styles.postCell}>
                                        <div className={styles.postThumbnail}>
                                            <img src={blog.avatar} alt={blog.author} />
                                        </div>
                                        <span className={styles.postTitle}>{blog.title}</span>
                                    </div>
                                </td>
                                <td className={styles.td}>
                                    <span className={styles.author}>{blog.author}</span>
                                </td>
                                <td className={styles.td}>
                                    <span className={styles.views}>{blog.views}</span>
                                </td>
                                <td className={styles.td}>
                                    <span className={`${styles.status} ${styles[blog.status.toLowerCase()]}`}>
                                        {blog.status}
                                    </span>
                                </td>
                                <td className={styles.td}>
                                    <button className={styles.actionBtn}>
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentBlogsTable;