// interfaces.ts

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string; 
  createdAt?: string;
  updatedAt?: string;
}

export interface ICategory {
  _id?: string;
  name: string;
}

export interface ISubCategory {
  _id?: string;
  name: string;
  categoryId: string;
}

export interface IPrompt {
  _id?: string;
  userId: string;
  categoryId: string;
  subCategoryId: string;
  prompt: string;
  response: string;
  createdAt?: string;
}
