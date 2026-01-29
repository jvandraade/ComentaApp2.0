import api from './api';
import { UserProfile, UpdateProfile } from '../types/user';

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const response = await api.get<UserProfile>('/user/profile');
    return response.data;
  },

  async updateProfile(data: UpdateProfile): Promise<UserProfile> {
    const response = await api.put<UserProfile>('/user/profile', data);
    return response.data;
  },

  async updateAvatar(avatarUrl: string): Promise<{ avatarUrl: string }> {
    const response = await api.put<{ avatarUrl: string }>(
      '/user/avatar',
      JSON.stringify(avatarUrl),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  },
};
