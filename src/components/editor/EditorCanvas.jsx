import React from 'react';
import {
    Bold,
    Italic,
    Underline,
    Quote,
    Image,
    Code,
    Sparkles,
    Wand2,
    RefreshCw,
    Maximize2,
    Minimize2
} from 'lucide-react';
import styles from '../../styles/editor/EditorCanvas.module.css';

const EditorCanvas = ({ blogData, onChange }) => {
    const categories = [
        'Artificial Intelligence',
        'Machine Learning',
        'Web Development',
        'Design',
        'DevOps',
        'Career'
    ];

    return (
        <div className={styles.canvas}>
            <div className={styles.formSection}>
                {/* Title Input Section */}
                <div className={styles.inputGroup}>
                    <div className={styles.labelRow}>
                        <label className={styles.label}>Title</label>
                        <button className={styles.aiLabelButton}>
                            <Sparkles size={12} className={styles.sparkleColor} />
                            <span>Generate Title</span>
                        </button>
                    </div>
                    <div className={styles.inputWithIcon}>
                        <input
                            type="text"
                            className={styles.titleInput}
                            placeholder="Enter an engaging title..."
                            value={blogData.title}
                            onChange={(e) => onChange({ ...blogData, title: e.target.value })}
                        />
                        <Sparkles size={16} className={styles.inputSparkle} />
                    </div>
                </div>

                {/* Category & SEO Tags Row */}
                <div className={styles.metaRow}>
                    <div className={`${styles.inputGroup} ${styles.colCategory}`}>
                        <label className={styles.label}>Category</label>
                        <select
                            className={styles.select}
                            value={blogData.category}
                            onChange={(e) => onChange({ ...blogData, category: e.target.value })}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className={`${styles.inputGroup} ${styles.colTags}`}>
                        <div className={styles.labelRow}>
                            <label className={styles.label}>SEO Tags</label>
                            <button className={styles.aiLabelButton}>
                                <Sparkles size={12} className={styles.sparkleColor} />
                                <span>Generate Tags</span>
                            </button>
                        </div>
                        <div className={styles.inputWithIcon}>
                            <input
                                type="text"
                                className={styles.textInput}
                                placeholder="e.g. AI, Design, UX"
                                value={blogData.tags || ''}
                                onChange={(e) => onChange({ ...blogData, tags: e.target.value })}
                            />
                            <Sparkles size={16} className={styles.inputSparkle} />
                        </div>
                    </div>
                </div>

                {/* Excerpt Section */}
                <div className={styles.inputGroup}>
                    <div className={styles.labelRow}>
                        <label className={styles.label}>Excerpt</label>
                        <button className={styles.aiLabelButton}>
                            <Sparkles size={12} className={styles.sparkleColor} />
                            <span>Generate Summary</span>
                        </button>
                    </div>
                    <div className={styles.textareaWithIcon}>
                        <textarea
                            className={styles.excerptInput}
                            placeholder="A brief summary for previews..."
                            rows={2}
                            value={blogData.excerpt}
                            onChange={(e) => onChange({ ...blogData, excerpt: e.target.value })}
                        />
                        <Sparkles size={16} className={styles.textareaSparkle} />
                    </div>
                </div>
            </div>

            {/* AI Helpers Tools Bar */}
            <div className={styles.aiToolsBar}>
                <button className={`${styles.aiBarButton} ${styles.activeAI}`}>
                    <Sparkles size={14} />
                    <span>Improve Content</span>
                </button>
                <button className={styles.aiBarButton}>
                    <Wand2 size={14} />
                    <span>Continue Writing</span>
                </button>
                <button className={styles.aiBarButton}>
                    <RefreshCw size={14} />
                    <span>Rewrite</span>
                </button>
                <button className={styles.aiBarButton}>
                    <Maximize2 size={14} />
                    <span>Expand</span>
                </button>
                <button className={styles.aiBarButton}>
                    <Minimize2 size={14} />
                    <span>Shorten</span>
                </button>
            </div>

            {/* Formatting Toolbar */}
            <div className={styles.formattingToolbar}>
                <button className={styles.formatButton} title="Bold"><Bold size={16} /></button>
                <button className={styles.formatButton} title="Italic"><Italic size={16} /></button>
                <button className={styles.formatButton} title="Underline"><Underline size={16} /></button>
                <div className={styles.formatDivider} />
                <button className={styles.formatButton} style={{ fontWeight: '700', fontSize: '13px' }} title="Heading 1">H1</button>
                <button className={styles.formatButton} style={{ fontWeight: '700', fontSize: '13px' }} title="Heading 2">H2</button>
                <button className={styles.formatButton} title="Quote"><Quote size={16} /></button>
                <div className={styles.formatDivider} />
                <button className={styles.formatButton} title="Insert Image"><Image size={16} /></button>
                <button className={styles.formatButton} title="Code Block"><Code size={16} /></button>
            </div>

            {/* Content Editor */}
            <div className={styles.contentArea}>
                <textarea
                    className={styles.contentInput}
                    placeholder="Start writing manually, or use the AI tools above to generate content..."
                    value={blogData.content}
                    onChange={(e) => onChange({ ...blogData, content: e.target.value })}
                />
            </div>

            {/* Bottom Status Bar */}
            <div className={styles.statusBar}>
                <div className={styles.statusLeft}>
                    <label className={styles.statusOption}>
                        <input type="radio" name="post-status" defaultChecked className={styles.radioInput} />
                        <span className={styles.radioCustom} />
                        <span>Draft</span>
                    </label>
                    <label className={styles.statusOption}>
                        <input type="radio" name="post-status" className={styles.radioInput} />
                        <span className={styles.radioCustom} />
                        <span>Public</span>
                    </label>
                </div>
                <div className={styles.statusRight}>
                    <span>0 Words</span>
                    <span>0 min read</span>
                </div>
            </div>
        </div>
    );
};

export default EditorCanvas;