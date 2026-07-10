import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import styles from '../../styles/editor/PostSettingsPanel.module.css';

const PostSettingsPanel = () => {
    const [categoryOpen, setCategoryOpen] = useState(true);
    const [seoOpen, setSeoOpen] = useState(true);
    const [audienceOpen, setAudienceOpen] = useState(true);

    return (
        <div className={styles.panel}>
            {/* Category */}
            <div className={styles.section}>
                <button
                    className={styles.sectionHeader}
                    onClick={() => setCategoryOpen(!categoryOpen)}
                >
                    <span className={styles.sectionTitle}>Category</span>
                    {categoryOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {categoryOpen && (
                    <div className={styles.sectionContent}>
                        <button className={styles.dropdown}>
                            <span>Technology</span>
                            <FiChevronDown />
                        </button>
                    </div>
                )}
            </div>

            {/* SEO Description */}
            <div className={styles.section}>
                <button
                    className={styles.sectionHeader}
                    onClick={() => setSeoOpen(!seoOpen)}
                >
                    <span className={styles.sectionTitle}>SEO Description</span>
                    {seoOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {seoOpen && (
                    <div className={styles.sectionContent}>
                        <textarea
                            className={styles.textarea}
                            placeholder="Enter a brief description for search engines..."
                            rows={3}
                        />
                    </div>
                )}
            </div>

            {/* Audience */}
            <div className={styles.section}>
                <button
                    className={styles.sectionHeader}
                    onClick={() => setAudienceOpen(!audienceOpen)}
                >
                    <span className={styles.sectionTitle}>Audience</span>
                    {audienceOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {audienceOpen && (
                    <div className={styles.sectionContent}>
                        <div className={styles.tagGroup}>
                            <span className={`${styles.tag} ${styles.active}`}>Developers</span>
                            <span className={styles.tag}>Designers</span>
                            <span className={styles.tag}>Founders</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostSettingsPanel;