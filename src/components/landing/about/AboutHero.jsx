import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/landing/about/AboutHero.module.css';

const AboutHero = () => {
    return (
        <section className={styles.hero}>
            <h1 className={styles.title}>
                Empowering Writers with Artificial Intelligence
            </h1>
            <p className={styles.subtitle}>
                Scriptify AI is an AI-powered blogging platform built to make writing, publishing, and discovering content faster, smarter, and more engaging. By combining the flexibility of modern blogging with the capabilities of artificial intelligence, we help creators focus on sharing ideas while AI handles the repetitive tasks.
            </p>
            <div className={styles.ctaGroup}>
                <Link to="/create" className={styles.ctaPrimary}>
                    Start Writing
                </Link>
                <Link to="/Home-Feed" className={styles.ctaSecondary}>
                    Explore Blogs
                </Link>
            </div>
        </section>
    );
};

export default AboutHero;