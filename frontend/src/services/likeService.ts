import api from './api';
import { LikeResponse } from '../types/complaint';

export const likeService = {
  async toggleLike(complaintId: string): Promise<LikeResponse> {
    const response = await api.post<LikeResponse>(`/like/${complaintId}`);
    return response.data;
  },
};
