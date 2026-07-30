import React, { useRef } from 'react';
import { FiCamera, FiTrash2 } from 'react-icons/fi';
import Avatar from '../../common/Avatar';
import styles from '../../../styles/profile/edit/ProfilePicture.module.css';

const ProfilePicture = ({ avatarPreview, onAvatarChange, onAvatarRemove }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && onAvatarChange) {
            onAvatarChange(file);
        }
    };

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <FiCamera className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Profile Picture</h3>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />

            <div className={styles.content}>
                <div className={styles.avatarWrapper}>
                    <Avatar src={avatarPreview} alt="Profile Avatar" size="xl" />
                    <button
                        type="button"
                        className={styles.cameraButton}
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        title="Upload Avatar"
                    >
                        <FiCamera />
                    </button>
                </div>

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.uploadButton}
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    >
                        Upload new avatar
                    </button>
                    <button
                        type="button"
                        className={styles.removeButton}
                        onClick={onAvatarRemove}
                    >
                        <FiTrash2 />
                        Remove avatar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePicture;