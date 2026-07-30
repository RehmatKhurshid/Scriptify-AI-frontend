import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfileNavbar from '../../components/profile/edit/EditProfileNavbar';
import EditProfileHeader from '../../components/profile/edit/EditProfileHeader';
import ProfilePicture from '../../components/profile/edit/ProfilePicture';
import PersonalInfo from '../../components/profile/edit/PersonalInfo';
import AboutMe from '../../components/profile/edit/AboutMe';
import ReadingPreferences from '../../components/profile/edit/ReadingPreferences';
import SecuritySettings from '../../components/profile/edit/SecuritySettings';
import DangerZone from '../../components/profile/edit/DangerZone';
import LivePreview from '../../components/profile/edit/LivePreview';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import styles from '../../styles/profile/edit/EditProfile.module.css';

const EditProfile = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        bio: '',
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Pre-fill form from AuthContext user
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                mobile: user.mobile || '',
                email: user.email || '',
                bio: user.bio || '',
            });
            const defaultAvatar = user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.firstName || 'User')}`;
            setAvatarPreview(defaultAvatar);
        }
    }, [user]);

    // Auto-clear notification messages
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const handleFieldChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAvatarSelect = (file) => {
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleAvatarRemove = () => {
        setAvatarFile(null);
        const fallbackAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.firstName || 'User')}`;
        setAvatarPreview(fallbackAvatar);
    };

    const handleReset = () => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                mobile: user.mobile || '',
                email: user.email || '',
                bio: user.bio || '',
            });
            setAvatarFile(null);
            setAvatarPreview(user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.firstName || 'User')}`);
        }
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            let payload;
            if (avatarFile) {
                payload = new FormData();
                payload.append('firstName', formData.firstName);
                payload.append('lastName', formData.lastName);
                payload.append('mobile', formData.mobile);
                payload.append('bio', formData.bio);
                payload.append('avatar', avatarFile);
            } else {
                payload = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    mobile: formData.mobile,
                    bio: formData.bio,
                };
                if (avatarPreview && !avatarPreview.startsWith('blob:')) {
                    payload.avatarUrl = avatarPreview;
                }
            }

            const response = await authService.updateProfile(payload);

            if (response.user) {
                updateUser(response.user);
            }

            setSuccessMessage(response.message || 'Profile updated successfully!');
            setTimeout(() => {
                navigate('/profile');
            }, 1200);
        } catch (err) {
            setErrorMessage(err.message || 'Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <EditProfileNavbar />

            <main className={styles.main}>
                <div className={styles.content}>
                    <EditProfileHeader />

                    {(errorMessage || successMessage) && (
                        <div style={{ marginBottom: '20px' }}>
                            {errorMessage && (
                                <div style={{
                                    padding: '12px 20px',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    borderRadius: '8px',
                                    color: '#ef4444',
                                    fontSize: '13px',
                                    textAlign: 'center',
                                }}>
                                    {errorMessage}
                                </div>
                            )}
                            {successMessage && (
                                <div style={{
                                    padding: '12px 20px',
                                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                    border: '1px solid rgba(16, 185, 129, 0.2)',
                                    borderRadius: '8px',
                                    color: '#10b981',
                                    fontSize: '13px',
                                    textAlign: 'center',
                                }}>
                                    {successMessage}
                                </div>
                            )}
                        </div>
                    )}

                    <div className={styles.grid}>
                        <div className={styles.leftColumn}>
                            <ProfilePicture
                                avatarPreview={avatarPreview}
                                onAvatarChange={handleAvatarSelect}
                                onAvatarRemove={handleAvatarRemove}
                            />
                            <PersonalInfo
                                formData={formData}
                                onChange={handleFieldChange}
                            />
                            <AboutMe
                                bio={formData.bio}
                                onChange={handleFieldChange}
                            />
                            <ReadingPreferences />
                            <SecuritySettings />
                            <DangerZone />
                        </div>

                        <div className={styles.rightColumn}>
                            <LivePreview
                                formData={formData}
                                avatarPreview={avatarPreview}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p className={styles.footerHint}>
                        <span className={styles.footerDot}></span>
                        Remember to click Save Changes to persist your updated profile details.
                    </p>
                    <div className={styles.footerActions}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => navigate('/profile')}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className={styles.resetButton}
                            onClick={handleReset}
                        >
                            Reset Changes
                        </button>
                        <button
                            type="button"
                            className={styles.saveButton}
                            onClick={handleSaveChanges}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EditProfile;