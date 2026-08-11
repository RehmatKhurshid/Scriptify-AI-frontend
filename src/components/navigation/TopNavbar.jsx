import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { getAvatarUrl } from '../../utils/avatar';
import Logo from '../icons/Logo';
import styles from '../../styles/navigation/TopNavbar.module.css';

const TopNavbar = () => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    const userAvatar = getAvatarUrl(user, user?.firstName || 'User');
    const feedLabel = isAuthenticated ? 'Home Feed' : 'Explore Blogs';

    return (
        <nav className={styles.navbar}>
            {/* Left Side: Logo & Home Feed / Explore Blogs */}
            <div className={styles.left}>
                <Link to={isAuthenticated ? "/Home-Feed" : "/"} className={styles.brand}>
                    <Logo size={24} />
                    <span className={styles.brandName}>Scriptify AI</span>
                </Link>

                <Link
                    to="/Home-Feed"
                    className={`${styles.navLink} ${location.pathname.toLowerCase() === '/home-feed' ? styles.active : ''}`}
                >
                    {feedLabel}
                </Link>
            </div>

            {/* Right Side */}
            <div className={styles.right}>
                {isAuthenticated ? (
                    <>
                        <Link to="/create" className={styles.createBtn} title="Create Blog">
                            <FiPlus size={18} />
                            <span className={styles.btnText}>Create</span>
                        </Link>

                        <Link to="/profile" className={styles.profileLink} title="Profile">
                            <img src={userAvatar} alt="Profile" className={styles.avatarImg} />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/signin" className={styles.signInLink}>
                            Sign In
                        </Link>
                        <Link to="/signup" className={styles.createBtn}>
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default TopNavbar;