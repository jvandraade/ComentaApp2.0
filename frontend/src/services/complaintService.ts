import api from './api';
import {
  Category,
  CreateComplaint,
  Complaint,
  SearchParams,
  PaginatedResponse,
} from '../types/complaint';

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

  async searchComplaints(params: SearchParams): Promise<PaginatedResponse<Complaint>> {
    const response = await api.get<PaginatedResponse<Complaint>>('/complaint/search', {
      params: {
        keyword: params.keyword || undefined,
        categoryId: params.categoryId || undefined,
        status: params.status || undefined,
        state: params.state || undefined,
        city: params.city || undefined,
        page: params.page || 1,
        pageSize: params.pageSize || 10,
      },
    });
    return response.data;
  },
};

export default complaintService;
