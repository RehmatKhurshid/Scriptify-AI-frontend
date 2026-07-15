import React from 'react';
import { Sparkles, Image, Settings } from 'lucide-react';
import styles from '../../styles/editor/PostSettingsPanel.module.css';

const PostSettingsPanel = () => {
    return (
        <aside className={styles.panel}>
            {/* Header */}
            <div className={styles.panelHeader}>
                <div className={styles.aiBadge}>
                    <Sparkles size={16} className={styles.aiIcon} />
                    <span>AI Blog Assistant</span>
                </div>
                <span className={styles.betaTag}>BETA</span>
            </div>

            {/* Generate Draft Section */}
            <div className={styles.section}>
                <label className={styles.sectionLabel}>Generate Draft</label>
                <textarea
                    className={styles.ideaTextarea}
                    placeholder="Describe your blog idea... (e.g. A post about the future of AI in frontend design)"
                    rows={4}
                />
            </div>

            <button className={styles.generateButton}>
                <Sparkles size={16} />
                <span>Generate Blog Draft</span>
            </button>

            {/* Featured Thumbnail Section */}
            <div className={styles.sectionThumbnail}>
                <label className={styles.sectionLabel}>Featured Thumbnail</label>
                
                <div className={styles.dropzone}>
                    <Image size={24} className={styles.dropzoneIcon} />
                    <span className={styles.dropzoneTitle}>Drag & Drop or Click</span>
                    <span className={styles.dropzoneSubtitle}>1200×630px recommended</span>
                </div>

                <div className={styles.thumbnailActions}>
                    <button className={styles.aiGenerateBtn}>
                        <Sparkles size={14} />
                        <span>AI Generate</span>
                    </button>
                    <button className={styles.settingsBtn} title="Thumbnail Settings">
                        <Settings size={16} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default PostSettingsPanel;