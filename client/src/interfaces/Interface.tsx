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
// לתהליך התחברות
export interface ILoginCredentials {
  email: string;
  password: string;
}

// תגובה משרת לאחר התחברות/הרשמה
export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
