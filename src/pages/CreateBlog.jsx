import React, { useState } from 'react';
import EditorNavbar from '../components/editor/EditorNavbar';
import EditorSidebar from '../components/editor/EditorSidebar';
import EditorCanvas from '../components/editor/EditorCanvas';
import PostSettingsPanel from '../components/editor/PostSettingsPanel';
import styles from '../styles/editor/CreateBlog.module.css';

const CreateBlog = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState('drafts');

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
        { id: 'drafts', label: 'Drafts', icon: 'FileText' },
        { id: 'workshop', label: 'AI Workshop', icon: 'Sparkles' },
        { id: 'assets', label: 'Assets', icon: 'FolderOpen' },
        { id: 'settings', label: 'Settings', icon: 'Settings' },
    ];

    const [blogData, setBlogData] = useState({
        title: '',
        category: 'Artificial Intelligence',
        tags: '',
        excerpt: '',
        content: '',
    });

    const handlePublish = () => {
        console.log('Publishing:', blogData);
    };

    return (
        <div className={styles.createBlogPage}>
            <EditorSidebar
                navItems={navItems}
                activeItem={activeNavItem}
                onNavItemClick={setActiveNavItem}
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <div className={styles.mainArea}>
                <EditorNavbar
                    onPublish={handlePublish}
                />

                <div className={styles.editorContainer}>
                    <EditorCanvas
                        blogData={blogData}
                        onChange={setBlogData}
                    />
                    <PostSettingsPanel />
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;