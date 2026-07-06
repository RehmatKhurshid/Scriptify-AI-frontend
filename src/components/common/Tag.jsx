import React from 'react';
import styles from '../../styles/common/Tag.module.css';

const Tag = ({ children, variant = 'default', onClick, active = false }) => {
    return (
        <span
            className={`${styles.tag} ${styles[variant]} ${active ? styles.active : ''}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {children}
        </span>
    );
};

export default Tag;