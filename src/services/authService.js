import api from './api';

export const authService = {
  // 1. User Signup
  signUp: async (userData) => {
    const response = await api.post('/users/signup', userData);
    return response.data;
  },

  // 2. Email Verification (OTP)
  verifyEmail: async (data) => {
    const response = await api.post('/users/verify-email', data);
    return response.data;
  },

  // 3. Resend OTP
  resendOTP: async (data) => {
    const response = await api.post('/users/resend-otp', data);
    return response.data;
  },

  // 4. Sign In
  signIn: async (credentials) => {
    const response = await api.post('/users/signin', credentials);
    return response.data;
  },

  // 5. Forgot Password
  forgotPassword: async (data) => {
    const response = await api.post('/users/forgot-password', data);
    return response.data;
  },

  // 6. Reset Password
  resetPassword: async (data) => {
    const response = await api.post('/users/reset-password', data);
    return response.data;
  },

  // 7. Logout
  logout: async () => {
    const response = await api.post('/users/logout');
    return response.data;
  },

  // 8. Update Profile
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  // 9. Change Password
  changePassword: async (data) => {
    const response = await api.put('/users/change-password', data);
    return response.data;
  },

  // 10. Delete Account
  deleteAccount: async (password) => {
    const response = await api.delete('/users/account', { data: { password } });
    return response.data;
  },
};

export default authService;
