// import React from 'react';
// import { FaReact } from 'react-icons/fa';
// import { SiOpenai, SiGoogle } from 'react-icons/si';
// import { FiFigma } from 'react-icons/fi';
// import styles from '../../styles/landing/PartnerLogos.module.css';

// const partners = [
//     { id: 'react', icon: <FaReact />, label: 'React' },
//     { id: 'openai', icon: <SiOpenai />, label: 'OpenAI' },
//     { id: 'google', icon: <SiGoogle />, label: 'Google AI', isText: true },
//     { id: 'figma', icon: <FiFigma />, label: 'Design+' },
// ];

// const PartnerLogos = () => {
//     return (
//         <section className={styles.section}>
//             <p className={styles.heading}>POWERING NEXT-GEN EDITORIAL TEAMS</p>
//             <div className={styles.logos}>
//                 {partners.map((partner) => (
//                     <div key={partner.id} className={styles.logoItem}>
//                         <span className={styles.logoIcon}>{partner.icon}</span>
//                         <span className={styles.logoLabel}>{partner.label}</span>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default PartnerLogos;
import React from 'react';
import { FaReact, FaGoogle, FaFigma } from 'react-icons/fa';
import styles from '../../styles/landing/PartnerLogos.module.css';

const partners = [
    { id: 'react', icon: <FaReact />, label: 'React' },
    { id: 'google', icon: <FaGoogle />, label: 'Google AI' },
    { id: 'figma', icon: <FaFigma />, label: 'Figma' },
    { id: 'ai', icon: <span>🤖</span>, label: 'OpenAI' },
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