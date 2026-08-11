/**
 * Returns the profile avatar URL for a user or author.
 * Uses the user's uploaded avatar image if available.
 * Otherwise, falls back to a consistent SVG avatar generated from their name.
 */
export const getAvatarUrl = (userOrAvatar, fallbackName = 'User') => {
    if (typeof userOrAvatar === 'string' && userOrAvatar.trim() !== '') {
        return userOrAvatar;
    }

    if (userOrAvatar && typeof userOrAvatar === 'object') {
        if (userOrAvatar.avatar && typeof userOrAvatar.avatar === 'string' && userOrAvatar.avatar.trim() !== '') {
            return userOrAvatar.avatar;
        }
        if (userOrAvatar.authorAvatar && typeof userOrAvatar.authorAvatar === 'string' && userOrAvatar.authorAvatar.trim() !== '') {
            return userOrAvatar.authorAvatar;
        }
        if (userOrAvatar.avatarUrl && typeof userOrAvatar.avatarUrl === 'string' && userOrAvatar.avatarUrl.trim() !== '') {
            return userOrAvatar.avatarUrl;
        }
    }

    let name = fallbackName;
    if (typeof userOrAvatar === 'object' && userOrAvatar) {
        name = userOrAvatar.fullName ||
            `${userOrAvatar.firstName || ''} ${userOrAvatar.lastName || ''}`.trim() ||
            userOrAvatar.name ||
            userOrAvatar.username ||
            fallbackName;
    } else if (typeof userOrAvatar === 'string' && userOrAvatar.trim() !== '') {
        name = userOrAvatar;
    }

    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || 'User')}`;
};

export default getAvatarUrl;
