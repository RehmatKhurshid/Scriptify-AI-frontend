import React from 'react';
import styles from '../../styles/auth/TestimonialCard.module.css';

const TestimonialCard = () => {
    return (
        <div className={styles.card}>
            <blockquote className={styles.quote}>
                "The interface completely recedes, letting my ideas flow without friction. The AI feels like a silent, brilliant co-writer rather than an intrusive tool."
            </blockquote>
            <div className={styles.author}>
                <div className={styles.avatar}>
                    <span className={styles.avatarInitials}>DB</span>
                </div>
                <div className={styles.authorInfo}>
                    <p className={styles.authorName}>Diana Blackwood</p>
                    <p className={styles.authorTitle}>Lead Editor, Obscura</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;