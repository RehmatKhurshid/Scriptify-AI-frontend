import React from 'react';
import styles from '../../../styles/admin/admin-dashboard/SystemHealth.module.css';

const SystemHealth = ({ metrics }) => {
    return (
        <div className={styles.panel}>
            <h3 className={styles.panelTitle}>System Health</h3>

            <div className={styles.metricsGrid}>
                {metrics.map((metric, index) => (
                    <div key={index} className={styles.metricCard}>
                        <span className={styles.metricLabel}>{metric.label}</span>
                        <span className={styles.metricValue} style={{ color: metric.color }}>
                            {metric.value}
                        </span>
                        <div className={styles.metricBar}>
                            <div
                                className={styles.metricBarFill}
                                style={{
                                    width: index === 0 ? '12%' : index === 1 ? '84%' : index === 2 ? '0.02%' : '70%',
                                    background: metric.color
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SystemHealth;