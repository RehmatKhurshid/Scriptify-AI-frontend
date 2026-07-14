import React from 'react';
import styles from '../../styles/bookmarks/RecentlySaved.module.css';

const recentItems = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=100&h=100&fit=crop',
        title: 'Neural Interface Spec...',
        time: '2 hours ago',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop',
        title: 'Sustainable Digital Citie...',
        time: 'Yesterday',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
        title: 'The Fluid Nature of Creat...',
        time: 'Oct 10, 2023',
    },
];

const RecentlySaved = () => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Recently Saved</h3>
            <div className={styles.list}>
                {recentItems.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <img src={item.image} alt={item.title} className={styles.thumbnail} />
                        <div className={styles.info}>
                            <p className={styles.itemTitle}>{item.title}</p>
                            <p className={styles.itemTime}>{item.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlySaved;