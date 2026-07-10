import React from 'react';
import { FiCode, FiServer, FiCpu } from 'react-icons/fi';
import styles from '../../../styles/landing/about/TechStack.module.css';

const stacks = [
    {
        icon: <FiCode />,
        title: 'Frontend',
        items: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    },
    {
        icon: <FiServer />,
        title: 'Backend',
        items: ['Node.js', 'GraphQL', 'PostgreSQL', 'Redis Cache'],
    },
    {
        icon: <FiCpu />,
        title: 'AI Technologies',
        items: ['OpenAI GPT-4', 'Google Gemini', 'Hugging Face', 'Claude AI'],
    },
];

const TechStack = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Built With Modern Technologies</h2>
            <p className={styles.subtitle}>The stack that powers our platform.</p>
            <div className={styles.grid}>
                {stacks.map((stack, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconWrapper}>{stack.icon}</div>
                            <h3 className={styles.cardTitle}>{stack.title}</h3>
                        </div>
                        <ul className={styles.list}>
                            {stack.items.map((item, i) => (
                                <li key={i} className={styles.listItem}>
                                    <span className={styles.bullet}></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechStack;