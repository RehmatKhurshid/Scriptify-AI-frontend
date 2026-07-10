import React from 'react';
import { FiEdit3, FiAlignLeft, FiSearch, FiImage, FiBarChart2, FiBookOpen } from 'react-icons/fi';
import styles from '../../../styles/landing/about/Differentiators.module.css';

const items = [
    {
        icon: <FiEdit3 />,
        title: 'AI Writing Assistant',
        description: 'Context-aware suggestions that refine your tone, fix grammar, and enhance readability in real-time.',
    },
    {
        icon: <FiAlignLeft />,
        title: 'Smart Summarization',
        description: 'Automatically generate concise, accurate summaries from long-form content while preserving key insights.',
    },
    {
        icon: <FiSearch />,
        title: 'SEO Optimization',
        description: 'Built-in keyword analysis and readability scoring ensure your content ranks well without compromising quality.',
    },
    {
        icon: <FiImage />,
        title: 'AI Cover Image Generation',
        description: 'Instantly generate high-quality featured images tailored to your content theme, mood, and subject.',
    },
    {
        icon: <FiBarChart2 />,
        title: 'Sentiment Analysis',
        description: 'Gauge the emotional impact of your writing and adjust tone to better resonate with your intended audience.',
    },
    {
        icon: <FiBookOpen />,
        title: 'Personalized Reading Feed',
        description: 'An AI-curated reading experience that learns your preferences, highlighting the most relevant content.',
    },
];

const Differentiators = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>What Makes Scriptify AI Different?</h2>
                <p className={styles.subtitle}>Tools designed for the modern editorial workflow.</p>
            </div>
            <div className={styles.grid}>
                {items.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.iconWrapper}>{item.icon}</div>
                        <h3 className={styles.cardTitle}>{item.title}</h3>
                        <p className={styles.cardDescription}>{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Differentiators;