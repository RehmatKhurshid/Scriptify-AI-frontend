import React, { useState, useRef } from 'react';
import { Sparkles, Image as ImageIcon, Upload, X, Loader2 } from 'lucide-react';
import styles from '../../styles/editor/PostSettingsPanel.module.css';

const PostSettingsPanel = ({
    thumbnailFile,
    thumbnailPreview,
    onThumbnailSelect,
    onRemoveThumbnail,
    onGenerateDraft,
    onGenerateThumbnail,
    aiLoading = {},
}) => {
    const manualFileInputRef = useRef(null);
    const thumbnailFileInputRef = useRef(null);
    const [ideaText, setIdeaText] = useState('');
    const [isDraggingManual, setIsDraggingManual] = useState(false);
    const [isDraggingThumbnail, setIsDraggingThumbnail] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && onThumbnailSelect) {
            onThumbnailSelect(file);
        }
    };

    // Drag and drop for Manual Image Upload section
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
            if (file.type.startsWith('image/') && onThumbnailSelect) {
                onThumbnailSelect(file);
            }
        }
    };

    // Drag and drop for Thumbnail section
    const handleDragOverThumbnail = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingThumbnail(true);
    };

    const handleDragLeaveThumbnail = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingThumbnail(false);
    };

    const handleDropThumbnail = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingThumbnail(false);
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/') && onThumbnailSelect) {
                onThumbnailSelect(file);
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
            <div className={styles.sectionThumbnail}>
                <label className={styles.sectionLabel}>Image Upload (Manual)</label>

                <input
                    type="file"
                    ref={manualFileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />

                <div
                    className={`${styles.dropzone} ${isDraggingManual ? styles.dropzoneActive : ''}`}
                    onClick={() => manualFileInputRef.current && manualFileInputRef.current.click()}
                    onDragOver={handleDragOverManual}
                    onDragLeave={handleDragLeaveManual}
                    onDrop={handleDropManual}
                    style={{ cursor: 'pointer' }}
                >
                    <Upload size={22} className={styles.dropzoneIcon} />
                    <span className={styles.dropzoneTitle}>Upload Image File</span>
                    <span className={styles.dropzoneSubtitle}>Drag & drop or click to browse</span>
                </div>

                <div className={styles.thumbnailActions}>
                    <button
                        className={styles.uploadBtn}
                        type="button"
                        onClick={() => manualFileInputRef.current && manualFileInputRef.current.click()}
                    >
                        <Upload size={14} />
                        <span>Choose File</span>
                    </button>
                </div>
            </div>

            {/* 3. Featured Thumbnail Section (AI & Preview) */}
            <div className={styles.sectionThumbnail} style={{ marginTop: '20px' }}>
                <label className={styles.sectionLabel}>Featured Thumbnail (AI)</label>

                <input
                    type="file"
                    ref={thumbnailFileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />

                {thumbnailPreview ? (
                    <div style={{ position: 'relative', marginTop: '8px' }}>
                        <img
                            src={thumbnailPreview}
                            alt="Generated Thumbnail"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";
                            }}
                            style={{
                                width: '100%',
                                height: '130px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        />
                        <button
                            type="button"
                            onClick={onRemoveThumbnail}
                            style={{
                                position: 'absolute',
                                top: '6px',
                                right: '6px',
                                background: 'rgba(0,0,0,0.75)',
                                border: 'none',
                                color: '#fff',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}
                            title="Remove image"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ) : (
                    <div
                        className={`${styles.dropzone} ${isDraggingThumbnail ? styles.dropzoneActive : ''}`}
                        onClick={() => thumbnailFileInputRef.current && thumbnailFileInputRef.current.click()}
                        onDragOver={handleDragOverThumbnail}
                        onDragLeave={handleDragLeaveThumbnail}
                        onDrop={handleDropThumbnail}
                        style={{ cursor: 'pointer' }}
                    >
                        <ImageIcon size={22} className={styles.dropzoneIcon} />
                        <span className={styles.dropzoneTitle}>Thumbnail Preview</span>
                        <span className={styles.dropzoneSubtitle}>Use AI or select custom thumbnail</span>
                    </div>
                )}

                <div className={styles.thumbnailActions}>
                    <button
                        className={styles.aiGenerateBtn}
                        type="button"
                        onClick={handleThumbnailClick}
                        disabled={aiLoading.thumbnail}
                        title="Generate thumbnail using AI"
                    >
                        {aiLoading.thumbnail ? (
                            <Loader2 size={14} className={styles.spinIcon} />
                        ) : (
                            <Sparkles size={14} />
                        )}
                        <span>{aiLoading.thumbnail ? 'Generating...' : 'AI Generate'}</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default PostSettingsPanel;