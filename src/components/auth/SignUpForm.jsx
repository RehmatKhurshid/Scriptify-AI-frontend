import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiEye, FiEyeOff, FiRefreshCw, FiCheck, FiX } from 'react-icons/fi';
import Button from '../common/Button';
import { authService } from '../../services/authService';
import styles from '../../styles/auth/SignUpForm.module.css';

const requirements = [
    { id: 'length', label: '8+ Characters', regex: /.{8,}/ },
    { id: 'number', label: 'One number', regex: /\d/ },
    { id: 'special', label: 'Special symbol', regex: /[!@#$%^&*(),.?":{}|<>]/ },
    { id: 'uppercase', label: 'Uppercase', regex: /[A-Z]/ },
];

const SignUpForm = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const getRequirementStatus = (regex) => regex.test(password);
    const allRequirementsMet = requirements.every((req) => getRequirementStatus(req.regex));
    const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

    const getStrengthProgress = () => {
        if (!password) return { percentage: 0, label: '', color: 'transparent' };
        const metCount = requirements.filter((req) => req.regex.test(password)).length;
        if (metCount === 1) return { percentage: 25, label: 'Weak', color: '#ef4444' };
        if (metCount === 2) return { percentage: 50, label: 'Fair', color: '#f59e0b' };
        if (metCount === 3) return { percentage: 75, label: 'Good', color: '#3b82f6' };
        if (metCount === 4) return { percentage: 100, label: 'Strong', color: '#10b981' };
        return { percentage: 15, label: 'Weak', color: '#ef4444' };
    };

    const strength = getStrengthProgress();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
            setError('Please fill in all required fields.');
            return;
        }

        if (!allRequirementsMet) {
            setError('Please ensure your password meets all requirements.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
            const data = await authService.signUp({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                password,
            });

            setSuccessMessage(data.message || 'Registration successful! Redirecting to email verification...');
            
            setTimeout(() => {
                navigate('/verify-email', { state: { email: email.trim() } });
            }, 1500);
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logoWrapper}>
                    <div className={styles.logo}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="6" fill="url(#signupGradient)" />
                            <path d="M7 17L12 7L17 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 13H15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <defs>
                                <linearGradient id="signupGradient" x1="0" y1="0" x2="24" y2="24">
                                    <stop offset="0%" stopColor="#8B5CF6" />
                                    <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className={styles.brandName}>Scriptify AI</span>
                </div>
                <h1 className={styles.title}>Create your account</h1>
                <p className={styles.subtitle}>Join the focused editorial workflow.</p>
            </div>

            {error && (
                <div className={styles.errorAlert} role="alert">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className={styles.successAlert} role="status">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.nameRow}>
                    <div className={styles.nameField}>
                        <label htmlFor="firstName" className={styles.label}>First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            className={styles.input}
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className={styles.nameField}>
                        <label htmlFor="lastName" className={styles.label}>Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            className={styles.input}
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>Email address</label>
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

                <div className={styles.field}>
                    <label htmlFor="password" className={styles.label}>Password</label>
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

                    {password && (
                        <div className={styles.strengthWrapper}>
                            <div className={styles.strengthTrack}>
                                <div
                                    className={styles.strengthFill}
                                    style={{
                                        width: `${strength.percentage}%`,
                                        backgroundColor: strength.color,
                                    }}
                                />
                            </div>
                            <span className={styles.strengthLabel} style={{ color: strength.color }}>
                                {strength.label}
                            </span>
                        </div>
                    )}
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
                    <div className={styles.labelRow}>
                        <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                        {confirmPassword && (
                            <span className={`${styles.matchBadge} ${passwordsMatch ? styles.matched : styles.unmatched}`}>
                                {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                            </span>
                        )}
                    </div>
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
                            {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
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
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign up'}
                    </Button>
                </div>
            </form>

            <p className={styles.footer}>
                Already have an account?{' '}
                <a href="/signin" className={styles.signInLink}>
                    Sign In
                </a>
            </p>
        </div>
    );
};

export default SignUpForm;