import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '../../icons/Logo';
import styles from '../../../styles/profile/edit/EditProfileNavbar.module.css';

const EditProfileNavbar = () => {
    return (
        <header className={styles.navbar}>
            <div className={styles.inner}>
                {/* Left Side: Logo */}
                <Link to="/Home-Feed" className={styles.brand}>
                    <Logo size={24} />
                    <span className={styles.brandName}>Scriptify AI</span>
                </Link>

                {/* Right Side: Back to Profile */}
                <div className={styles.rightActions}>
                    <Link to="/profile" className={styles.backLink}>
                        <FiArrowLeft className={styles.arrowIcon} />
                        <span>Back to Profile</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default EditProfileNavbar;
