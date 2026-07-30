import React from 'react';
import { FiFileText } from 'react-icons/fi';
import styles from '../../../styles/profile/edit/AboutMe.module.css';

const AboutMe = ({ bio, onChange }) => {
    const maxLength = 300;
    const currentBio = bio || '';

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <FiFileText className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>About Me</h3>
                <span className={styles.charCount}>{currentBio.length} / {maxLength}</span>
            </div>

            <textarea
                className={styles.textarea}
                value={currentBio}
                onChange={(e) => onChange('bio', e.target.value)}
                maxLength={maxLength}
                placeholder="Tell us a little bit about yourself..."
                rows={4}
            />
        </div>
    );
};

export default AboutMe;