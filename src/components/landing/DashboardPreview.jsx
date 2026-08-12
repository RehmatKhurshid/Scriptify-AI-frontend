import React from 'react';
import { HiSparkles } from 'react-icons/hi';
import { FiExternalLink, FiHelpCircle } from 'react-icons/fi';
import styles from '../../styles/landing/DashboardPreview.module.css';

const DashboardPreview = () => {
    return (
        <div className={styles.previewContainer}>
            {/* Main Outer Studio Window */}
            <div className={styles.studioWindow}>
                {/* Header Bar */}
                <div className={styles.windowHeader}>
                    <div className={styles.brandTitle}>
                        <div className={styles.brandLogoIcon}>
                            <HiSparkles />
                        </div>
                        <span className={styles.brandName}>Scriptify AI</span>
                    </div>
                </div>

                {/* Split Workspace */}
                <div className={styles.workspaceSplit}>
                    {/* Left Pane: Rich Text Article Editor */}
                    <div className={styles.editorPane}>
                        <h2 className={styles.articleTitle}>
                            The Future of Writing: Generative AI and Beyond.
                        </h2>
                        <p className={styles.articleParagraph}>
                            Artificial Intelligence is revolutionizing content creation, offering unprecedented tools for writers and marketers. From generating creative copy to optimizing for SEO, generative models like Scriptify AI are changing the landscape.
                        </p>
                        <p className={styles.articleParagraph}>
                            This technology isn't about replacing human creativity, but enhancing it, allowing for faster iteration and data-driven insights...<span className={styles.cursor}>|</span>
                        </p>
                    </div>

                    {/* Right Pane: AI Assistant Floating Panel */}
                    <div className={styles.aiAssistantPanel}>
                        {/* Assistant Header */}
                        <div className={styles.assistantHeader}>
                            <div className={styles.assistantTitleGroup}>
                                <HiSparkles className={styles.assistantSparkle} />
                                <span>AI Assistant</span>
                            </div>
                            <div className={styles.assistantControls}>
                                <FiExternalLink className={styles.controlIcon} />
                                <FiHelpCircle className={styles.controlIcon} />
                            </div>
                        </div>

                        {/* Metric 1: SEO Score */}
                        <div className={styles.metricSection}>
                            <div className={styles.metricHeader}>
                                <span className={styles.metricLabel}>SEO Score:</span>
                                <span className={styles.metricValue}>94/100 - Excellent</span>
                            </div>
                            <div className={styles.progressBarTrack}>
                                <div className={styles.progressBarFill}>
                                    <span className={styles.progressGlowHandle}></span>
                                </div>
                            </div>
                        </div>

                        {/* Metric 2: Readability */}
                        <div className={styles.metricSection}>
                            <span className={styles.readabilityLabel}>Readability Metrics:</span>
                            <p className={styles.readabilityText}>
                                Grade 8 (Flesch-Kincaid),<br />
                                450 words, 3m read time.
                            </p>
                        </div>

                        {/* Summary Action Button */}
                        <button className={styles.summaryBtn}>
                            <HiSparkles className={styles.btnIcon} />
                            <span>Generate Summary</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Glow */}
            <div className={styles.glow}></div>
        </div>
    );
};

export default DashboardPreview;