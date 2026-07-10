import React, { useState } from 'react';
import { FiMail, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import Button from '../common/Button';
import styles from '../../styles/auth/ForgotPasswordForm.module.css';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            console.log('Sending reset link to:', email);
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
                <h1 className={styles.title}>Check your inbox</h1>
                <p className={styles.subtitle}>
                    We've sent a password reset link to{' '}
                    <span className={styles.emailHighlight}>{email}</span>
                </p>
                <a href="/signin" className={styles.backLink}>
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
                    Enter your email address and we'll send you a link to reset your workspace access.
                </p>
            </div>

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
                        icon={<FiArrowRight />}
                    >
                        Send Reset Link
                    </Button>
                </div>
            </form>

            <a href="/signin" className={styles.backLink}>
                <FiArrowLeft className={styles.backIcon} />
                Back to Sign In
            </a>

            <p className={styles.footer}>
                Need to talk to a human? Contact us on{' '}
                <a href="#" className={styles.supportLink}>Success Team</a>
            </p>
        </div>
    );
};

export default ForgotPasswordForm;