import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import styles from '../../styles/editor/EditorCanvas.module.css';

const EditorCanvas = () => {
    const [title, setTitle] = useState('Untitled Masterpiece');
    const [subtitle, setSubtitle] = useState('Focus on the narrative. Let AI handle the structure.');
    const [content, setContent] = useState('');

    return (
        <div className={styles.canvas}>
            <div className={styles.metaTag}>STRUCTURAL INTELLIGENCE</div>

            <input
                type="text"
                className={styles.titleInput}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Untitled Masterpiece"
            />

            <input
                type="text"
                className={styles.subtitleInput}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Focus on the narrative. Let AI handle the structure."
            />

            <div className={styles.divider}></div>

            <textarea
                className={styles.contentArea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your story..."
            />

            <button className={styles.addButton}>
                <FiPlus />
                <span>Add AI Assistant</span>
            </button>
        </div>
    );
};

export default EditorCanvas;