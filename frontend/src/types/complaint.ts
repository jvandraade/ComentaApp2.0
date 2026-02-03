export interface Category {
  id: string;
  name: string;
  iconName: string;
  color: string;
}

export interface CreateComplaint {
  categoryId: string;
  title: string;
  description: string;
  latitude?: number;
  longitude?: number;
  address: string;
  mediaUrls: string[];
}

export interface Complaint {
  id: string;
  userId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
  categoryId: string;
  category: Category;
  title: string;
  description: string;
  latitude?: number;
  longitude?: number;
  address: string;
  status: string;
  media: ComplaintMedia[];
  likesCount: number;
  commentsCount: number;
  isLikedByCurrentUser: boolean;
  createdAt: string;
}

export interface ComplaintMedia {
  id: string;
  mediaUrl: string;
  mediaType: 'Image' | 'Video';
}

export interface CommentData {
  id: string;
  userId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
  complaintId: string;
  content: string;
  createdAt: string;
}

export interface CreateComment {
  content: string;
}

export interface LikeResponse {
  isLiked: boolean;
  likesCount: number;
}

export interface SearchParams {
  keyword?: string;
  categoryId?: string;
  status?: string;
  state?: string;
  city?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
