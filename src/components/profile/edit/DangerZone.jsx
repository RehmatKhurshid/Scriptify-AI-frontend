import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiAlertTriangle, FiCheck, FiEye, FiEyeOff, FiX, FiRefreshCw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import { useAuth } from '../../../context/AuthContext';
import styles from '../../../styles/profile/edit/DangerZone.module.css';

const DangerZone = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const passwordInputRef = useRef(null);

    // Auto-focus input when modal opens & handle Escape key listener
    useEffect(() => {
        if (showModal) {
            if (passwordInputRef.current) {
                passwordInputRef.current.focus();
            }

            const handleKeyDown = (e) => {
                if (e.key === 'Escape' && !loading) {
                    handleCloseModal();
                }
            };

            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [showModal, loading]);

    const handleOpenModal = () => {
        setPassword('');
        setError('');
        setShowPassword(false);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        if (loading) return;
        setShowModal(false);
        setPassword('');
        setError('');
        setShowPassword(false);
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!password.trim()) {
            setError('Please enter your current password.');
            return;
        }

        setLoading(true);

        try {
            const response = await authService.deleteAccount(password.trim());
            setSuccessMessage(
                response?.message || 'Your account and associated data have been permanently deleted.'
            );

            setTimeout(async () => {
                setShowModal(false);
                await logout();
                navigate('/signin');
            }, 1800);
        } catch (err) {
            const errMsg = err?.response?.data?.message || err.message || 'Incorrect password. Please try again.';
            setError(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <FiAlertTriangle className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Danger Zone</h3>
            </div>

            <div className={styles.content}>
                <div className={styles.warning}>
                    <div className={styles.warningText}>
                        <h4 className={styles.warningTitle}>Delete Account</h4>
                        <p className={styles.warningDesc}>
                            Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                    </div>
                    <div className={styles.warningActions}>
                        <button
                            type="button"
                            className={styles.deleteButton}
                            onClick={handleOpenModal}
                        >
                            Delete Account
                        </button>
                    </div>
                </div>

                {successMessage && (
                    <div className={styles.successToast}>
                        <FiCheck className={styles.successIcon} />
                        {successMessage}
                    </div>
                )}
            </div>

            {/* Delete Account Confirmation Modal Portaled to Body */}
            {showModal && createPortal(
                <div
                    className={styles.modalOverlay}
                    onClick={(e) => {
                        if (e.target === e.currentTarget && !loading) {
                            handleCloseModal();
                        }
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-modal-title"
                >
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalHeaderTitleGroup}>
                                <div className={styles.warningBadgeIcon}>
                                    <FiAlertTriangle size={20} />
                                </div>
                                <h3 id="delete-modal-title" className={styles.modalTitle}>
                                    Delete your account?
                                </h3>
                            </div>
                            <button
                                type="button"
                                className={styles.closeBtn}
                                onClick={handleCloseModal}
                                disabled={loading}
                                aria-label="Close dialog"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.warningBanner}>
                                <p className={styles.warningBannerText}>
                                    This action cannot be undone. Deleting your account will permanently remove your account and all associated data, including your blogs, drafts, comments, likes, bookmarks, and other account-related information.
                                </p>
                            </div>

                            <p className={styles.instructionText}>
                                To confirm that you want to permanently delete your account, please enter your current password below.
                            </p>

                            {error && (
                                <div className={styles.errorAlert}>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleDeleteSubmit}>
                                <div className={styles.fieldGroup}>
                                    <label htmlFor="confirm-password-input" className={styles.inputLabel}>
                                        Current Password
                                    </label>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            id="confirm-password-input"
                                            ref={passwordInputRef}
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            disabled={loading}
                                            className={styles.modalInput}
                                        />
                                        <button
                                            type="button"
                                            className={styles.eyeToggleBtn}
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            tabIndex={-1}
                                            title={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.modalActions}>
                                    <button
                                        type="button"
                                        className={styles.cancelBtn}
                                        onClick={handleCloseModal}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={styles.confirmDeleteBtn}
                                        disabled={!password.trim() || loading}
                                    >
                                        {loading && <FiRefreshCw className={styles.spinIcon} />}
                                        {loading ? 'Deleting Account...' : 'Delete Account'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default DangerZone;