import React from 'react';
import { FiZap, FiHeart, FiUsers, FiGlobe } from 'react-icons/fi';
import styles from '../../../styles/landing/about/CoreValues.module.css';

const values = [
    {
        icon: <FiZap />,
        title: 'Innovation',
        description: 'Constantly pushing the boundaries of what AI can do for writers and creators.',
    },
    {
        icon: <FiHeart />,
        title: 'Creativity',
        description: 'Preserving human imagination while enhancing it with intelligent tools.',
    },
    {
        icon: <FiUsers />,
        title: 'Accessibility',
        description: 'Making professional-grade writing tools available to everyone, everywhere.',
    },
    {
        icon: <FiGlobe />,
        title: 'Community',
        description: 'Building a supportive ecosystem where writers learn, grow, and inspire.',
    },
];

const CoreValues = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Our Core Values</h2>
                <p className={styles.subtitle}>The principles that guide our development.</p>
            </div>
            <div className={styles.grid}>
                {values.map((value, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.iconWrapper}>{value.icon}</div>
                        <h3 className={styles.cardTitle}>{value.title}</h3>
                        <p className={styles.cardDescription}>{value.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CoreValues;