import React, { useState } from 'react';
import { FiChevronRight, FiChevronDown, FiEye, FiEyeOff, FiRefreshCw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import { useAuth } from '../../../context/AuthContext';
import styles from '../../../styles/profile/edit/SecuritySettings.module.css';

const SecuritySettings = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [expanded, setExpanded] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleToggleExpand = () => {
        setExpanded(!expanded);
        setError('');
        setMessage('');
    };

    const handlePasswordChangeSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!currentPassword) {
            setError('Current password is required.');
            return;
        }

        if (!newPassword || newPassword.length < 8) {
            setError('New password must be at least 8 characters long.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.');
            return;
        }

        setLoading(true);

        try {
            const response = await authService.changePassword({
                oldPassword: currentPassword,
                newPassword,
            });

            setMessage(response?.message || 'Password changed successfully! Redirecting...');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            setTimeout(async () => {
                await logout();
                navigate('/signin');
            }, 1800);
        } catch (err) {
            setError(err.message || 'Failed to change password. Check your current password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <button
                type="button"
                className={styles.option}
                onClick={handleToggleExpand}
            >
                <div className={styles.optionContent}>
                    <h4 className={styles.optionTitle}>Change Password</h4>
                    <p className={styles.optionDesc}>Update your account password regularly for better security.</p>
                </div>
                {expanded ? <FiChevronDown className={styles.optionArrow} /> : <FiChevronRight className={styles.optionArrow} />}
            </button>

            {expanded && (
                <div className={styles.formContainer}>
                    {(error || message) && (
                        <div style={{ marginBottom: '16px' }}>
                            {error && (
                                <div style={{
                                    padding: '10px 14px',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    borderRadius: '8px',
                                    color: '#ef4444',
                                    fontSize: '13px',
                                }}>
                                    {error}
                                </div>
                            )}
                            {message && (
                                <div style={{
                                    padding: '10px 14px',
                                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                    border: '1px solid rgba(16, 185, 129, 0.2)',
                                    borderRadius: '8px',
                                    color: '#10b981',
                                    fontSize: '13px',
                                }}>
                                    {message}
                                </div>
                            )}
                        </div>
                    )}

                    <form onSubmit={handlePasswordChangeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>
                                Current Password
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type={showCurrent ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '10px 42px 10px 14px',
                                        backgroundColor: '#0b0f19',
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#f8fafc',
                                        fontSize: '13px',
                                        outline: 'none',
                                    }}
                                />
                                <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowCurrent((prev) => !prev);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setShowCurrent((prev) => !prev);
                                        }
                                    }}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#94a3b8',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '6px',
                                        zIndex: 20,
                                        userSelect: 'none',
                                    }}
                                    title={showCurrent ? 'Hide password' : 'Show password'}
                                >
                                    {showCurrent ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>
                                New Password
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type={showNew ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '10px 42px 10px 14px',
                                        backgroundColor: '#0b0f19',
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#f8fafc',
                                        fontSize: '13px',
                                        outline: 'none',
                                    }}
                                />
                                <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowNew((prev) => !prev);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setShowNew((prev) => !prev);
                                        }
                                    }}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#94a3b8',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '6px',
                                        zIndex: 20,
                                        userSelect: 'none',
                                    }}
                                    title={showNew ? 'Hide password' : 'Show password'}
                                >
                                    {showNew ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>
                                Confirm New Password
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '10px 42px 10px 14px',
                                        backgroundColor: '#0b0f19',
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#f8fafc',
                                        fontSize: '13px',
                                        outline: 'none',
                                    }}
                                />
                                <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowConfirm((prev) => !prev);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setShowConfirm((prev) => !prev);
                                        }
                                    }}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#94a3b8',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '6px',
                                        zIndex: 20,
                                        userSelect: 'none',
                                    }}
                                    title={showConfirm ? 'Hide password' : 'Show password'}
                                >
                                    {showConfirm ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                marginTop: '8px',
                                padding: '10px 18px',
                                backgroundColor: '#7c3aed',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                            }}
                        >
                            {loading && <FiRefreshCw style={{ animation: 'spin 1s linear infinite' }} />}
                            {loading ? 'Updating Password...' : 'Save New Password'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SecuritySettings;