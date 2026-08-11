import React from 'react';
import {
    Sparkles,
    Wand2,
    RefreshCw,
    Maximize2,
    Minimize2,
    Loader2
} from 'lucide-react';
import styles from '../../styles/editor/EditorCanvas.module.css';

const EditorCanvas = ({
    blogData,
    onChange,
    onGenerateTitles,
    onGenerateContent,
    onGenerateTags,
    onGenerateSummary,
    onImproveContent,
    aiLoading = {},
}) => {
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
                        {onGenerateTitles && (
                            <button
                                type="button"
                                className={styles.aiLabelButton}
                                onClick={onGenerateTitles}
                                disabled={aiLoading.titles}
                            >
                                {aiLoading.titles ? (
                                    <Loader2 size={12} className={styles.spinIcon} />
                                ) : (
                                    <Sparkles size={12} className={styles.sparkleColor} />
                                )}
                                <span>{aiLoading.titles ? 'Generating...' : 'Suggest Titles'}</span>
                            </button>
                        )}
                    </div>
                    <div className={styles.inputWithIcon}>
                        <input
                            type="text"
                            className={styles.titleInput}
                            placeholder="Enter an engaging title..."
                            value={blogData.title}
                            onChange={(e) => onChange({ ...blogData, title: e.target.value })}
                        />
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
                            <button
                                type="button"
                                className={styles.aiLabelButton}
                                onClick={onGenerateTags}
                                disabled={aiLoading.tags}
                            >
                                {aiLoading.tags ? (
                                    <Loader2 size={12} className={styles.spinIcon} />
                                ) : (
                                    <Sparkles size={12} className={styles.sparkleColor} />
                                )}
                                <span>{aiLoading.tags ? 'Generating...' : 'Generate Tags'}</span>
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
                        </div>
                    </div>
                </div>

                {/* Content Writing Section */}
                <div className={styles.inputGroup}>
                    <div className={styles.contentHeaderRow}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <label className={styles.label}>Content</label>
                            {onGenerateContent && (
                                <button
                                    type="button"
                                    className={styles.aiLabelButton}
                                    onClick={onGenerateContent}
                                    disabled={aiLoading.content}
                                >
                                    {aiLoading.content ? (
                                        <Loader2 size={12} className={styles.spinIcon} />
                                    ) : (
                                        <Sparkles size={12} className={styles.sparkleColor} />
                                    )}
                                    <span>{aiLoading.content ? 'Generating...' : 'Generate Content'}</span>
                                </button>
                            )}
                        </div>

                        {/* Top AI Action Buttons for Content */}
                        <div className={styles.contentAiBar}>
                            <button
                                type="button"
                                className={`${styles.contentAiBtn} ${aiLoading.improve === 'improve' ? styles.activeAI : ''}`}
                                onClick={() => onImproveContent('improve', 'Improve grammar, clarity, readability, and professional tone.')}
                                disabled={!!aiLoading.improve}
                            >
                                {aiLoading.improve === 'improve' ? <Loader2 size={13} className={styles.spinIcon} /> : <Sparkles size={13} />}
                                <span>{aiLoading.improve === 'improve' ? 'Improving...' : 'Improve Content'}</span>
                            </button>

                            <button
                                type="button"
                                className={`${styles.contentAiBtn} ${aiLoading.improve === 'continue' ? styles.activeAI : ''}`}
                                onClick={() => onImproveContent('continue', 'Continue writing the next logical paragraph or section seamlessly.')}
                                disabled={!!aiLoading.improve}
                            >
                                {aiLoading.improve === 'continue' ? <Loader2 size={13} className={styles.spinIcon} /> : <Wand2 size={13} />}
                                <span>{aiLoading.improve === 'continue' ? 'Writing...' : 'Continue Writing'}</span>
                            </button>

                            <button
                                type="button"
                                className={`${styles.contentAiBtn} ${aiLoading.improve === 'rewrite' ? styles.activeAI : ''}`}
                                onClick={() => onImproveContent('rewrite', 'Rewrite this content with enhanced phrasing, flow, and vocabulary.')}
                                disabled={!!aiLoading.improve}
                            >
                                {aiLoading.improve === 'rewrite' ? <Loader2 size={13} className={styles.spinIcon} /> : <RefreshCw size={13} />}
                                <span>{aiLoading.improve === 'rewrite' ? 'Rewriting...' : 'Rewrite'}</span>
                            </button>

                            <button
                                type="button"
                                className={`${styles.contentAiBtn} ${aiLoading.improve === 'expand' ? styles.activeAI : ''}`}
                                onClick={() => onImproveContent('expand', 'Expand on key points in this content with more details, insights, and examples.')}
                                disabled={!!aiLoading.improve}
                            >
                                {aiLoading.improve === 'expand' ? <Loader2 size={13} className={styles.spinIcon} /> : <Maximize2 size={13} />}
                                <span>{aiLoading.improve === 'expand' ? 'Expanding...' : 'Expand'}</span>
                            </button>

                            <button
                                type="button"
                                className={`${styles.contentAiBtn} ${aiLoading.improve === 'shorten' ? styles.activeAI : ''}`}
                                onClick={() => onImproveContent('shorten', 'Shorten and condense this content while retaining main points.')}
                                disabled={!!aiLoading.improve}
                            >
                                {aiLoading.improve === 'shorten' ? <Loader2 size={13} className={styles.spinIcon} /> : <Minimize2 size={13} />}
                                <span>{aiLoading.improve === 'shorten' ? 'Shortening...' : 'Shorten'}</span>
                            </button>
                        </div>
                    </div>

                    <div className={styles.textareaWithIcon}>
                        <textarea
                            className={styles.contentInput}
                            placeholder="Start writing manually, or use the AI tools above to generate content..."
                            rows={12}
                            value={blogData.content}
                            onChange={(e) => onChange({ ...blogData, content: e.target.value })}
                        />
                    </div>
                </div>

                {/* Excerpt Section */}
                <div className={styles.inputGroup}>
                    <div className={styles.labelRow}>
                        <label className={styles.label}>Excerpt</label>
                        <button
                            type="button"
                            className={styles.aiLabelButton}
                            onClick={onGenerateSummary}
                            disabled={aiLoading.summary}
                        >
                            {aiLoading.summary ? (
                                <Loader2 size={12} className={styles.spinIcon} />
                            ) : (
                                <Sparkles size={12} className={styles.sparkleColor} />
                            )}
                            <span>{aiLoading.summary ? 'Summarizing...' : 'Generate Summary'}</span>
                        </button>
                    </div>
                    <div className={styles.textareaWithIcon}>
                        <textarea
                            className={styles.excerptInput}
                            placeholder="A brief summary for previews..."
                            rows={2}
                            maxLength={300}
                            value={blogData.excerpt}
                            onChange={(e) => onChange({ ...blogData, excerpt: e.target.value })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorCanvas;