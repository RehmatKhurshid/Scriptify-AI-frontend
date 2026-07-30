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
};

export default aiService;
