import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiRefreshCw, FiEye, FiEyeOff } from 'react-icons/fi';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/auth/SignInForm.module.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email.trim() || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);

    try {
      const data = await login({
        email: email.trim(),
        password,
      });

      setSuccessMessage(data.message || 'Login successful! Redirecting...');

      setTimeout(() => {
        if (data.user?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/Home-Feed');
        }
      }, 1000);
    } catch (err) {
      const errMsg = err.message || 'Invalid email or password.';
      setError(errMsg);

      if (errMsg.toLowerCase().includes('verify your email')) {
        setTimeout(() => {
          navigate('/verify-email', { state: { email: email.trim() } });
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Enter your details to access your workspace.</p>
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
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />

        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <Link to="/forgot-password" className={styles.forgotLink}>
              Forgot?
            </Link>
          </div>
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

        <div className={styles.submitWrapper}>
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            icon={loading ? <FiRefreshCw style={{ animation: 'spin 1s linear infinite' }} /> : <FiArrowRight />}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </div>
      </form>

      <p className={styles.footer}>
        Don't have an account?{' '}
        <a href="/signup" className={styles.signUpLink}>
          Sign up
        </a>
      </p>
    </div>
  );
};

export default SignInForm;