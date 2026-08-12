import React from 'react';
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

                        <filter id="blurHeavy" x="-10%" y="-10%" width="120%" height="120%">
                            <feGaussianBlur stdDeviation="30" />
                        </filter>
                    </defs>

                    <rect width="1440" height="900" fill="#0B0F1A" />
                    <path
                        d="M -100 350 Q 300 200, 700 300 T 1500 250"
                        stroke="#0F766E"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.3"
                    />
                    <path
                        d="M -100 450 Q 400 300, 800 400 T 1600 350"
                        stroke="#8B5CF6"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.2"
                    />
                    <path
                        d="M 0 500 Q 500 350, 1000 450 T 1600 400"
                        fill="url(#waveGrad1)"
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
                    <div className={styles.taglineCard}>
                        <p className={styles.taglineMain}>Magical Minimalism for Creators.</p>
                        <p className={styles.taglineSub}>
                            Experience focused editorial workflows powered by subtle AI. From automated Groq drafts to Gemini covers and personalized feeds, Scriptify AI recedes so your ideas flow.
                        </p>
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