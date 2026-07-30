import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import Logo from '../components/icons/Logo';
import styles from '../styles/NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logoBadge}>
                    <Logo size={32} />
                    <span className={styles.brandName}>Scriptify AI</span>
                </div>

                <div className={styles.errorCode}>404</div>
                <h1 className={styles.title}>Page Not Found</h1>
                <p className={styles.description}>
                    The page you are looking for does not exist, has been removed, or requires authentication to access.
                </p>

                <div className={styles.actions}>
                    <Link to="/" className={styles.primaryBtn}>
                        <FiHome size={18} />
                        <span>Go to Home</span>
                    </Link>
                    <Link to="/signin" className={styles.secondaryBtn}>
                        <FiArrowLeft size={18} />
                        <span>Sign In</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
