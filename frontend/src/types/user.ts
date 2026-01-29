export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  phoneNumber?: string;
  address?: string;
  city: string;
  state: string;
  role: string;
  createdAt: string;
}

export interface UpdateProfile {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
  city: string;
  state: string;
}
