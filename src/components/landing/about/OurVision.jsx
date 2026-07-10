import React from 'react';
import styles from '../../../styles/landing/about/OurVision.module.css';

const OurVision = () => {
    return (
        <section className={styles.section}>
            <div className={styles.card}>
                <h2 className={styles.title}>Our Vision</h2>
                <p className={styles.subtitle}>The Future of AI-Assisted Blogging</p>
                <div className={styles.content}>
                    <p>
                        We envision a future where the barrier between a brilliant idea and a published, widely-read article is entirely seamless. AI will not write for us; it will elevate our writing. The future of blogging is collaborative, blending human intuition, emotion, and lived experience with the speed, structural perfection, and analytical power of artificial intelligence. We are building that future today.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default OurVision;