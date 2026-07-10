import React from 'react';
import { FiUserPlus, FiPenTool, FiCheckCircle, FiShare2, FiTrendingUp } from 'react-icons/fi';
import styles from '../../../styles/landing/about/Workflow.module.css';

const steps = [
    {
        icon: <FiUserPlus />,
        title: 'Create an Account',
        description: 'Join our platform quickly and securely to start your journey.',
        align: 'left',
    },
    {
        icon: <FiPenTool />,
        title: 'Write with AI',
        description: 'Draft your content effortlessly with real-time AI assistance and suggestions.',
        align: 'right',
    },
    {
        icon: <FiCheckCircle />,
        title: 'Optimize Your Blog',
        description: 'Let our AI handle SEO, metadata, and structural optimization automatically.',
        align: 'left',
    },
    {
        icon: <FiShare2 />,
        title: 'Publish',
        description: 'Hit publish with confidence, knowing your content is polished and primed.',
        align: 'right',
    },
    {
        icon: <FiTrendingUp />,
        title: 'Reach More Readers',
        description: 'Grow your audience through our personalized feeds and community sharing.',
        align: 'left',
        highlighted: true,
    },
];

const Workflow = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Our Workflow</h2>
                <p className={styles.subtitle}>From idea to global audience in minutes.</p>
            </div>

            <div className={styles.timeline}>
                {/* Central vertical line */}
                <div className={styles.centerLine}></div>

                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`${styles.step} ${styles[step.align]} ${step.highlighted ? styles.highlighted : ''}`}
                    >
                        <div className={styles.stepContent}>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDescription}>{step.description}</p>
                        </div>
                        <div className={`${styles.stepIcon} ${step.highlighted ? styles.iconHighlighted : ''}`}>
                            {step.icon}
                        </div>
                        <div className={styles.stepSpacer}></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Workflow;