import api from './api';
import { Statistics } from '../types/dashboard';

export const dashboardService = {
  async getStatistics(): Promise<Statistics> {
    const response = await api.get<Statistics>('/dashboard/statistics');
    return response.data;
  },

  async updateComplaintStatus(complaintId: string, status: string): Promise<void> {
    await api.put(`/dashboard/complaint/${complaintId}/status`, JSON.stringify(status), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

export default dashboardService;
