export interface User {
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
