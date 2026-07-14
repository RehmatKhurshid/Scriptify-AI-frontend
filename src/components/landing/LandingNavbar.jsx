import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from '../icons/Logo';
import styles from '../../styles/landing/LandingNavbar.module.css';

const LandingNavbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { label: 'Explore', path: '/Home-Feed' },
        { label: 'Features', path: '/features' },
        { label: 'About', path: '/about' },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <Link to="/" className={styles.brand} onClick={() => setMobileOpen(false)}>
                        <Logo size={24} />
                        <span className={styles.brandName}>Scriptify AI</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Desktop Actions */}
                <div className={styles.right}>
                    <Link to="/signin" className={styles.signInLink}>
                        Sign In
                    </Link>
                    <Link to="/signup" className={styles.ctaButton}>
                        Get Started
                    </Link>
                    <button
                        className={styles.mobileToggle}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
                <div className={styles.mobileNavLinks}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`${styles.mobileNavLink} ${isActive(link.path) ? styles.mobileActive : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className={styles.mobileDivider}></div>
                    <Link to="/signin" className={styles.mobileSignInLink} onClick={() => setMobileOpen(false)}>
                        Sign In
                    </Link>
                    <Link to="/signup" className={styles.mobileCtaButton} onClick={() => setMobileOpen(false)}>
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default LandingNavbar;