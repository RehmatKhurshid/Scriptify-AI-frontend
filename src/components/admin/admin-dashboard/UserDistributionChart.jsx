import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from '../../../styles/admin/admin-dashboard/UserDistributionChart.module.css';

const data = [
    { name: 'Readers', value: 32150, percentage: 75, color: '#a78bfa' },
    { name: 'Bloggers', value: 9420, percentage: 22, color: '#06b6d4' },
    { name: 'Admins', value: 1230, percentage: 3, color: '#f472b6' },
];

const UserDistributionChart = () => {
    return (
        <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>User Distribution</h3>
                <p className={styles.chartSubtitle}>Split by account type</p>
            </div>

            <div className={styles.chartBody}>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={85}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className={styles.centerLabel}>
                    <span className={styles.centerValue}>42.8k</span>
                    <span className={styles.centerText}>Total</span>
                </div>
            </div>

            <div className={styles.legendList}>
                {data.map((item, index) => (
                    <div key={index} className={styles.legendItem}>
                        <div className={styles.legendRow}>
                            <span className={styles.legendDot} style={{ background: item.color }} />
                            <span className={styles.legendName}>{item.name}</span>
                        </div>
                        <div className={styles.legendValues}>
                            <span className={styles.legendNumber}>{item.value.toLocaleString()}</span>
                            <span className={styles.legendPercent}>({item.percentage}%)</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDistributionChart;