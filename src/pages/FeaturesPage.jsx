import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import FeaturesGrid from '../components/landing/FeaturesGrid';
import PartnerLogos from '../components/landing/PartnerLogos';
import styles from '../styles/landing/FeaturesPage.module.css';

const FeaturesPage = () => {
    return (
        <div className={styles.container}>
            {/* Background effects */}
            <div className={styles.bgGlowTop}></div>
            <div className={styles.bgGlowCenter}></div>

            <LandingNavbar />

            <main className={styles.main}>
                <FeaturesGrid />
            </main>

            <PartnerLogos />
        </div>
    );
};

export default FeaturesPage;