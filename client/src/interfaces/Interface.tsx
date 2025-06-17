export interface User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  created_at?: string;
  updated_at?: string;
  _id?: string;
  role?: "admin" | "user";

}

export interface UserSchema {
  email: string;
  password: string;
}

// מבנה שיעור
export interface Lesson {
  _id?: string;
  user_id: string;
  category_id: string;
  sub_category_id: string;
  prompt: string;
  response: string;
  created_at?: string;
}

// קטגוריה
export interface Category {
  _id?: string;
  id?: string;
  name: string;
  subCategories?: SubCategory[];

}

// תת קטגוריה
export interface SubCategory {
  _id?: string;
  id?: string;
  name: string;
  category_id: string | Category;
}

// שיעור / Prompt
export interface Prompt {
  id: string;
  user_id: string;
  category_id: string ;
  // | Category;
  sub_category_id: string | SubCategory;
  prompt: string;
  response: string;
  created_at: string;
}

export interface ProfileAvatarProps {
  name: string;
}
