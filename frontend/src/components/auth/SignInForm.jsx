import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import InputField from '../common/InputField';
import Button from '../common/Button';
import GoogleButton from './GoogleButton';
import styles from '../../styles/auth/SignInForm.module.css';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic
    console.log('Sign in:', { email, password });
  };

  const handleGoogleSignIn = () => {
    // Handle Google SSO
    console.log('Google sign in');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Enter your details to access your workspace.</p>
      </div>

      <GoogleButton onClick={handleGoogleSignIn} />

      <div className={styles.divider}>
        <span className={styles.dividerLine}></span>
        <span className={styles.dividerText}>or</span>
        <span className={styles.dividerLine}></span>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rightElement={<span className={styles.forgotLink}>Forgot?</span>}
        />

        <div className={styles.submitWrapper}>
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            icon={<FiArrowRight />}
          >
            Sign in
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