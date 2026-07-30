import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../icons/Logo';
import styles from '../../styles/landing/LandingNavbar.module.css';

const LandingNavbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.inner}>
                {/* Left Side: Logo */}
                <div className={styles.left}>
                    <Link to="/" className={styles.brand}>
                        <Logo size={24} />
                        <span className={styles.brandName}>Scriptify AI</span>
                    </Link>
                </div>

                {/* Right Side: Sign In & Sign Up */}
                <div className={styles.right}>
                    <Link to="/signin" className={styles.signInLink}>
                        Sign In
                    </Link>
                    <Link to="/signup" className={styles.ctaButton}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default LandingNavbar;