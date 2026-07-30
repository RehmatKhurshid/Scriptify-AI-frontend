import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft, FiEye, FiEyeOff, FiCheck, FiX, FiRefreshCw, FiLock } from 'react-icons/fi';
import Button from '../common/Button';
import { authService } from '../../services/authService';
import styles from '../../styles/auth/ResetPasswordForm.module.css';

const requirements = [
    { id: 'length', label: '8+ Characters', regex: /.{8,}/ },
    { id: 'number', label: 'One number', regex: /\d/ },
    { id: 'special', label: 'Special symbol', regex: /[!@#$%^&*(),.?":{}|<>]/ },
    { id: 'uppercase', label: 'Uppercase', regex: /[A-Z]/ },
];

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const urlToken = searchParams.get('token');
        const urlEmail = searchParams.get('email') || location.state?.email || '';

        if (urlToken) setToken(urlToken);
        if (urlEmail) setEmail(urlEmail);
    }, [location]);

    const getRequirementStatus = (regex) => regex.test(password);
    const allRequirementsMet = requirements.every((req) => getRequirementStatus(req.regex));
    const passwordsMatch = password && confirmPassword && password === confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Please provide your email address.');
            return;
        }

        if (!token.trim()) {
            setError('Missing password reset token from URL.');
            return;
        }

        if (!allRequirementsMet || !passwordsMatch) {
            setError('Please meet all password requirements and make sure passwords match.');
            return;
        }

        setLoading(true);

        try {
            await authService.resetPassword({
                email: email.trim(),
                token: token.trim(),
                newPassword: password,
            });

            setIsSubmitted(true);
        } catch (err) {
            setError(err.message || 'Failed to reset password. Invalid or expired link.');
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className={styles.container}>
                <div className={styles.successWrapper}>
                    <div className={styles.successIcon}>
                        <FiCheck className={styles.checkIcon} />
                    </div>
                    <h1 className={styles.title}>Password reset complete</h1>
                    <p className={styles.subtitle}>
                        Your password has been successfully updated. You can now sign in with your new credentials.
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
                <h1 className={styles.title}>Set new password</h1>
                <p className={styles.subtitle}>
                    {email ? (
                        <>Resetting password for <strong style={{ color: '#e2e8f0' }}>{email}</strong></>
                    ) : (
                        'Enter your email and new password.'
                    )}
                </p>
            </div>

            {error && (
                <div className={styles.errorAlert} role="alert" style={{
                    padding: '8px 16px',
                    marginBottom: '16px',
                    fontSize: '13px',
                    color: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '8px',
                    textAlign: 'center',
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
                {!email && (
                    <div className={styles.field}>
                        <label htmlFor="email" className={styles.label}>Email Address</label>
                        <input
                            id="email"
                            type="email"
                            className={styles.input}
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                )}

                {!token && (
                    <div className={styles.field}>
                        <label htmlFor="token" className={styles.label}>Reset Token</label>
                        <input
                            id="token"
                            type="text"
                            className={styles.input}
                            placeholder="Paste reset token from terminal"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                )}

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
                            disabled={loading}
                            required
                        />
                        <button
                            type="button"
                            className={styles.eyeButton}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            disabled={loading}
                        >
                            {showPassword ? <FiEye /> : <FiEyeOff />}
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
                            disabled={loading}
                            required
                        />
                        <button
                            type="button"
                            className={styles.eyeButton}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                            disabled={loading}
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
                        icon={loading ? <FiRefreshCw style={{ animation: 'spin 1s linear infinite' }} /> : <FiArrowRight />}
                        disabled={!allRequirementsMet || !passwordsMatch || loading}
                    >
                        {loading ? 'Resetting Password...' : 'Reset Password'}
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