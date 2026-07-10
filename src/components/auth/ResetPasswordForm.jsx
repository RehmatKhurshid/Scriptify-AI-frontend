import React, { useState } from 'react';
import { FiArrowRight, FiArrowLeft, FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi';
import Button from '../common/Button';
import styles from '../../styles/auth/ResetPasswordForm.module.css';

const requirements = [
    { id: 'length', label: '8+ Characters', regex: /.{8,}/ },
    { id: 'number', label: 'One number', regex: /\d/ },
    { id: 'special', label: 'Special symbol', regex: /[!@#$%^&*(),.?":{}|<>]/ },
    { id: 'uppercase', label: 'Uppercase', regex: /[A-Z]/ },
];

const ResetPasswordForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const getRequirementStatus = (regex) => regex.test(password);

    const allRequirementsMet = requirements.every((req) => getRequirementStatus(req.regex));
    const passwordsMatch = password && confirmPassword && password === confirmPassword;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (allRequirementsMet && passwordsMatch) {
            setIsSubmitted(true);
            console.log('Password reset successfully');
        }
    };

    if (isSubmitted) {
        return (
            <div className={styles.container}>
                <div className={styles.successWrapper}>
                    <div className={styles.successIcon}>
                        <FiCheck className={styles.checkIcon} />
                    </div>
                    <h1 className={styles.title}>Password reset</h1>
                    <p className={styles.subtitle}>
                        Your password has been successfully reset. You can now sign in with your new password.
                    </p>
                    <a href="/signin" className={styles.signInButton}>
                        Sign In
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Reset password</h1>
                <p className={styles.subtitle}>
                    Please choose a secure password for your workspace.
                </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="password" className={styles.label}>New Password</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            className={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className={styles.eyeButton}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>

                <div className={styles.requirements}>
                    <p className={styles.requirementsLabel}>PASSWORD REQUIREMENTS</p>
                    <div className={styles.requirementsGrid}>
                        {requirements.map((req) => {
                            const met = getRequirementStatus(req.regex);
                            return (
                                <div key={req.id} className={`${styles.requirement} ${met ? styles.met : ''}`}>
                                    {met ? (
                                        <FiCheck className={styles.reqIcon} />
                                    ) : (
                                        <FiX className={styles.reqIcon} />
                                    )}
                                    <span className={styles.reqLabel}>{req.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="confirmPassword" className={styles.label}>Confirm New Password</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            className={styles.input}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className={styles.eyeButton}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>

                <div className={styles.submitWrapper}>
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        fullWidth
                        icon={<FiArrowRight />}
                        disabled={!allRequirementsMet || !passwordsMatch}
                    >
                        Reset Password
                    </Button>
                </div>
            </form>

            <a href="/signin" className={styles.backLink}>
                <FiArrowLeft className={styles.backIcon} />
                Back to Sign In
            </a>
        </div>
    );
};

export default ResetPasswordForm;