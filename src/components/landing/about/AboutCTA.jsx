import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/landing/about/AboutCTA.module.css';

const AboutCTA = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Ready to Start Your AI Writing Journey?</h2>
            <Link to="/signup" className={styles.ctaPrimary}>
                Get Started
            </Link>
        </section>
    );
};

export default AboutCTA;