import React from 'react';
import styles from '../../../styles/landing/about/OurMission.module.css';

const OurMission = () => {
    return (
        <section className={styles.section}>
            <div className={styles.card}>
                <h2 className={styles.title}>Our Mission</h2>
                <p className={styles.subtitle}>Making Blogging Smarter for Everyone</p>
                <div className={styles.content}>
                    <p>
                        Our mission is to democratize high-impact publishing. We view AI not as a replacement for human thought, but as a collaborative partner—a co-pilot that amplifies your unique voice. Scriptify AI provides contextual suggestions, generates smart summaries, and ensures your content is structurally sound for the modern web, making professional-grade blogging accessible to everyone.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default OurMission;