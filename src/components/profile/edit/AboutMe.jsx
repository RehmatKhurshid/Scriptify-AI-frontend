import React, { useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import styles from '../../../styles/profile/edit/AboutMe.module.css';

const AboutMe = () => {
    const [bio, setBio] = useState('AI Enthusiast & Tech Blogger exploring the intersection of design, code, and generative intelligence. Based in San Francisco, building the future of editorial tools.');
    const maxLength = 300;

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <FiFileText className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>About Me</h3>
                <span className={styles.charCount}>{bio.length} / {maxLength}</span>
            </div>

            <textarea
                className={styles.textarea}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={maxLength}
                rows={4}
            />
        </div>
    );
};

export default AboutMe;