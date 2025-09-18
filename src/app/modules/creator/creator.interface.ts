export interface ICreator {
  fullName: string;
  phoneNumber: string;
  email: string;
  bio?: string;
  description?: string;
  socialMedia?: {
    platform: string;
    link: string;
  }[];
  interests?: string[];
  status?: 'accepted' | 'rejected' | 'pending';
  image?: string[] | undefined;
}
