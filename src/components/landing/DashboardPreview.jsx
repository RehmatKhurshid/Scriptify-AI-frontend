// import React from 'react';
// import { FiSparkles } from 'react-icons/fi';
// import styles from '../../styles/landing/DashboardPreview.module.css';

// const DashboardPreview = () => {
//     return (
//         <div className={styles.preview}>
//             <div className={styles.window}>
//                 {/* Window controls */}
//                 <div className={styles.windowHeader}>
//                     <div className={styles.windowControls}>
//                         <span className={`${styles.dot} ${styles.red}`}></span>
//                         <span className={`${styles.dot} ${styles.yellow}`}></span>
//                         <span className={`${styles.dot} ${styles.green}`}></span>
//                     </div>
//                     <span className={styles.windowTitle}>Scriptify Dashboard</span>
//                 </div>

//                 {/* Mock content */}
//                 <div className={styles.windowContent}>
//                     <div className={styles.heroMock}>
//                         <div className={styles.mockImage}></div>
//                         <div className={styles.mockOverlay}></div>
//                         <div className={styles.mockBadge}>Trending on Scriptify</div>
//                         <div className={styles.mockTitle}></div>
//                         <div className={styles.mockTitleShort}></div>
//                     </div>

//                     <div className={styles.cardsMock}>
//                         <div className={styles.cardMock}>
//                             <div className={styles.cardContent}>
//                                 <div className={styles.cardLine}></div>
//                                 <div className={styles.cardLineShort}></div>
//                             </div>
//                             <div className={styles.cardImage}></div>
//                         </div>
//                         <div className={styles.aiCard}>
//                             <FiSparkles className={styles.aiIcon} />
//                             <span>Generating AI...</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Glow effect behind */}
//             <div className={styles.glow}></div>
//         </div>
//     );
// };

// export default DashboardPreview;

import React from 'react';
import { HiSparkles } from 'react-icons/hi';
import styles from '../../styles/landing/DashboardPreview.module.css';

const DashboardPreview = () => {
    return (
        <div className={styles.preview}>
            <div className={styles.window}>
                {/* Window controls */}
                <div className={styles.windowHeader}>
                    <div className={styles.windowControls}>
                        <span className={`${styles.dot} ${styles.red}`}></span>
                        <span className={`${styles.dot} ${styles.yellow}`}></span>
                        <span className={`${styles.dot} ${styles.green}`}></span>
                    </div>
                    <span className={styles.windowTitle}>Scriptify Dashboard</span>
                </div>

                {/* Mock content */}
                <div className={styles.windowContent}>
                    <div className={styles.heroMock}>
                        <div className={styles.mockImage}></div>
                        <div className={styles.mockOverlay}></div>
                        <div className={styles.mockBadge}>Trending on Scriptify</div>
                        <div className={styles.mockTitle}></div>
                        <div className={styles.mockTitleShort}></div>
                    </div>

                    <div className={styles.cardsMock}>
                        <div className={styles.cardMock}>
                            <div className={styles.cardContent}>
                                <div className={styles.cardLine}></div>
                                <div className={styles.cardLineShort}></div>
                            </div>
                            <div className={styles.cardImage}></div>
                        </div>

                        <div className={styles.aiCard}>
                            <HiSparkles className={styles.aiIcon} />
                            <span>Generating AI...</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Glow effect behind */}
            <div className={styles.glow}></div>
        </div>
    );
};

export default DashboardPreview;