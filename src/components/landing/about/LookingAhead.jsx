import React from 'react';
import styles from '../../../styles/landing/about/LookingAhead.module.css';

const LookingAhead = () => {
    return (
        <section className={styles.section}>
            <div className={styles.card}>
                <h2 className={styles.title}>Looking Ahead</h2>
                <div className={styles.content}>
                    <p>
                        We are continuously evolving. Our roadmap includes exciting new features such as advanced multilingual support to break down language barriers, real-time voice-to-text dictation for hands-free writing, and deeper integrations with popular CMS platforms. Our mission is simple: to make transforming the written word not just easier, but extraordinary. We are committed to pushing the boundaries of what is possible.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LookingAhead;
