import api from './api';

export const blogService = {
  // 1. Create Blog
  createBlog: async (blogData) => {
    const response = await api.post('/blogs', blogData);
    return response.data;
  },

  // 2. Get All Published Blogs (with filters/pagination)
  getAllBlogs: async (params = {}) => {
    const response = await api.get('/blogs', { params });
    return response.data;
  },

  // 3. Get My Blogs & Drafts
  getMyBlogs: async (params = {}) => {
    const response = await api.get('/blogs/me/blogs', { params });
    return response.data;
  },

  // 4. Get Blog By ID
  getBlogById: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },

  // 5. Update Blog
  updateBlog: async (id, blogData) => {
    const response = await api.put(`/blogs/${id}`, blogData);
    return response.data;
  },

  // 6. Delete Blog
  deleteBlog: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },

  // 7. Like Blog
  toggleLike: async (id) => {
    const response = await api.post(`/blogs/${id}/like`);
    return response.data;
  },

  // 8. Get Comments
  getComments: async (id) => {
    const response = await api.get(`/blogs/${id}/comments`);
    return response.data;
  },

  // 9. Add Comment
  addComment: async (id, commentData) => {
    const response = await api.post(`/blogs/${id}/comments`, commentData);
    return response.data;
  },

  // 10. Delete Comment
  deleteComment: async (id, commentId) => {
    const response = await api.delete(`/blogs/${id}/comments/${commentId}`);
    return response.data;
  },
};

export default blogService;
