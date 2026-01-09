export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface UserProfile extends User {
  phone?: string;
  company?: string;
  location?: string;
}

