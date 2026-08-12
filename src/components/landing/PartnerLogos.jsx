import React from 'react';
import { FaReact, FaGoogle, FaRobot } from 'react-icons/fa';
import { FiCode } from 'react-icons/fi';
import styles from '../../styles/landing/PartnerLogos.module.css';

const partners = [
    { id: 'react', icon: <FiCode />, label: 'React' },
    { id: 'openai', icon: <FaRobot />, label: 'OpenAI' },
    { id: 'google', icon: <FaGoogle />, label: 'Google AI' },
    { id: 'design', icon: <span className={styles.symbolIcon}>Å</span>, label: 'Design+' },
];

const PartnerLogos = () => {
    return (
        <section className={styles.section}>
            <p className={styles.heading}>POWERING NEXT-GEN EDITORIAL TEAMS</p>
            <div className={styles.logos}>
                {partners.map((partner) => (
                    <div key={partner.id} className={styles.logoItem}>
                        <span className={styles.logoIcon}>{partner.icon}</span>
                        <span className={styles.logoLabel}>{partner.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PartnerLogos;