export interface News {
  id?: number;
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

export interface Notification {
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
