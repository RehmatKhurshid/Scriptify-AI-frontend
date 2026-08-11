import api from './api';

export const aiService = {
    // 1. Generate Blog Draft from idea/topic
    generateDraft: async (topic, keywords = '', tone = 'Professional and engaging', wordCount = 600) => {
        const response = await api.post('/ai/generate-draft', { topic, keywords, tone, wordCount });
        return response.data;
    },

    // 2. Generate SEO Tags and category from title & content
    generateSEOTags: async (title, content) => {
        const response = await api.post('/ai/generate-seo-tags', { title, content });
        return response.data;
    },

    // 3. Summarize blog content into an excerpt
    summarizeBlog: async (content) => {
        const response = await api.post('/ai/summarize', { content });
        return response.data;
    },

    // 4. Improve/Manipulate Content (improve, continue, rewrite, expand, shorten)
    improveContent: async (content, instruction) => {
        const response = await api.post('/ai/improve-content', { content, instruction });
        return response.data;
    },

    // 5. Generate AI Thumbnail
    generateThumbnail: async (title, excerpt = '', customPrompt = '') => {
        const response = await api.post('/ai/generate-thumbnail', { title, excerpt, customPrompt });
        return response.data;
    },

    // 6. Generate AI Title suggestions
    generateTitles: async (topic = '', content = '') => {
        const response = await api.post('/ai/generate-titles', { topic, content });
        return response.data;
    },

    // 7. Get Trending Blogs
    getTrendingBlogs: async () => {
        const response = await api.get('/ai/recommendations/trending');
        return response.data;
    },

    // 8. Get Similar Blogs
    getSimilarBlogs: async (blogId) => {
        const response = await api.get(`/ai/recommendations/similar/${blogId}`);
        return response.data;
    },

    // 9. Get Personalized Feed
    getPersonalizedFeed: async (page = 1, limit = 10) => {
        const response = await api.get(`/ai/recommendations/feed?page=${page}&limit=${limit}`);
        return response.data;
    },

    // 10. Log Reading Duration
    logReadingDuration: async (blogId, duration) => {
        const response = await api.post('/ai/recommendations/reading-duration', { blogId, duration });
        return response.data;
    },
};

export default aiService;
