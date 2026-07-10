import React from 'react';
import { FiEdit3, FiAlignLeft, FiSearch, FiImage, FiType, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styles from '../../styles/landing/FeaturesGrid.module.css';

const features = [
    {
        id: 'blog-writer',
        icon: <FiEdit3 />,
        title: 'AI Blog Writer',
        description: 'Generate complete, high-quality blog posts from a single prompt. Structure, tone, and logic are automatically optimized.',
        cta: 'Try Now',
        ctaLink: '/create',
        highlight: false,
    },
    {
        id: 'summarizer',
        icon: <FiAlignLeft />,
        title: 'AI Summarizer',
        description: 'Condense complex long-form articles, research papers, and transcripts into clear, scannable summaries with key takeaways.',
        cta: 'Learn More',
        ctaLink: '/features',
        highlight: false,
    },
    {
        id: 'seo',
        icon: <FiSearch />,
        title: 'SEO Optimization',
        description: 'Automatically generate high-impact keywords, meta descriptions, and structured data that search engines love.',
        cta: 'Optimize Now',
        ctaLink: '/features',
        highlight: false,
    },
    {
        id: 'image',
        icon: <FiImage />,
        title: 'AI Image',
        description: 'Create stunning featured images and illustrations that match your content tone and brand identity in seconds.',
        cta: 'Generate',
        ctaLink: '/features',
        highlight: false,
    },
    {
        id: 'editor',
        icon: <FiType />,
        title: 'Rich Text Editor',
        description: 'A distraction-free writing environment with markdown support, real-time collaboration, and smart formatting suggestions.',
        cta: 'Start Writing',
        ctaLink: '/create',
        highlight: false,
    },
    {
        id: 'personalized',
        icon: <FiUser />,
        title: 'Personalized Profile',
        description: 'Build your writer identity with custom themes, analytics dashboards, and a public portfolio of published works.',
        cta: 'View Profile',
        ctaLink: '/profile',
        highlight: true,
    },
];

const FeaturesGrid = () => {
    return (
        <section className={styles.section}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.badge}>
                    <span className={styles.badgeDot}></span>
                    ADVANCED EDITORIAL SUITE
                </div>
                <h1 className={styles.title}>
                    Features built for the{' '}
                    <span className={styles.gradientText}>future</span> of writing
                </h1>
                <p className={styles.subtitle}>
                    Unlock structural intelligence and creative flow with a suite of AI-driven tools designed to transform ideas into published impact.
                </p>
            </div>

            {/* Grid */}
            <div className={styles.grid}>
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className={`${styles.card} ${feature.highlight ? styles.highlighted : ''}`}
                    >
                        <div className={styles.cardHeader}>
                            <div className={styles.iconWrapper}>
                                {feature.icon}
                            </div>
                        </div>
                        <h3 className={styles.cardTitle}>{feature.title}</h3>
                        <p className={styles.cardDescription}>{feature.description}</p>
                        <Link to={feature.ctaLink} className={styles.cardCta}>
                            {feature.cta}
                            <span className={styles.ctaArrow}>→</span>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesGrid;