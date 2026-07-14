import React, { useState } from 'react';
import { FiCamera, FiTrash2 } from 'react-icons/fi';
import Avatar from '../../common/Avatar';
import styles from '../../../styles/profile/edit/ProfilePicture.module.css';

const ProfilePicture = () => {
    const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face');

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <FiCamera className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Profile Picture</h3>
            </div>

            <div className={styles.content}>
                <div className={styles.avatarWrapper}>
                    <Avatar src={avatar} alt="Profile" size="xl" />
                    <button className={styles.cameraButton}>
                        <FiCamera />
                    </button>
                </div>

                <div className={styles.actions}>
                    <button className={styles.uploadButton}>
                        Upload new avatar
                    </button>
                    <button className={styles.removeButton}>
                        <FiTrash2 />
                        Remove avatar
                    </button>
                </div>

                <p className={styles.hint}>
                    Recommended: Square JPG, PNG or WebP. Max 2MB.
                </p>
            </div>
        </div>
    );
};

export default ProfilePicture;