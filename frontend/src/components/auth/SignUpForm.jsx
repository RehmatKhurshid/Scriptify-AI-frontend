import React, { useState } from 'react';
import { FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import InputField from '../common/InputField';
import Button from '../common/Button';
import styles from '../../styles/auth/SignUpForm.module.css';

const GoogleButton = ({ onClick }) => {
    return (
        <button type="button" className={styles.googleButton} onClick={onClick}>
            <FcGoogle className={styles.googleIcon} />
            <span className={styles.googleText}>Continue with Google</span>
        </button>
    );
};

const SignUpForm = () => {
    const [firstName, setFirstName] = useState('Jamie');
    const [lastName, setLastName] = useState('Doe');
    const [email, setEmail] = useState('jamie@example.com');
    const [password, setPassword] = useState('••••••••');
    const [confirmPassword, setConfirmPassword] = useState('••••••••');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sign up:', { firstName, lastName, email, password, confirmPassword });
    };

    const handleGoogleSignUp = () => {
        console.log('Google sign up');
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

            <GoogleButton onClick={handleGoogleSignUp} />

            <div className={styles.divider}>
                <span className={styles.dividerLine}></span>
                <span className={styles.dividerText}>or</span>
                <span className={styles.dividerLine}></span>
            </div>

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

                <div className={styles.field}>
                    <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        className={styles.input}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className={styles.submitWrapper}>
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        fullWidth
                        icon={<FiArrowRight />}
                    >
                        Sign up
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