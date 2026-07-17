import React, { useState } from 'react';
import BlogSidebar from '../../components/admin/blog-management/BlogSidebar';
import BlogTopNavbar from '../../components/admin/blog-management/BlogTopNavbar';
import BlogManagementHeader from '../../components/admin/blog-management/BlogManagementHeader';
import BlogFilterBar from '../../components/admin/blog-management/BlogFilterBar';
import BlogBulkActions from '../../components/admin/blog-management/BlogBulkActions';
import BlogTable from '../../components/admin/blog-management/BlogTable';
import BlogPagination from '../../components/admin/blog-management/BlogPagination';
import styles from '../../styles/admin/blog-management/BlogManagement.module.css';

const BlogManagement = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const sidebarNavItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
        { id: 'users', label: 'Users', icon: 'group' },
        { id: 'blogs', label: 'Blogs', icon: 'article', active: true },
        { id: 'flagged', label: 'Flagged Comments', icon: 'report' },
        { id: 'settings', label: 'Settings', icon: 'settings' },
    ];

    const blogs = [
        {
            id: 1,
            title: 'The Future of...',
            thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=80&h=60&fit=crop',
            author: 'Elena Rostova',
            authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
            category: 'Design',
            views: '12.4k',
            likes: '842',
            status: 'Published',
            published: 'Oct 24, 2023',
            featured: true,
        },
        {
            id: 2,
            title: 'Optimizing LLMs for...',
            thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=80&h=60&fit=crop',
            author: 'David Chen',
            authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
            category: 'AI',
            views: '8.2k',
            likes: '512',
            status: 'Published',
            published: 'Oct 22, 2023',
            featured: false,
        },
        {
            id: 3,
            title: 'Draft: Understanding...',
            thumbnail: null,
            author: 'Sarah Jenkins',
            authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            category: 'Tech',
            views: '-',
            likes: '-',
            status: 'Draft',
            published: '-',
            featured: false,
        },
    ];

    const toggleRowSelection = (id) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const toggleAllSelection = () => {
        if (selectedRows.length === blogs.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(blogs.map(b => b.id));
        }
    };

    return (
        <div className={styles.managementPage}>
            <BlogSidebar navItems={sidebarNavItems} />

            <div className={styles.mainArea}>
                <BlogTopNavbar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                <div className={styles.contentArea}>
                    <BlogManagementHeader />
                    <BlogFilterBar />
                    <BlogBulkActions selectedCount={selectedRows.length} />

                    <BlogTable
                        blogs={blogs}
                        selectedRows={selectedRows}
                        onToggleRow={toggleRowSelection}
                        onToggleAll={toggleAllSelection}
                    />

                    <BlogPagination
                        currentPage={1}
                        totalPages={25}
                        totalItems={245}
                        itemsPerPage={10}
                    />
                </div>
            </div>
        </div>
    );
};

export default BlogManagement;