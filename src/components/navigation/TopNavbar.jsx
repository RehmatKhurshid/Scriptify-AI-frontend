import React from 'react';
import { Link } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import styles from '../../styles/navigation/TopNavbar.module.css';

const TopNavbar = () => {
    const navLinks = [
        { label: 'Home', path: '/', active: false },
        { label: 'Explore', path: '/explore', active: false },
        { label: 'Workspace', path: '/workspace', active: false },
        { label: 'Profile', path: '/profile', active: true },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.navLinks}>
                {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        to={link.path}
                        className={`${styles.navLink} ${link.active ? styles.active : ''}`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            <Link to="/create" className={styles.writeButton}>
                <PenLine size={16} />
                <span>Write</span>
            </Link>
        </nav>
    );
};

export default TopNavbar;