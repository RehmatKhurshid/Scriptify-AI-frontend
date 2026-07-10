import React from 'react';
import { FiPenTool, FiBookOpen, FiCode } from 'react-icons/fi';
import styles from '../../../styles/landing/about/TargetAudience.module.css';

const audiences = [
    {
        icon: <FiPenTool />,
        title: 'Writers',
        description: 'Bloggers, journalists, and storytellers looking to elevate their craft with AI-powered assistance.',
    },
    {
        icon: <FiBookOpen />,
        title: 'Readers',
        description: 'Content enthusiasts who want AI-curated reading experiences tailored to their interests.',
    },
    {
        icon: <FiCode />,
        title: 'Developers & Learners',
        description: 'Technical writers, documentation specialists, and lifelong learners creating educational content.',
    },
];

const TargetAudience = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Who Is Scriptify AI For?</h2>
            </div>
            <div className={styles.grid}>
                {audiences.map((audience, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.iconWrapper}>{audience.icon}</div>
                        <h3 className={styles.cardTitle}>{audience.title}</h3>
                        <p className={styles.cardDescription}>{audience.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TargetAudience;