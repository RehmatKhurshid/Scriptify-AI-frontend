import React from 'react';
import styles from '../../styles/common/Avatar.module.css';

const Avatar = ({ src, alt, initials, size = 'md', className = '' }) => {
    const sizeClass = styles[size];

    if (src) {
        return (
            <img
                src={src}
                alt={alt}
                className={`${styles.avatar} ${sizeClass} ${className}`}
            />
        );
    }

    return (
        <div className={`${styles.avatar} ${styles.fallback} ${sizeClass} ${className}`}>
            <span className={styles.initials}>{initials}</span>
        </div>
    );
};

export default Avatar;