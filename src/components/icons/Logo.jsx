import React from 'react';

const Logo = ({ size = 24, className = '' }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect width="24" height="24" rx="6" fill="url(#logoGradient)" />
            <path
                d="M7 17L12 7L17 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 13H15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <defs>
                <linearGradient id="logoGradient" x1="0" y1="0" x2="24" y2="24">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default Logo;