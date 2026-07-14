import React, { useState } from 'react';
import { FiBookOpen, FiPlus } from 'react-icons/fi';
import styles from '../../../styles/profile/edit/ReadingPreferences.module.css';

const categories = ['Technology', 'AI & ML', 'Design', 'Productivity', 'Business', 'Lifestyle'];

const ReadingPreferences = () => {
    const [selected, setSelected] = useState(['Technology', 'AI & ML', 'Design']);

    const toggleCategory = (cat) => {
        if (selected.includes(cat)) {
            setSelected(selected.filter(c => c !== cat));
        } else {
            setSelected([...selected, cat]);
        }
    };

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <FiBookOpen className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Reading Preferences</h3>
            </div>

            <div className={styles.tags}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`${styles.tag} ${selected.includes(cat) ? styles.active : ''}`}
                        onClick={() => toggleCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
                <button className={styles.addTag}>
                    <FiPlus />
                    Add Category
                </button>
            </div>
        </div>
    );
};

export default ReadingPreferences;
