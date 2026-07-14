import React from 'react';
import styles from '../../styles/bookmarks/FavoriteCategories.module.css';

const categories = [
    { id: 'ai', label: 'Artificial Intelligence' },
    { id: 'ux', label: 'UX Design' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'web3', label: 'Web3' },
    { id: 'writing', label: 'Writing' },
];

const FavoriteCategories = () => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Favorite Categories</h3>
            <div className={styles.tags}>
                {categories.map((cat) => (
                    <span key={cat.id} className={styles.tag}>
                        {cat.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default FavoriteCategories;