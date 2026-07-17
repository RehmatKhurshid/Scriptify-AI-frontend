import React from 'react';
import { Users, FileText, Flag, Star } from 'lucide-react';
import styles from '../../../styles/admin/admin-dashboard/ActionButtons.module.css';

const actions = [
    { label: 'View All Users', icon: Users },
    { label: 'View All Blogs', icon: FileText },
    { label: 'Review Flagged', icon: Flag },
    { label: 'Featured Blogs', icon: Star },
];

const ActionButtons = () => {
    return (
        <div className={styles.actionsRow}>
            {actions.map((action, index) => (
                <button key={index} className={styles.actionButton}>
                    <action.icon size={16} />
                    <span>{action.label}</span>
                </button>
            ))}
        </div>
    );
};

export default ActionButtons;