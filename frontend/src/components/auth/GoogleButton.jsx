import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import styles from '../../styles/auth/GoogleButton.module.css';

const GoogleButton = ({ onClick }) => {
    return (
        <button type="button" className={styles.button} onClick={onClick}>
            <FcGoogle className={styles.icon} />
            <span className={styles.text}>Continue with Google</span>
        </button>
    );
};

export default GoogleButton;