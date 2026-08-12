import React from 'react';

const Logo = ({ size = 24, className = '' }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
        >
            <defs>
                <linearGradient id="scriptifyBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
            </defs>

            {/* Purple Rounded Square Badge */}
            <rect width="32" height="32" rx="9" fill="url(#scriptifyBoxGrad)" />

            {/* Crisp Bold White Letter "S" */}
            <path
                d="M21.5 11.5C21.5 9.5 19.5 8 16.5 8C13.2 8 11.2 9.8 11.2 12.2C11.2 14.2 12.5 15.5 15.5 16.2L17.2 16.6C19.5 17.1 20.8 18.2 20.8 20.2C20.8 22.8 18.5 24.5 15.2 24.5C11.8 24.5 9.8 22.8 9.5 20"
                stroke="white"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default Logo;