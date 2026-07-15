import React from 'react';
import { Cloud } from 'lucide-react';
import styles from '../../styles/editor/EditorNavbar.module.css';

const EditorNavbar = ({ onPublish }) => {
    return (
        <header className={styles.navbar}>
            <div className={styles.leftSection}>
                <span className={styles.breadcrumbLink}>Drafts</span>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbActive}>New Blog Post</span>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.saveStatus}>
                    <Cloud size={16} className={styles.saveIcon} />
                    <span>Saved just now</span>
                </div>
                <button className={styles.previewButton}>
                    Preview
                </button>
                <button className={styles.publishButton} onClick={onPublish}>
                    Publish
                </button>
            </div>
        </header>
    );
};

export default EditorNavbar;