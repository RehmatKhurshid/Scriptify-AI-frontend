import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '../icons/Logo';
import styles from '../../styles/auth/AuthNavbar.module.css';

const AuthNavbar = () => {
    return (
        <header className={styles.navbar}>
            <div className={styles.inner}>
                {/* Left Side: Logo */}
                <Link to="/" className={styles.brand}>
                    <Logo size={24} />
                    <span className={styles.brandName}>Scriptify AI</span>
                </Link>

                {/* Right Side: Back to Home */}
                <div className={styles.rightActions}>
                    <Link to="/" className={styles.backHome}>
                        <FiArrowLeft className={styles.arrowIcon} />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default AuthNavbar;
