import React from 'react';
import Tag from '../../components/common/Tag';
import styles from '../../styles/home-feed/RecommendedTopics.module.css';

const topics = [
    { id: 1, label: 'Artificial Intelligence', active: true },
    { id: 2, label: 'UX Design', active: false },
    { id: 3, label: 'Productivity', active: false },
    { id: 4, label: 'Web3', active: false },
    { id: 5, label: 'Writing', active: false },
];

const RecommendedTopics = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>Recommended Topics</h3>
            <div className={styles.topicsGrid}>
                {topics.map((topic) => (
                    <Tag
                        key={topic.id}
                        variant="outline"
                        active={topic.active}
                        onClick={() => { }}
                    >
                        {topic.label}
                    </Tag>
                ))}
            </div>
        </div>
    );
};

export default RecommendedTopics;