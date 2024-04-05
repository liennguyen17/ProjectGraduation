export interface NewsType {
  id: number;
  title: string;
  description: string;
  file?: string;
  image?: string;
  content: string;
  year: number;
  subject: string;
  createAt?: string;
  updateAt?: string;
}

export interface NotificationType {
  id: number;
  user: null;
  title: string;
  description: string;
  content: string;
  file: string;
  isRead: string;
  createAt: string;
  updateAt: string;
}

export interface MasterData {
  id: number;
  type: string;
  code: string;
  name: string;
}

export interface UserType {
  id: number;
  name: string;
  username: string;
  password?: string;
  dob: string;
  address: string;
  email: string;
  phone: string;
  subject: string;
  role: string;
  userCode: string;
  className: string;
  createAt?: string;
  updateAt?: string;
}
