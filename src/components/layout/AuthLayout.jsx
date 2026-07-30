import React from 'react';
import { FaFeatherAlt } from 'react-icons/fa';
import TestimonialCard from '../auth/TestimonialCard';
import AuthNavbar from '../auth/AuthNavbar';
import styles from '../../styles/layout/AuthLayout.module.css';

const AuthLayout = ({ children }) => {
    return (
        <div className={styles.container}>
            <AuthNavbar />
            {/* Full-screen wave background */}
            <div className={styles.waveBackground}>
                <svg
                    className={styles.waveSvg}
                    viewBox="0 0 1440 900"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0F766E" stopOpacity="0.9" />
                            <stop offset="50%" stopColor="#1E3A5F" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#0B0F1A" stopOpacity="0.2" />
                        </linearGradient>
                        <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1E3A5F" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#0F766E" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#0B0F1A" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="waveGrad3" x1="50%" y1="100%" x2="50%" y2="0%">
                            <stop offset="0%" stopColor="#0F766E" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#1E3A5F" stopOpacity="0.2" />
                        </linearGradient>
                        <radialGradient id="glowCenter" cx="30%" cy="60%" r="50%">
                            <stop offset="0%" stopColor="#0F766E" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#0B0F1A" stopOpacity="0" />
                        </radialGradient>
                        <filter id="blurHeavy" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="40" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <filter id="blurSoft" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="25" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Large ambient glow blob - bottom left */}
                    <ellipse cx="200" cy="700" rx="500" ry="350" fill="url(#glowCenter)" opacity="0.6" />

                    {/* Primary wave - sweeping across full width */}
                    <path
                        d="M-200 600 C 100 400, 400 500, 700 450 S 1200 350, 1600 500"
                        stroke="url(#waveGrad1)"
                        strokeWidth="100"
                        fill="none"
                        filter="url(#blurHeavy)"
                        opacity="0.7"
                    />

                    {/* Secondary wave - overlapping, lower */}
                    <path
                        d="M-100 750 C 200 550, 500 650, 800 600 S 1300 500, 1700 650"
                        stroke="url(#waveGrad2)"
                        strokeWidth="70"
                        fill="none"
                        filter="url(#blurSoft)"
                        opacity="0.5"
                    />

                    {/* Tertiary wave - subtle top accent */}
                    <path
                        d="M0 350 C 300 200, 600 300, 900 250 S 1400 150, 1800 300"
                        stroke="url(#waveGrad3)"
                        strokeWidth="45"
                        fill="none"
                        filter="url(#blurSoft)"
                        opacity="0.35"
                    />

                    {/* Thin accent lines for detail */}
                    <path
                        d="M-50 500 Q 400 300, 800 400 T 1500 350"
                        stroke="#0F766E"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.3"
                    />
                    <path
                        d="M100 650 Q 500 500, 900 550 T 1600 500"
                        stroke="#1E3A5F"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.25"
                    />

                    {/* Bottom gradient fade */}
                    <rect x="0" y="700" width="1440" height="200" fill="url(#waveGrad1)" opacity="0.15" filter="url(#blurHeavy)" />
                </svg>
            </div>

            {/* Content layer - floats above the wave */}
            <div className={styles.contentLayer}>
                {/* Left branding */}
                <div className={styles.leftPanel}>
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

                {/* Right form */}
                <div className={styles.rightPanel}>
                    <div className={styles.formWrapper}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;