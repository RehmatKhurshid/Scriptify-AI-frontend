import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import Button from '../common/Button';
import { authService } from '../../services/authService';
import styles from '../../styles/auth/VerifyEmailForm.module.css';

const VerifyEmailForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | verifying | success | error
    const [errorMessage, setErrorMessage] = useState('');
    const [resendMessage, setResendMessage] = useState('');
    const inputRefs = useRef([]);

    useEffect(() => {
        const passedEmail = location.state?.email || new URLSearchParams(window.location.search).get('email') || '';
        setEmail(passedEmail);
    }, [location]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, value) => {
        const cleanValue = value.replace(/\D/g, '');
        if (!cleanValue && value !== '') return;

        const newOtp = [...otp];
        newOtp[index] = cleanValue.slice(-1);
        setOtp(newOtp);

        if (cleanValue && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const newOtp = [...otp];
            if (otp[index] !== '') {
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                newOtp[index - 1] = '';
                setOtp(newOtp);
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];

        pastedData.split('').forEach((digit, i) => {
            if (i < 6) newOtp[i] = digit;
        });

        setOtp(newOtp);

        const focusIndex = Math.min(pastedData.length, 5);
        inputRefs.current[focusIndex]?.focus();
    };

    const handleResend = async () => {
        if (!canResend || !email) return;

        setStatus('idle');
        setErrorMessage('');
        setResendMessage('');

        try {
            const data = await authService.resendOTP({ email });
            setResendMessage(data.message || 'A new OTP has been sent to your email.');
            setTimer(60);
            setCanResend(false);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } catch (err) {
            setErrorMessage(err.message || 'Failed to resend OTP. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = otp.join('');

        if (!email) {
            setErrorMessage('No email address provided. Please return to sign up.');
            setStatus('error');
            return;
        }

        if (code.length === 6) {
            setStatus('verifying');
            setErrorMessage('');
            setResendMessage('');

            try {
                await authService.verifyEmail({ email, otp: code });
                setStatus('success');

                setTimeout(() => {
                    navigate('/signin');
                }, 1500);
            } catch (err) {
                setStatus('error');
                setErrorMessage(err.message || 'Invalid or expired verification code.');
            }
        }
    };

    const isComplete = otp.every((digit) => digit !== '');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <FiMail className={styles.mailIcon} />
                    <div className={styles.checkBadge}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                </div>
                <h1 className={styles.title}>Verify your email</h1>
                <p className={styles.subtitle}>
                    We've sent a verification code to{' '}
                    <span className={styles.email}>{email || 'your email'}</span>
                </p>
            </div>

            {errorMessage && (
                <div className={styles.errorAlert} role="alert">
                    {errorMessage}
                </div>
            )}

            {status === 'success' && (
                <div className={styles.successAlert} role="status">
                    Email verified successfully! Redirecting to Sign In...
                </div>
            )}

            {resendMessage && (
                <div className={styles.successAlert} role="status">
                    {resendMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.otpWrapper}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className={`${styles.otpInput} ${digit ? styles.filled : ''}`}
                            aria-label={`Digit ${index + 1}`}
                            disabled={status === 'verifying' || status === 'success'}
                        />
                    ))}
                </div>

                <div className={styles.submitWrapper}>
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        fullWidth
                        disabled={!isComplete || status === 'verifying' || status === 'success'}
                    >
                        {status === 'verifying' ? (
                            <span className={styles.loaderWrapper}>
                                <FiRefreshCw className={styles.spinnerIcon} />
                                Verifying...
                            </span>
                        ) : 'Verify Email'}
                    </Button>
                </div>
            </form>

            <div className={styles.resendSection}>
                <p className={styles.resendText}>
                    Didn't receive the email?
                </p>
                <button
                    type="button"
                    className={`${styles.resendButton} ${canResend && status !== 'verifying' && status !== 'success' ? styles.active : ''}`}
                    onClick={handleResend}
                    disabled={!canResend || status === 'verifying' || status === 'success'}
                >
                    <FiRefreshCw className={`${styles.resendIcon} ${!canResend && status !== 'verifying' && status !== 'success' ? styles.spinning : ''}`} />
                    {canResend ? 'Resend verification email' : `Resend in ${timer}s`}
                </button>
            </div>

            <a href="/signup" className={styles.changeEmailLink}>
                <FiArrowLeft className={styles.changeEmailIcon} />
                Change email address
            </a>
        </div>
    );
};

export default VerifyEmailForm;