import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import styles from '../../../styles/admin/admin-dashboard/PlatformGrowthChart.module.css';

const data = [
    { week: 'Week 1', users: 3200, blogs: 1800 },
    { week: 'Week 2', users: 4100, blogs: 2400 },
    { week: 'Week 3', users: 3800, blogs: 3200 },
    { week: 'Week 4', users: 5200, blogs: 4100 },
];

const PlatformGrowthChart = () => {
    return (
        <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
                <div>
                    <h3 className={styles.chartTitle}>Platform Growth</h3>
                    <p className={styles.chartSubtitle}>User registration vs. Content creation</p>
                </div>
                <div className={styles.legend}>
                    <span className={styles.legendItem}>
                        <span className={styles.legendDot} style={{ background: '#a78bfa' }} />
                        Users
                    </span>
                    <span className={styles.legendItem}>
                        <span className={styles.legendDot} style={{ background: '#06b6d4' }} />
                        Blogs
                    </span>
                </div>
            </div>

            <div className={styles.chartBody}>
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="blogsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="week"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#475569', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#475569', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                background: '#111827',
                                border: '1px solid #1e293b',
                                borderRadius: '10px',
                                color: '#e2e8f0'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="users"
                            stroke="#a78bfa"
                            strokeWidth={2}
                            fill="url(#usersGradient)"
                        />
                        <Area
                            type="monotone"
                            dataKey="blogs"
                            stroke="#06b6d4"
                            strokeWidth={2}
                            fill="url(#blogsGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PlatformGrowthChart;