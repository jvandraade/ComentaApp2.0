export interface Statistics {
  totalComplaints: number;
  totalUsers: number;
  pendingComplaints: number;
  inProgressComplaints: number;
  resolvedComplaints: number;
  rejectedComplaints: number;
  complaintsByCategory: CategoryStat[];
  recentComplaints: RecentComplaint[];
}

export interface CategoryStat {
  categoryName: string;
  categoryColor: string;
  count: number;
}

export interface RecentComplaint {
  id: string;
  title: string;
  categoryName: string;
  status: string;
  createdAt: string;
}
