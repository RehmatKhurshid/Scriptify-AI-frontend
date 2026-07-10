import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from '../icons/Logo';
import Button from '../common/Button';
import styles from '../../styles/landing/LandingNavbar.module.css';

const LandingNavbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { label: 'Explore', path: '/dashboard' },
        { label: 'Features', path: '/features' },
        { label: 'Community', path: '/community' },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <Link to="/" className={styles.brand}>
                        <Logo size={24} />
                        <span className={styles.brandName}>Scriptify AI</span>
                    </Link>

                    <div className={`${styles.navLinks} ${mobileOpen ? styles.mobileOpen : ''}`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className={styles.right}>
                    <Link to="/signin" className={styles.signInLink}>
                        Sign In
                    </Link>
                    <Link to="/signup">
                        <Button variant="primary" size="sm">
                            Get Started
                        </Button>
                    </Link>
                    <button
                        className={styles.mobileToggle}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default LandingNavbar;