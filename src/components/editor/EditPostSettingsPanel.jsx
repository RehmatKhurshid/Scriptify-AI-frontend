import React, { useRef } from 'react';
import { Sparkles, Image as ImageIcon, Settings, Trash2, Upload, RotateCw, FileText, Zap, Compass, Hash, AlignLeft } from 'lucide-react';
import styles from '../../styles/editor/PostSettingsPanel.module.css';

const EditPostSettingsPanel = ({
    thumbnail,
    onReplaceThumbnail,
    onRemoveThumbnail,
    onAIGenerateThumbnail,
    onRegenerateThumbnail,
    draftPrompt,
    onDraftPromptChange,
    onGenerateDraft,
    onSidebarToolClick,
    loadingFields = {}
}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Generate a local object URL for previewing the uploaded file
            const localUrl = URL.createObjectURL(file);
            onReplaceThumbnail(localUrl);
        }
    };

    const triggerFilePicker = () => {
        fileInputRef.current?.click();
    };

    const tools = [
        { id: 'titles', icon: <Zap size={14} />, label: 'Generate Titles', desc: 'Get catchy headline suggestions' },
        { id: 'improve', icon: <Compass size={14} />, label: 'Improve Content', desc: 'Optimize flow & vocabulary' },
        { id: 'seo', icon: <Hash size={14} />, label: 'Generate SEO Tags', desc: 'Create metadata & hashtags' },
        { id: 'summarize', icon: <AlignLeft size={14} />, label: 'Generate Summary', desc: 'Create an excerpt summary' },
        { id: 'thumbnail', icon: <ImageIcon size={14} />, label: 'Generate Thumbnail', desc: 'Design AI featured graphic' },
    ];

    return (
        <aside className={styles.panel} style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
            {/* Header */}
            <div className={styles.panelHeader}>
                <div className={styles.aiBadge}>
                    <Sparkles size={16} className={styles.aiIcon} />
                    <span>AI Blog Assistant</span>
                </div>
                <span className={styles.betaTag}>PRO</span>
            </div>

            {/* Generate Draft Section */}
            <div className={styles.section}>
                <label className={styles.sectionLabel}>Generate New Draft</label>
                <textarea
                    className={styles.ideaTextarea}
                    placeholder="Describe a new blog topic to regenerate the entire page... (Warning: replaces current content)"
                    rows={4}
                    value={draftPrompt}
                    onChange={(e) => onDraftPromptChange(e.target.value)}
                />
                <button 
                    className={styles.generateButton}
                    onClick={onGenerateDraft}
                    disabled={loadingFields.content || !draftPrompt.trim()}
                    style={{ 
                        marginTop: '8px', 
                        width: '100%',
                        opacity: (!draftPrompt.trim() || loadingFields.content) ? 0.6 : 1,
                        cursor: (!draftPrompt.trim() || loadingFields.content) ? 'not-allowed' : 'pointer'
                    }}
                >
                    <Sparkles size={16} />
                    <span>Generate Blog Draft</span>
                </button>
            </div>

            {/* AI Assistant Sidebar Quick Tools */}
            <div className={styles.section} style={{ borderTop: '1px solid #2d2d44', paddingTop: '16px' }}>
                <label className={styles.sectionLabel}>AI Quick Tools</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                    {tools.map(tool => (
                        <button
                            key={tool.id}
                            onClick={() => onSidebarToolClick(tool.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                width: '100%',
                                padding: '10px 12px',
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid #2d2d44',
                                borderRadius: '8px',
                                color: '#e2e8f0',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.05)';
                                e.currentTarget.style.borderColor = '#8b5cf6';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                e.currentTarget.style.borderColor = '#2d2d44';
                            }}
                        >
                            <span style={{ color: '#a78bfa', background: 'rgba(139, 92, 246, 0.1)', padding: '6px', borderRadius: '6px', display: 'flex' }}>
                                {tool.icon}
                            </span>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '13px', fontWeight: '500' }}>{tool.label}</span>
                                <span style={{ fontSize: '11px', color: '#64748b' }}>{tool.desc}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Thumbnail Section */}
            <div className={styles.sectionThumbnail} style={{ borderTop: '1px solid #2d2d44', paddingTop: '16px', marginBottom: '24px' }}>
                <label className={styles.sectionLabel}>Featured Thumbnail</label>
                
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                />

                {thumbnail ? (
                    <div style={{ position: 'relative', marginTop: '10px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #374151' }}>
                        <img 
                            src={thumbnail} 
                            alt="Featured Thumbnail" 
                            style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} 
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: 0, left: 0, right: 0,
                            background: 'rgba(15, 23, 42, 0.8)',
                            backdropFilter: 'blur(4px)',
                            padding: '6px 12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderTop: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <span style={{ fontSize: '11px', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>
                                Thumbnail.jpg
                            </span>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <button 
                                    onClick={triggerFilePicker}
                                    style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', padding: '2px', display: 'flex' }}
                                    title="Replace Image"
                                >
                                    <Upload size={14} />
                                </button>
                                <button 
                                    onClick={onRemoveThumbnail}
                                    style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', padding: '2px', display: 'flex' }}
                                    title="Remove Image"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div 
                        className={styles.dropzone} 
                        onClick={triggerFilePicker}
                        style={{ cursor: 'pointer', marginTop: '10px' }}
                    >
                        {loadingFields.thumbnail ? (
                            <Loader2 size={24} style={{ color: '#8b5cf6', animation: 'spin 1s linear infinite', marginBottom: '8px' }} />
                        ) : (
                            <ImageIcon size={24} className={styles.dropzoneIcon} />
                        )}
                        <span className={styles.dropzoneTitle}>
                            {loadingFields.thumbnail ? 'AI Generating Image...' : 'Drag & Drop or Click'}
                        </span>
                        <span className={styles.dropzoneSubtitle}>1200×630px recommended</span>
                    </div>
                )}

                <div className={styles.thumbnailActions} style={{ marginTop: '10px' }}>
                    <button 
                        className={styles.aiGenerateBtn} 
                        onClick={onAIGenerateThumbnail}
                        disabled={loadingFields.thumbnail}
                        style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '6px' }}
                    >
                        <Sparkles size={14} />
                        <span>AI Generate</span>
                    </button>
                    {thumbnail && (
                        <button 
                            className={styles.settingsBtn} 
                            onClick={onRegenerateThumbnail}
                            disabled={loadingFields.thumbnail}
                            title="Regenerate thumbnail image with AI"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <RotateCw size={14} className={loadingFields.thumbnail ? 'animate-spin' : ''} style={{ animation: loadingFields.thumbnail ? 'spin 1s linear infinite' : 'none' }} />
                        </button>
                    )}
                    <button 
                        className={styles.settingsBtn} 
                        onClick={triggerFilePicker} 
                        title="Manual Upload"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Upload size={16} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

// Simple loader helper inside component
const Loader2 = ({ size, style, ...props }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || 24} 
        height={size || 24} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        style={style} 
        {...props}
    >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

export default EditPostSettingsPanel;
