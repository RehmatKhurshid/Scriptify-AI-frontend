import React from 'react';
import LandingNavbar from '../../components/landing/LandingNavbar';
import HeroSection from '../../components/landing/HeroSection';
import DashboardPreview from '../../components/landing/DashboardPreview';
import PartnerLogos from '../../components/landing/PartnerLogos';
import styles from '../../styles/landing/LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={styles.container}>
            {/* Background glow effects */}
            <div className={styles.bgGlowTop}></div>
            <div className={styles.bgGlowBottom}></div>

            <LandingNavbar />

            <main className={styles.main}>
                <div className={styles.heroRow}>
                    <HeroSection />
                    <DashboardPreview />
                </div>
            </main>

            <PartnerLogos />
        </div>
    );
};

export default LandingPage;