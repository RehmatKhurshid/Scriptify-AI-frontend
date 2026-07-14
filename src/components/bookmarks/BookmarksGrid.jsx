import React from 'react';
import BookmarkCard from './BookmarkCard';
import styles from '../../styles/bookmarks/BookmarksGrid.module.css';

const bookmarks = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
        category: 'Tech',
        categoryColor: '#8B5CF6',
        author: 'Elena Rostova',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        date: 'Oct 12, 2023',
        title: 'The Architecture of Tomorrow: AI\'s Role in Generative Design',
        excerpt: 'Exploring how neural networks are moving beyond image generation to create functional, structurally sound, and impossibly beautiful buildings...',
        views: '2.4k',
        likes: '842',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
        category: 'Productivity',
        categoryColor: '#10B981',
        author: 'Alex Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        date: 'Sep 28, 2023',
        title: 'Mastering Deep Work in an AI-Powered Era',
        excerpt: 'Practical strategies to maintain intense focus while leveraging modern intelligent tools without losing your creative edge...',
        views: '5.1k',
        likes: '1.2k',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
        category: 'Design',
        categoryColor: '#EC4899',
        author: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        date: 'Oct 10, 2023',
        title: 'Fluid Typography: Breaking the Grid in 2024',
        excerpt: 'How responsive web design is shifting towards more organic, dynamic typographic systems that adapt to user context...',
        views: '1.8k',
        likes: '623',
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
        category: 'Web3',
        categoryColor: '#3B82F6',
        author: 'Marcus Thorne',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        date: 'Sep 15, 2023',
        title: 'Beyond Speculation: Building Real-World Value in Web3',
        excerpt: 'How decentralization is solving tangible coordination problems for global creators and communities...',
        views: '3.2k',
        likes: '956',
    },
];

const BookmarksGrid = () => {
    return (
        <div className={styles.grid}>
            {bookmarks.map((bookmark) => (
                <BookmarkCard key={bookmark.id} {...bookmark} />
            ))}
        </div>
    );
};

export default BookmarksGrid;