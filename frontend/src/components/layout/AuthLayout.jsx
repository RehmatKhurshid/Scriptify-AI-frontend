import React from 'react';
import { FaFeatherAlt } from 'react-icons/fa';
import TestimonialCard from '../auth/TestimonialCard';
import styles from '../../styles/layout/AuthLayout.module.css';

const AuthLayout = ({ children, formSide = 'right' }) => {
    return (
        <div className={styles.container}>
            {/* Left Panel - Branding */}
            <div className={styles.leftPanel}>
                <div className={styles.backgroundEffect}></div>

                <div className={styles.leftContent}>
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            <FaFeatherAlt className={styles.logoIcon} />
                        </div>
                        <span className={styles.brandName}>Scriptify AI</span>
                    </div>

                    <div className={styles.tagline}>
                        <p className={styles.taglineMain}>Magical Minimalism for Creators.</p>
                        <p className={styles.taglineSub}>
                            Experience focused editorial workflows powered by subtle, structural intelligence.
                        </p>
                    </div>

                    <div className={styles.testimonialWrapper}>
                        <TestimonialCard />
                    </div>
                </div>

                {/* Abstract Wave SVG Background */}
                <svg
                    className={styles.waveSvg}
                    viewBox="0 0 800 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1E3A5F" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#0F766E" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#1E3A5F" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="waveGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#0F766E" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#1E3A5F" stopOpacity="0.2" />
                        </linearGradient>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="20" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Main wave shape */}
                    <path
                        d="M-100 400 Q 100 200, 300 350 T 700 300 T 900 400"
                        stroke="url(#waveGradient1)"
                        strokeWidth="60"
                        fill="none"
                        filter="url(#glow)"
                        opacity="0.6"
                    />
                    <path
                        d="M-100 450 Q 150 250, 350 400 T 750 350 T 950 450"
                        stroke="url(#waveGradient2)"
                        strokeWidth="40"
                        fill="none"
                        filter="url(#glow)"
                        opacity="0.4"
                    />
                    <path
                        d="M-50 500 Q 200 350, 400 450 T 800 400 T 1000 500"
                        stroke="url(#waveGradient1)"
                        strokeWidth="30"
                        fill="none"
                        filter="url(#glow)"
                        opacity="0.3"
                    />
                </svg>
            </div>

            {/* Right Panel - Form */}
            <div className={styles.rightPanel}>
                <div className={styles.formWrapper}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;