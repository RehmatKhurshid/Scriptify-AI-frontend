import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import styles from '../../../styles/admin/settings/PreferencesCard.module.css';

const PreferencesCard = ({ theme, onThemeChange, notifications, onNotificationsChange }) => {
    const themes = [
        { id: 'light', label: 'Light', icon: Sun },
        { id: 'dark', label: 'Dark', icon: Moon },
        { id: 'system', label: 'System', icon: Monitor },
    ];

    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>Preferences</h3>

            <div className={styles.preferenceSection}>
                <span className={styles.sectionLabel}>Interface Theme</span>
                <div className={styles.themeGrid}>
                    {themes.map((t) => {
                        const IconComponent = t.icon;
                        const isActive = theme === t.id;

                        return (
                            <button
                                key={t.id}
                                className={`${styles.themeCard} ${isActive ? styles.active : ''}`}
                                onClick={() => onThemeChange(t.id)}
                            >
                                <IconComponent size={20} />
                                <span>{t.label}</span>
                                {isActive && <span className={styles.checkDot} />}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className={styles.preferenceSection}>
                <div className={styles.toggleRow}>
                    <div className={styles.toggleInfo}>
                        <span className={styles.sectionLabel}>Email Notifications</span>
                        <span className={styles.toggleSub}>
                            Receive alerts for system updates and security events.
                        </span>
                    </div>
                    <button
                        className={`${styles.toggle} ${notifications ? styles.on : ''}`}
                        onClick={() => onNotificationsChange(!notifications)}
                    >
                        <span className={styles.toggleThumb} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreferencesCard;