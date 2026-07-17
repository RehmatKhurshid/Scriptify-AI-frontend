import React from 'react';
import LandingNavbar from '../../components/landing/LandingNavbar';
import EditProfileHeader from '../../components/profile/edit/EditProfileHeader';
import ProfilePicture from '../../components/profile/edit/ProfilePicture';
import PersonalInfo from '../../components/profile/edit/PersonalInfo';
import AboutMe from '../../components/profile/edit/AboutMe';
import ReadingPreferences from '../../components/profile/edit/ReadingPreferences';
import SecuritySettings from '../../components/profile/edit/SecuritySettings';
import DangerZone from '../../components/profile/edit/DangerZone';
import LivePreview from '../../components/profile/edit/LivePreview';
import styles from '../../styles/profile/edit/EditProfile.module.css';

const EditProfile = () => {
    return (
        <div className={styles.container}>
            <LandingNavbar />

            <main className={styles.main}>
                <div className={styles.content}>
                    <EditProfileHeader />

                    <div className={styles.grid}>
                        <div className={styles.leftColumn}>
                            <ProfilePicture />
                            <PersonalInfo />
                            <AboutMe />
                            <ReadingPreferences />
                            <SecuritySettings />
                            <DangerZone />
                        </div>

                        <div className={styles.rightColumn}>
                            <LivePreview />
                        </div>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p className={styles.footerHint}>
                        <span className={styles.footerDot}></span>
                        Unsaved changes detected. Remember to save your profile.
                    </p>
                    <div className={styles.footerActions}>
                        <button className={styles.cancelButton}>Cancel</button>
                        <button className={styles.resetButton}>Reset Changes</button>
                        <button className={styles.saveButton}>Save Changes</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EditProfile;