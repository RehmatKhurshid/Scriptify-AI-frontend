import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    return (
        <div className={styles.statsGrid}>
            {stats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon] || Activity;

                if (stat.isUrgent) {
                    return (
                        <div key={index} className={`${styles.statCard} ${styles.urgentCard}`}>
                            <div className={styles.urgentHeader}>
                                <div className={styles.urgentBadge}>
                                    <AlertTriangle size={16} />
                                    <span className={styles.urgentLabel}>URGENT ATTENTION</span>
                                </div>
                                <button
                                    className={styles.reviewButton}
                                    onClick={() => navigate('/admin/flagged-comments')}
                                >
                                    Review
                                </button>
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
                                <IconComponent size={18} />
                            </div>
                            {stat.change && (
                                <span className={`${styles.changeBadge} ${stat.trend === 'up' ? styles.up : styles.down}`}>
                                    {stat.change}
                                </span>
                            )}
                            {stat.hasDot && <span className={styles.liveDot} />}
                        </div>
                        <div className={styles.statBody}>
                            <span className={styles.statLabel} title={stat.label}>{stat.label}</span>
                            <span className={styles.statValue}>{stat.value}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsCards;