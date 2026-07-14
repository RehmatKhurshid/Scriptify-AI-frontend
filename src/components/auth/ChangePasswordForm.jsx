import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styles from '../../styles/auth/ChangePasswordForm.module.css';

const ChangePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const getSecurityLevel = (password) => {
        if (!password) return { level: 'Waiting for input...', color: 'muted' };
        if (password.length < 8) return { level: 'Weak', color: 'weak' };
        if (password.length < 12 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            return { level: 'Medium', color: 'medium' };
        }
        return { level: 'Strong', color: 'strong' };
    };

    const security = getSecurityLevel(newPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Changing password...');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Change Password</h1>
                <p className={styles.subtitle}>Update your account security credentials.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Current Password */}
                <div className={styles.field}>
                    <label className={styles.label}>Current Password</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type={showCurrent ? 'text' : 'password'}
                            className={styles.input}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            className={styles.eyeButton}
                            onClick={() => setShowCurrent(!showCurrent)}
                        >
                            {showCurrent ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div className={styles.field}>
                    <label className={styles.label}>New Password</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type={showNew ? 'text' : 'password'}
                            className={styles.input}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            className={styles.eyeButton}
                            onClick={() => setShowNew(!showNew)}
                        >
                            {showNew ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    <p className={`${styles.securityText} ${styles[security.color]}`}>
                        Security Level: {security.level}
                    </p>
                </div>

                {/* Confirm New Password */}
                <div className={styles.field}>
                    <label className={styles.label}>Confirm New Password</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            className={styles.input}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            className={styles.eyeButton}
                            onClick={() => setShowConfirm(!showConfirm)}
                        >
                            {showConfirm ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>

                <button type="submit" className={styles.submitButton}>
                    Update Password
                </button>
            </form>

            <p className={styles.footer}>
                Forgot your current password?{' '}
                <Link to="/forgot-password" className={styles.link}>
                    Reset it using email verification.
                </Link>
            </p>
        </div>
    );
};

export default ChangePasswordForm;