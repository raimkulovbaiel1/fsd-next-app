import { User, UserProfile } from '../types/user';

export class UserService {
  static async getUser(id: string): Promise<User | null> {
    // TODO: Implement API call
    return null;
  }

  static async getUserProfile(id: string): Promise<UserProfile | null> {
    // TODO: Implement API call
    return null;
  }

  static async updateUserProfile(id: string, data: Partial<UserProfile>): Promise<UserProfile | null> {
    // TODO: Implement API call
    return null;
  }
}


