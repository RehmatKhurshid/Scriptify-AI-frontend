import React from 'react';
import styles from '../../styles/common/Button.module.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    icon = null,
    onClick,
    type = 'button',
    className = '',
    ...props
}) => {
    const classNames = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button type={type} className={classNames} onClick={onClick} {...props}>
            {children}
            {icon && <span className={styles.icon}>{icon}</span>}
        </button>
    );
};

export default Button;