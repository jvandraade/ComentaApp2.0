import api from './api';
import { CommentData, CreateComment } from '../types/complaint';

export const commentService = {
  async createComment(complaintId: string, data: CreateComment): Promise<CommentData> {
    const response = await api.post<CommentData>(`/comment/${complaintId}`, data);
    return response.data;
  },

  async getComments(complaintId: string): Promise<CommentData[]> {
    const response = await api.get<CommentData[]>(`/comment/${complaintId}`);
    return response.data;
  },

  async deleteComment(commentId: string): Promise<void> {
    await api.delete(`/comment/${commentId}`);
  },
};
