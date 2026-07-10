import React from 'react';
import AIToolsPanel from './AIToolsPanel';
import PostSettingsPanel from './PostSettingsPanel';
import styles from '../../styles/editor/EditorSidebar.module.css';

const EditorSidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <AIToolsPanel />
            <PostSettingsPanel />
        </aside>
    );
};

export default EditorSidebar;