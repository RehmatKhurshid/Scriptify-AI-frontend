import React from 'react';
import EditorNavbar from '../components/editor/EditorNavbar';
import EditorCanvas from '../components/editor/EditorCanvas';
import EditorSidebar from '../components/editor/EditorSidebar';
import styles from '../styles/editor/CreateBlog.module.css';

const CreateBlog = () => {
    return (
        <div className={styles.container}>
            <EditorNavbar />
            <div className={styles.main}>
                <EditorCanvas />
                <EditorSidebar />
            </div>
        </div>
    );
};

export default CreateBlog;