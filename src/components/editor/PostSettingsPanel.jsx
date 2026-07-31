import React, { useState, useRef } from 'react';
import { Sparkles, Upload, X, Loader2 } from 'lucide-react';
import styles from '../../styles/editor/PostSettingsPanel.module.css';

const PostSettingsPanel = ({
    manualImageFile,
    manualImagePreview,
    onManualImageSelect,
    onRemoveManualImage,
    aiThumbnailPreview,
    onGenerateThumbnail,
    onRemoveAiThumbnail,
    onGenerateDraft,
    aiLoading = {},
}) => {
    const manualFileInputRef = useRef(null);
    const [ideaText, setIdeaText] = useState('');
    const [isDraggingManual, setIsDraggingManual] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && onManualImageSelect) {
            onManualImageSelect(file);
        }
        if (e.target) e.target.value = '';
    };

    const handleDragOverManual = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingManual(true);
    };

    const handleDragLeaveManual = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingManual(false);
    };

    const handleDropManual = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingManual(false);
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/') && onManualImageSelect) {
                onManualImageSelect(file);
            }
        }
    };

    const handleDraftClick = () => {
        if (!ideaText.trim()) {
            alert('Please enter a blog idea or topic to generate a draft.');
            return;
        }
        if (onGenerateDraft) {
            onGenerateDraft(ideaText.trim());
        }
    };

    const handleThumbnailClick = () => {
        if (onGenerateThumbnail) {
            onGenerateThumbnail(ideaText.trim());
        }
    };

    return (
        <aside className={styles.panel}>
            {/* Header */}
            <div className={styles.panelHeader}>
                <div className={styles.aiBadge}>
                    <Sparkles size={16} className={styles.aiIcon} />
                    <span>AI Blog Assistant</span>
                </div>
                <span className={styles.betaTag}>READY</span>
            </div>

            {/* 1. Generate Draft Section */}
            <div className={styles.section}>
                <label className={styles.sectionLabel}>Generate Draft</label>
                <textarea
                    className={styles.ideaTextarea}
                    placeholder="Describe your blog idea... (e.g. A post about the future of AI in frontend design)"
                    rows={3}
                    value={ideaText}
                    onChange={(e) => setIdeaText(e.target.value)}
                />
            </div>

            <button
                className={styles.generateButton}
                type="button"
                onClick={handleDraftClick}
                disabled={aiLoading.draft}
            >
                {aiLoading.draft ? (
                    <Loader2 size={16} className={styles.spinIcon} />
                ) : (
                    <Sparkles size={16} />
                )}
                <span>{aiLoading.draft ? 'Generating Draft...' : 'Generate Blog Draft'}</span>
            </button>

            {/* 2. Manual Image Upload Section */}
            <div className={styles.sectionThumbnail} style={{ marginTop: '24px' }}>
                <label className={styles.sectionLabel}>Image Upload (Manual)</label>

                <input
                    type="file"
                    ref={manualFileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />

                {manualImagePreview ? (
                    <div style={{ position: 'relative', marginTop: '8px' }}>
                        <img
                            src={manualImagePreview}
                            alt="Manual Image Preview"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";
                            }}
                            style={{
                                width: '100%',
                                height: '140px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                display: 'block',
                            }}
                        />
                        <button
                            type="button"
                            onClick={onRemoveManualImage}
                            style={{
                                position: 'absolute',
                                top: '6px',
                                right: '6px',
                                background: 'rgba(0, 0, 0, 0.8)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '26px',
                                height: '26px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}
                            title="Remove manual image"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ) : (
                    <div
                        className={`${styles.dropzone} ${isDraggingManual ? styles.dropzoneActive : ''}`}
                        onClick={() => manualFileInputRef.current && manualFileInputRef.current.click()}
                        onDragOver={handleDragOverManual}
                        onDragLeave={handleDragLeaveManual}
                        onDrop={handleDropManual}
                        style={{ cursor: 'pointer' }}
                    >
                        <Upload size={22} className={styles.dropzoneIcon} />
                        <span className={styles.dropzoneTitle}>Upload Custom File</span>
                        <span className={styles.dropzoneSubtitle}>Drag & drop or click to browse</span>
                    </div>
                )}

                <div className={styles.thumbnailActions} style={{ marginTop: '10px' }}>
                    <button
                        className={styles.uploadBtn}
                        type="button"
                        onClick={() => manualFileInputRef.current && manualFileInputRef.current.click()}
                        style={{ width: '100%' }}
                    >
                        <Upload size={14} />
                        <span>{manualImagePreview ? 'Change Image File' : 'Choose Image File'}</span>
                    </button>
                </div>
            </div>

            {/* 3. Featured Thumbnail (AI Generator) */}
            <div className={styles.sectionThumbnail} style={{ marginTop: '24px' }}>
                <label className={styles.sectionLabel}>Featured Thumbnail (AI)</label>

                {aiThumbnailPreview ? (
                    <div style={{ position: 'relative', marginTop: '8px' }}>
                        <img
                            src={aiThumbnailPreview}
                            alt="AI Thumbnail Preview"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80";
                            }}
                            style={{
                                width: '100%',
                                height: '140px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                display: 'block',
                            }}
                        />
                        <button
                            type="button"
                            onClick={onRemoveAiThumbnail}
                            style={{
                                position: 'absolute',
                                top: '6px',
                                right: '6px',
                                background: 'rgba(0, 0, 0, 0.8)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '26px',
                                height: '26px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}
                            title="Remove AI thumbnail"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ) : (
                    <div
                        className={styles.dropzone}
                        onClick={handleThumbnailClick}
                        style={{ cursor: 'pointer' }}
                    >
                        <Sparkles size={22} className={styles.dropzoneIcon} style={{ color: '#a855f7' }} />
                        <span className={styles.dropzoneTitle}>AI Cover Graphic</span>
                        <span className={styles.dropzoneSubtitle}>Generate thumbnail matching title</span>
                    </div>
                )}

                <div className={styles.thumbnailActions} style={{ marginTop: '10px' }}>
                    <button
                        className={styles.aiGenerateBtn}
                        type="button"
                        onClick={handleThumbnailClick}
                        disabled={aiLoading.thumbnail}
                        title="Generate AI cover matching title"
                        style={{ width: '100%' }}
                    >
                        {aiLoading.thumbnail ? (
                            <Loader2 size={14} className={styles.spinIcon} />
                        ) : (
                            <Sparkles size={14} />
                        )}
                        <span>{aiLoading.thumbnail ? 'AI Generating Cover...' : 'Generate AI Thumbnail'}</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default PostSettingsPanel;