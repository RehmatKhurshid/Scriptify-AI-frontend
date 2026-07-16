import React from 'react';
import { Cloud, ArrowLeft, Eye, Check, FileCheck, Send, X } from 'lucide-react';
import navbarStyles from '../../styles/editor/EditorNavbar.module.css';

const EditBlogNavbar = ({
    title,
    saveStatus,
    onSaveChanges,
    onSaveAsDraft,
    onPreview,
    onPublishUpdates,
    onCancel
}) => {
    // Truncate title for breadcrumb if too long
    const displayTitle = title 
        ? (title.length > 25 ? title.substring(0, 25) + '...' : title) 
        : 'Untitled Blog';

    return (
        <header className={navbarStyles.navbar}>
            <div className={navbarStyles.leftSection}>
                <button 
                    onClick={onCancel}
                    className={navbarStyles.previewButton}
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #374151'
                    }}
                    title="Cancel editing"
                >
                    <ArrowLeft size={14} />
                    <span>Cancel</span>
                </button>
                <span className={navbarStyles.breadcrumbSeparator}>/</span>
                <span className={navbarStyles.breadcrumbLink} onClick={onCancel}>Blogs</span>
                <span className={navbarStyles.breadcrumbSeparator}>/</span>
                <span className={navbarStyles.breadcrumbActive}>Edit: "{displayTitle}"</span>
            </div>

            <div className={navbarStyles.rightSection} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Auto Save Status */}
                <div className={navbarStyles.saveStatus} style={{ marginRight: '16px' }}>
                    <Cloud 
                        size={16} 
                        className={navbarStyles.saveIcon} 
                        style={{ 
                            color: saveStatus === 'saving' ? '#8b5cf6' : '#64748b',
                            animation: saveStatus === 'saving' ? 'spin 1s linear infinite' : 'none'
                        }} 
                    />
                    <span>
                        {saveStatus === 'saving' && 'Saving...'}
                        {saveStatus === 'saved' && 'Saved just now'}
                        {saveStatus === 'idle' && 'Unsaved changes'}
                    </span>
                </div>

                {/* Preview Button */}
                <button 
                    className={navbarStyles.previewButton} 
                    onClick={onPreview}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '6px', padding: '8px 14px' }}
                >
                    <Eye size={14} />
                    <span>Preview</span>
                </button>

                {/* Save as Draft */}
                <button 
                    className={navbarStyles.previewButton} 
                    onClick={onSaveAsDraft}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '6px', padding: '8px 14px' }}
                >
                    <FileCheck size={14} />
                    <span>Save as Draft</span>
                </button>

                {/* Save Changes */}
                <button 
                    className={navbarStyles.publishButton} 
                    onClick={onSaveChanges}
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        borderRadius: '6px', 
                        padding: '8px 16px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    }}
                >
                    <Check size={14} />
                    <span>Save Changes</span>
                </button>

                {/* Publish Updates */}
                <button 
                    className={navbarStyles.publishButton} 
                    onClick={onPublishUpdates}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '6px', padding: '8px 16px' }}
                >
                    <Send size={14} />
                    <span>Publish Updates</span>
                </button>
            </div>
        </header>
    );
};

export default EditBlogNavbar;
