import React, { useState, useRef } from 'react';
import {
    Sparkles,
    Wand2,
    RefreshCw,
    Maximize2,
    Minimize2,
    Loader2
} from 'lucide-react';
import canvasStyles from '../../styles/editor/EditorCanvas.module.css';

const EditBlogCanvas = ({
    blogData,
    onChange,
    loadingFields = {},
    onAIGenerateTitle,
    onAISummarizeExcerpt,
    onAIGenerateTags,
    onAIImproveContent,
    onAIContinueWriting,
    onAIRewriteSelected,
    onAIExpandContent,
    onAIShortenContent
}) => {
    const categories = [
        'Artificial Intelligence',
        'Machine Learning',
        'Web Development',
        'Design',
        'DevOps',
        'Career'
    ];

    const textareaRef = useRef(null);
    const [selectedTextData, setSelectedTextData] = useState(null);

    const handleSelection = (e) => {
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const text = e.target.value.substring(start, end);
        
        if (start !== end && text.trim().length > 0) {
            setSelectedTextData({ text, start, end });
        } else {
            setSelectedTextData(null);
        }
    };

    // Words and Read Time counters
    const wordCount = blogData.content 
        ? blogData.content.trim().split(/\s+/).filter(Boolean).length 
        : 0;
    const readTime = Math.ceil(wordCount / 200) || 1;

    // Custom formatting trigger simulation
    const insertFormat = (prefix, suffix = '') => {
        if (!textareaRef.current) return;
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selected = text.substring(start, end);
        const replacement = prefix + selected + suffix;

        onChange({
            ...blogData,
            content: text.substring(0, start) + replacement + text.substring(end)
        });

        // Refocus textarea after format
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
        }, 0);
    };

    return (
        <div className={canvasStyles.canvas} style={{ position: 'relative' }}>
            {/* Whole Canvas Loader for global operations */}
            {loadingFields.content && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(15, 15, 26, 0.7)',
                    backdropFilter: 'blur(3px)',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                }}>
                    <Loader2 className="animate-spin" size={32} style={{ color: '#8b5cf6', animation: 'spin 1s linear infinite' }} />
                    <span style={{ color: '#c4b5fd', fontWeight: 500, fontSize: '14px' }}>AI working on content...</span>
                </div>
            )}

            <div className={canvasStyles.formSection}>
                {/* Title Input Section */}
                <div className={canvasStyles.inputGroup}>
                    <div className={canvasStyles.labelRow}>
                        <label className={canvasStyles.label}>Title</label>
                        <button 
                            className={canvasStyles.aiLabelButton}
                            onClick={onAIGenerateTitle}
                            disabled={loadingFields.title}
                        >
                            {loadingFields.title ? (
                                <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />
                            ) : (
                                <Sparkles size={12} className={canvasStyles.sparkleColor} />
                            )}
                            <span>{loadingFields.title ? 'Thinking...' : 'Generate Title'}</span>
                        </button>
                    </div>
                    <div className={canvasStyles.inputWithIcon}>
                        <input
                            type="text"
                            className={canvasStyles.titleInput}
                            placeholder="Enter an engaging title..."
                            value={blogData.title || ''}
                            onChange={(e) => onChange({ ...blogData, title: e.target.value })}
                            style={{
                                border: loadingFields.title ? '1px dashed #8b5cf6' : '1px solid #2d2d44',
                                opacity: loadingFields.title ? 0.6 : 1,
                                transition: 'all 0.3s'
                            }}
                        />
                        {loadingFields.title ? (
                            <Loader2 size={16} style={{ position: 'absolute', right: '14px', color: '#8b5cf6', animation: 'spin 1s linear infinite' }} />
                        ) : (
                            <Sparkles size={16} className={canvasStyles.inputSparkle} />
                        )}
                    </div>
                </div>

                {/* Category & SEO Tags Row */}
                <div className={canvasStyles.metaRow}>
                    <div className={`${canvasStyles.inputGroup} ${canvasStyles.colCategory}`}>
                        <label className={canvasStyles.label}>Category</label>
                        <select
                            className={canvasStyles.select}
                            value={blogData.category || 'Artificial Intelligence'}
                            onChange={(e) => onChange({ ...blogData, category: e.target.value })}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className={`${canvasStyles.inputGroup} ${canvasStyles.colTags}`}>
                        <div className={canvasStyles.labelRow}>
                            <label className={canvasStyles.label}>SEO Tags</label>
                            <button 
                                className={canvasStyles.aiLabelButton}
                                onClick={onAIGenerateTags}
                                disabled={loadingFields.tags}
                            >
                                {loadingFields.tags ? (
                                    <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />
                                ) : (
                                    <Sparkles size={12} className={canvasStyles.sparkleColor} />
                                )}
                                <span>{loadingFields.tags ? 'Analyzing...' : 'Generate SEO Tags'}</span>
                            </button>
                        </div>
                        <div className={canvasStyles.inputWithIcon}>
                            <input
                                type="text"
                                className={canvasStyles.textInput}
                                placeholder="e.g. AI, Design, UX (comma separated)"
                                value={blogData.tags || ''}
                                onChange={(e) => onChange({ ...blogData, tags: e.target.value })}
                                style={{
                                    border: loadingFields.tags ? '1px dashed #8b5cf6' : '1px solid #2d2d44',
                                    opacity: loadingFields.tags ? 0.6 : 1,
                                    transition: 'all 0.3s'
                                }}
                            />
                            {loadingFields.tags ? (
                                <Loader2 size={16} style={{ position: 'absolute', right: '14px', color: '#8b5cf6', animation: 'spin 1s linear infinite' }} />
                            ) : (
                                <Sparkles size={16} className={canvasStyles.inputSparkle} />
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className={canvasStyles.inputGroup}>
                    <div className={canvasStyles.contentHeaderRow}>
                        <label className={canvasStyles.label}>Content</label>

                        {/* Top AI Action Buttons for Content */}
                        <div className={canvasStyles.contentAiBar}>
                            <button 
                                className={canvasStyles.contentAiBtn}
                                onClick={onAIImproveContent}
                                title="Improve tone, grammar and flow of text"
                            >
                                <Sparkles size={13} style={{ color: '#a78bfa' }} />
                                <span>Improve Content</span>
                            </button>
                            <button 
                                className={canvasStyles.contentAiBtn}
                                onClick={onAIContinueWriting}
                                title="Let AI continue writing from current cursor position"
                            >
                                <Wand2 size={13} style={{ color: '#8b5cf6' }} />
                                <span>Continue Writing</span>
                            </button>
                            <button 
                                className={`${canvasStyles.contentAiBtn} ${selectedTextData ? canvasStyles.activeAI : ''}`}
                                onClick={() => {
                                    if (selectedTextData) {
                                        onAIRewriteSelected(selectedTextData);
                                    } else {
                                        onAIRewriteSelected(null);
                                    }
                                }}
                                title={selectedTextData ? `Rewrite: "${selectedTextData.text.substring(0, 20)}..."` : "Highlight text inside content block to rewrite it"}
                            >
                                <RefreshCw size={13} style={{ animation: selectedTextData ? 'spin 6s linear infinite' : 'none' }} />
                                <span>
                                    {selectedTextData ? 'Rewrite Selection ✨' : 'Rewrite Content'}
                                </span>
                            </button>
                            <button 
                                className={canvasStyles.contentAiBtn}
                                onClick={() => onAIExpandContent(selectedTextData)}
                                title="Elaborate and add depth to selection or text"
                            >
                                <Maximize2 size={13} />
                                <span>Expand</span>
                            </button>
                            <button 
                                className={canvasStyles.contentAiBtn}
                                onClick={() => onAIShortenContent(selectedTextData)}
                                title="Condense and summarize selection or text"
                            >
                                <Minimize2 size={13} />
                                <span>Shorten</span>
                            </button>

                            {selectedTextData && (
                                <span style={{ marginLeft: '4px', fontSize: '11px', color: '#a78bfa', background: 'rgba(139, 92, 246, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                                    Selected {selectedTextData.text.split(/\s+/).filter(Boolean).length} words
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={canvasStyles.textareaWithIcon}>
                        <textarea
                            ref={textareaRef}
                            className={canvasStyles.contentInput}
                            placeholder="Start writing manually, or use the AI tools above to generate content..."
                            rows={12}
                            value={blogData.content || ''}
                            onChange={(e) => {
                                onChange({ ...blogData, content: e.target.value });
                                handleSelection(e);
                            }}
                            onSelect={handleSelection}
                            onKeyUp={handleSelection}
                        />
                    </div>
                </div>

                {/* Excerpt Section */}
                <div className={canvasStyles.inputGroup}>
                    <div className={canvasStyles.labelRow}>
                        <label className={canvasStyles.label}>Excerpt</label>
                        <button 
                            className={canvasStyles.aiLabelButton}
                            onClick={onAISummarizeExcerpt}
                            disabled={loadingFields.excerpt}
                        >
                            {loadingFields.excerpt ? (
                                <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />
                            ) : (
                                <Sparkles size={12} className={canvasStyles.sparkleColor} />
                            )}
                            <span>{loadingFields.excerpt ? 'Summarizing...' : 'AI Summarize Excerpt'}</span>
                        </button>
                    </div>
                    <div className={canvasStyles.textareaWithIcon}>
                        <textarea
                            className={canvasStyles.excerptInput}
                            placeholder="A brief summary for previews..."
                            rows={2}
                            maxLength={300}
                            value={blogData.excerpt || ''}
                            onChange={(e) => onChange({ ...blogData, excerpt: e.target.value })}
                            style={{
                                border: loadingFields.excerpt ? '1px dashed #8b5cf6' : '1px solid #2d2d44',
                                opacity: loadingFields.excerpt ? 0.6 : 1,
                                transition: 'all 0.3s'
                            }}
                        />
                        {loadingFields.excerpt ? (
                            <Loader2 size={16} style={{ position: 'absolute', right: '14px', top: '14px', color: '#8b5cf6', animation: 'spin 1s linear infinite' }} />
                        ) : (
                            <Sparkles size={16} className={canvasStyles.textareaSparkle} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBlogCanvas;
