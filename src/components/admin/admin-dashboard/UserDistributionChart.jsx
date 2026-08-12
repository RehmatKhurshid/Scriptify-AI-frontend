import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from '../../../styles/admin/admin-dashboard/UserDistributionChart.module.css';

const defaultData = [
    { name: 'Readers', value: 0, percentage: 0, color: '#a78bfa' },
    { name: 'Bloggers', value: 0, percentage: 0, color: '#06b6d4' },
    { name: 'Admins', value: 0, percentage: 0, color: '#f472b6' },
];

const UserDistributionChart = ({ data: propData }) => {
    const chartData = (propData && propData.length > 0) ? propData : defaultData;
    const totalCount = chartData.reduce((acc, curr) => acc + (curr.value || 0), 0);

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
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={85}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className={styles.centerLabel}>
                    <span className={styles.centerValue}>{totalCount.toLocaleString()}</span>
                    <span className={styles.centerText}>Total</span>
                </div>
            </div>

            <div className={styles.legendList}>
                {chartData.map((item, index) => (
                    <div key={index} className={styles.legendItem}>
                        <div className={styles.legendRow}>
                            <span className={styles.legendDot} style={{ background: item.color }} />
                            <span className={styles.legendName}>{item.name}</span>
                        </div>
                        <div className={styles.legendValues}>
                            <span className={styles.legendNumber}>{(item.value || 0).toLocaleString()}</span>
                            <span className={styles.legendPercent}>({item.percentage || 0}%)</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDistributionChart;