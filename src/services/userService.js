import api from './api';

export const userService = {
  // 1. Get All Users (with pagination / limit)
  getUsers: async (params = {}) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  // 2. Get User Profile by ID
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // 3. Toggle Follow User
  toggleFollow: async (id) => {
    const response = await api.post(`/users/${id}/follow`);
    return response.data;
  },

  // 4. Update Profile
  updateProfile: async (data) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },
};

export default userService;
