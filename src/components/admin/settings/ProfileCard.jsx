import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import styles from '../../../styles/admin/settings/ProfileCard.module.css';

const ProfileCard = ({ data, onSave }) => {
    const [fullName, setFullName] = useState(data.fullName || '');
    const [email, setEmail] = useState(data.email || '');

    React.useEffect(() => {
        setFullName(data.fullName || '');
        setEmail(data.email || '');
    }, [data.fullName, data.email]);

    const handleSave = () => {
        const parts = fullName.trim().split(' ');
        const firstName = parts[0] || '';
        const lastName = parts.slice(1).join(' ') || '';
        onSave?.({ firstName, lastName, email });
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>Profile Information</h3>

            <div className={styles.profileContent}>
                <div className={styles.avatarSection}>
                    <div className={styles.avatarWrapper}>
                        <img src={data.avatar} alt={data.fullName} className={styles.avatar} />
                        <button className={styles.editAvatar}>
                            <Pencil size={12} />
                        </button>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>FULL NAME</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>EMAIL ADDRESS</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.metaRow}>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>ROLE</span>
                            <span className={styles.metaBadge}>{data.role}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>JOINED</span>
                            <span className={styles.metaValue}>{data.joined}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>LAST LOGIN</span>
                            <span className={styles.metaValue}>{data.lastLogin}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.cardFooter}>
                <button className={styles.saveBtn} onClick={handleSave}>Save Changes</button>
            </div>
        </div>
    );
};

export default ProfileCard;