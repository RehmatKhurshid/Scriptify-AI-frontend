import React from 'react';
import { Users, FileText, MessageSquare, AlertTriangle, Activity } from 'lucide-react';
import styles from '../../../styles/admin/admin-dashboard/StatsCards.module.css';

const iconMap = {
    Users,
    FileText,
    MessageSquare,
    AlertTriangle,
    Activity,
};

const StatsCards = ({ stats }) => {
    return (
        <div className={styles.statsGrid}>
            {stats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon] || Activity;

                if (stat.isUrgent) {
                    return (
                        <div key={index} className={`${styles.statCard} ${styles.urgentCard}`}>
                            <div className={styles.urgentHeader}>
                                <div className={styles.urgentBadge}>
                                    <AlertTriangle size={18} />
                                    <div>
                                        <span className={styles.urgentLabel}>URGENT</span>
                                        <span className={styles.urgentSubLabel}>ATTENTION</span>
                                    </div>
                                </div>
                                <button className={styles.reviewButton}>Review Now</button>
                            </div>
                            <div className={styles.urgentValue}>
                                <span className={styles.urgentNumber}>{stat.value}</span>
                                <span className={styles.urgentText}>{stat.subtext}</span>
                            </div>
                            <div className={styles.urgentProgress}>
                                <div className={styles.progressBar} style={{ width: '65%' }} />
                            </div>
                        </div>
                    );
                }

                return (
                    <div key={index} className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <div className={styles.iconWrapper}>
                                <IconComponent size={20} />
                            </div>
                            {stat.change && (
                                <span className={`${styles.changeBadge} ${stat.trend === 'up' ? styles.up : styles.down}`}>
                                    {stat.change}
                                </span>
                            )}
                            {stat.hasDot && <span className={styles.liveDot} />}
                        </div>
                        <div className={styles.statBody}>
                            <span className={styles.statLabel}>{stat.label}</span>
                            <span className={styles.statValue}>{stat.value}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsCards;