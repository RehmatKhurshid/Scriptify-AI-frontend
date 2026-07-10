import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import AboutHero from '../components/landing/about/AboutHero';
import OurStory from '../components/landing/about/OurStory';
import OurMission from '../components/landing/about/OurMission';
import Differentiators from '../components/landing/about/Differentiators';
import OurVision from '../components/landing/about/OurVision';
import TechStack from '../components/landing/about/TechStack';
import CoreValues from '../components/landing/about/CoreValues';
import Workflow from '../components/landing/about/Workflow';
import TargetAudience from '../components/landing/about/TargetAudience';
import AboutCTA from '../components/landing/about/AboutCTA';
import styles from '../styles/landing/AboutPage.module.css';
import LookingAhead from '../components/landing/about/LookingAhead';

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.bgGlowTop}></div>
            <div className={styles.bgGlowMid}></div>

            <LandingNavbar />

            <main className={styles.main}>
                <AboutHero />
                <OurStory />
                <OurMission />
                <Differentiators />
                <OurVision />
                <TechStack />
                <CoreValues />
                <Workflow />
                <TargetAudience />
                <LookingAhead />

                <AboutCTA />
            </main>
        </div>
    );
};

export default AboutPage;