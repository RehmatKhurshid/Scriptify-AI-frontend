import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAvatarUrl } from '../../utils/avatar';
import styles from '../../styles/editor/EditorNavbar.module.css';

const EditorNavbar = ({ activeTab = 'editor', activeTabLabel = 'Create Blog', onPublish, onSaveDraft, loading }) => {
    const { user } = useAuth();
    const userAvatar = getAvatarUrl(user, user?.firstName || 'User');

    const isCreateBlogTab = activeTab === 'editor';

    return (
        <header className={styles.navbar}>
            {/* Left Side: Home Feed > [Active Tab Label] */}
            <div className={styles.leftSection}>
                <Link to="/Home-Feed" className={styles.homeLink}>
                    <Home size={16} />
                    <span>Home Feed</span>
                </Link>
                <span className={styles.breadcrumbSeparator}>&gt;</span>
                <span className={styles.breadcrumbActive}>{activeTabLabel}</span>
            </div>

            {/* Right Side */}
            <div className={styles.rightSection}>
                {isCreateBlogTab && (
                    <>
                        <button
                            type="button"
                            className={styles.previewButton}
                            onClick={() => onSaveDraft && onSaveDraft()}
                            disabled={loading}
                        >
                            Save Draft
                        </button>
                        <button
                            type="button"
                            className={styles.publishButton}
                            onClick={() => onPublish && onPublish()}
                            disabled={loading}
                        >
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <RefreshCw style={{ animation: 'spin 1s linear infinite' }} size={14} />
                                    Publishing...
                                </span>
                            ) : (
                                'Publish'
                            )}
                        </button>
                    </>
                )}
                <Link to="/profile" className={styles.profileLink} title="Profile">
                    <img src={userAvatar} alt="Profile" className={styles.avatarImg} />
                </Link>
            </div>
        </header>
    );
};

export default EditorNavbar;