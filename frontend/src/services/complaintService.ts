import api from './api';
import { Category, CreateComplaint, Complaint } from '../types/complaint';

export const complaintService = {
  async getCategories(): Promise<Category[]> {
    const response = await api.get<Category[]>('/complaint/categories');
    return response.data;
  },

  async createComplaint(data: CreateComplaint): Promise<Complaint> {
    const response = await api.post<Complaint>('/complaint', data);
    return response.data;
  },

  async getComplaints(): Promise<Complaint[]> {
    const response = await api.get<Complaint[]>('/complaint');
    return response.data;
  },

  async getComplaintById(id: string): Promise<Complaint> {
    const response = await api.get<Complaint>(`/complaint/${id}`);
    return response.data;
  },
};
export default complaintService;
