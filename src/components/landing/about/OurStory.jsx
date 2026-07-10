import React from 'react';
import styles from '../../../styles/landing/about/OurStory.module.css';

const OurStory = () => {
    return (
        <section className={styles.section}>
            <div className={styles.card}>
                <h2 className={styles.title}>Our Story</h2>
                <p className={styles.subtitle}>Why We Built Scriptify AI</p>

                <div className={styles.content}>
                    <p>
                        We recognized a growing disconnect between raw creative writing and the technical demands of modern digital publishing. Scriptify AI was born from a simple vision: to bridge this gap through a streamlined, distraction-free writing environment, augmented by intelligent AI that handles the tedious tasks—research assistance, tone analysis, and structural optimization.
                    </p>
                    <p>
                        Our journey started with a simple question: How can we allow writers to focus entirely on storytelling while AI handles the heavy lifting? We saw too many talented voices lost in the algorithmic trenches—buried under technical SEO skills or simply frustrated by the time it takes to format and polish their work.
                    </p>
                    <p>
                        Scriptify AI is the answer. It is a sanctuary for writers where the technical heavy lifting is automated, yet the soul of the writing remains distinctly human. Whether you are a seasoned journalist, a creative blogger, or a marketing professional, Scriptify AI adapts to your voice, ensuring that great content always finds its audience—unburdened from the technical complexities of the modern web.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default OurStory;