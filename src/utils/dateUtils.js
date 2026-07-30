/**
 * Formats a date string or timestamp into IST (Indian Standard Time) format e.g. "03:45 PM IST"
 */
export const formatISTTime = (dateInput) => {
    if (!dateInput) return 'Just now';
    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return 'Just now';
        return date.toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }) + ' IST';
    } catch {
        return 'Just now';
    }
};

/**
 * Formats date into "MMM DD, YYYY" in IST
 */
export const formatISTDate = (dateInput) => {
    if (!dateInput) return 'Recently';
    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return 'Recently';
        return date.toLocaleDateString('en-IN', {
            timeZone: 'Asia/Kolkata',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    } catch {
        return 'Recently';
    }
};
