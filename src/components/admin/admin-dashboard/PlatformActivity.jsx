import React from 'react';
import { UserPlus, FileText, Flag } from 'lucide-react';
import styles from '../../../styles/admin/admin-dashboard/PlatformActivity.module.css';

const iconMap = {
    UserPlus,
    FileText,
    Flag,
};

const PlatformActivity = ({ activities }) => {
    return (
        <div className={styles.panel}>
            <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Platform Activity</h3>
                <button className={styles.viewAll}>View All</button>
            </div>

            <div className={styles.activityList}>
                {activities.map((activity) => {
                    const IconComponent = iconMap[activity.icon] || FileText;

                    return (
                        <div key={activity.id} className={styles.activityItem}>
                            <div
                                className={styles.activityIcon}
                                style={{ background: `${activity.color}15`, color: activity.color }}
                            >
                                <IconComponent size={16} />
                            </div>
                            <div className={styles.activityContent}>
                                <p className={styles.activityText}>{activity.text}</p>
                                <span className={styles.activityTime}>{activity.time}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlatformActivity;