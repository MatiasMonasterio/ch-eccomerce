export interface User {
  id: string;
  email: string;
  iat: number;
}

export interface IUser {
  id: string;
  email: string;
  name?: string;
  address?: string;
  age?: number;
  phone?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
