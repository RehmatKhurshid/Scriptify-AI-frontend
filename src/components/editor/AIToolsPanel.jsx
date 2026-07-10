import React from 'react';
import { FiZap, FiEdit3, FiHash, FiAlignLeft, FiImage } from 'react-icons/fi';
import styles from '../../styles/editor/AIToolsPanel.module.css';

const tools = [
    { id: 'titles', icon: <FiZap />, label: 'Generate Titles', primary: true },
    { id: 'improve', icon: <FiEdit3 />, label: 'Improve Content', primary: false },
    { id: 'seo', icon: <FiHash />, label: 'SEO Tags', primary: false },
    { id: 'summarize', icon: <FiAlignLeft />, label: 'Summarize', primary: false },
    { id: 'thumbnail', icon: <FiImage />, label: 'Generate Thumbnail', primary: false },
];

const AIToolsPanel = () => {
    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <div className={styles.statusIcon}>
                    <FiZap />
                </div>
                <div className={styles.statusInfo}>
                    <h3 className={styles.statusTitle}>Post Status</h3>
                    <p className={styles.statusDesc}>Draft • Last edited 2 min ago</p>
                </div>
            </div>

            <div className={styles.toolsList}>
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        className={`${styles.toolButton} ${tool.primary ? styles.primary : ''}`}
                    >
                        <span className={styles.toolIcon}>{tool.icon}</span>
                        <span className={styles.toolLabel}>{tool.label}</span>
                    </button>
                ))}
            </div>

            <div className={styles.actions}>
                <button className={styles.saveButton}>
                    Save Draft
                </button>
                <button className={styles.moreButton}>
                    •••
                </button>
            </div>
        </div>
    );
};

export default AIToolsPanel;