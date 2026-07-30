import React, { useState } from 'react';
import { FiMail, FiArrowRight, FiArrowLeft, FiRefreshCw, FiExternalLink } from 'react-icons/fi';
import Button from '../common/Button';
import { authService } from '../../services/authService';
import styles from '../../styles/auth/ForgotPasswordForm.module.css';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }

        setLoading(true);

        try {
            await authService.forgotPassword({ email: email.trim() });
            setIsSubmitted(true);
        } catch (err) {
            setError(err.message || 'Failed to request reset link. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className={styles.container}>
                <div className={styles.successIconWrapper}>
                    <div className={styles.successIcon}>
                        <FiMail className={styles.mailIcon} />
                    </div>
                    <div className={styles.successRing}></div>
                </div>
                <h1 className={styles.title}>Reset Link Generated</h1>
                <p className={styles.subtitle}>
                    Check your <strong style={{ color: '#c4b5fd' }}>backend terminal window</strong>. We've logged the password reset URL for <span className={styles.emailHighlight}>{email}</span>.
                </p>

                <div style={{
                    margin: '16px 0',
                    padding: '12px 14px',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px border-solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#94a3b8',
                    textAlign: 'left',
                    lineHeight: '1.5'
                }}>
                    <strong style={{ color: '#f8fafc', display: 'block', marginBottom: '4px' }}>📋 Development Step:</strong>
                    Copy the full URL starting with <code style={{ color: '#a78bfa' }}>http://localhost:5173/reset-password?token=...</code> from your backend terminal and open it in your browser.
                </div>

                <a href="/signin" className={styles.backLink} style={{ marginTop: '12px', display: 'inline-flex' }}>
                    <FiArrowLeft className={styles.backIcon} />
                    Back to Sign In
                </a>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Forgot Password?</h1>
                <p className={styles.subtitle}>
                    Enter your email address and we'll generate a reset link in your terminal.
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
                <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>EMAIL ADDRESS</label>
                    <div className={styles.inputWrapper}>
                        <FiMail className={styles.inputIcon} />
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
                </div>

                <div className={styles.submitWrapper}>
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        fullWidth
                        icon={loading ? <FiRefreshCw style={{ animation: 'spin 1s linear infinite' }} /> : <FiArrowRight />}
                        disabled={loading}
                    >
                        {loading ? 'Generating Link...' : 'Generate Reset Link'}
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

export default ForgotPasswordForm;