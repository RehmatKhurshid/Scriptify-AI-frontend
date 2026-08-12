import api from './api';

const adminService = {
  getDashboard: async () => (await api.get('/admin/dashboard')).data,
  getUsers: async (params = {}) => (await api.get('/admin/users', { params })).data,
  toggleUserSuspension: async (id) => (await api.patch(`/admin/users/${id}/suspend`)).data,
  changeUserRole: async (id, role) => (await api.patch(`/admin/users/${id}/role`, { role })).data,
  sendHateSpeechWarning: async (id) => (await api.post(`/admin/users/${id}/warn-hate-speech`)).data,
  getFlaggedComments: async (params = {}) => (await api.get('/admin/comments/flagged', { params })).data,
  moderateComment: async (commentId, action) => (await api.patch(`/admin/comments/${commentId}/moderate`, { action })).data,
  getBlogs: async (params = {}) => (await api.get('/admin/blogs', { params })).data,
  toggleFeaturedBlog: async (id) => (await api.patch(`/admin/blogs/${id}/feature`)).data,
  deleteBlog: async (id) => (await api.delete(`/blogs/${id}`)).data,
};

export default adminService;
