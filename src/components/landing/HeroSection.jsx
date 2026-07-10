import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import styles from '../../styles/landing/HeroSection.module.css';

const HeroSection = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.badge}>
                <span className={styles.badgeDot}></span>
                AI-POWERED EDITORIAL WORKFLOW
            </div>

            <h1 className={styles.title}>
                Write Smarter with{' '}
                <span className={styles.gradientText}>Structural Intelligence</span>
            </h1>

            <p className={styles.subtitle}>
                Experience focused workflows powered by subtle AI. From generative drafts to SEO-ready masterpieces, Scriptify AI recedes to let your ideas flow.
            </p>

            <div className={styles.ctaGroup}>
                <Link to="/signup">
                    <Button variant="primary" size="md" className={styles.ctaPrimary}>
                        Get Started Free
                    </Button>
                </Link>
                <Link to="/" className={styles.ctaSecondary}>
                    <span>Explore Blogs</span>
                    <FiArrowUpRight className={styles.ctaIcon} />
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;