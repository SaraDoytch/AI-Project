export interface User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string; 
  created_at?: string;
  updated_at?: string; 
  _id?: string; 
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

// src/interfaces/Interface.ts

// קטגוריה
export interface Category {
  _id: string;
  name: string;
}

// תת קטגוריה
export interface SubCategory {
  _id: string;
  name: string;
  category_id: string | Category; // לפעמים נקבל רק id ולפעמים אובייקט מלא
}

// שיעור / Prompt
export interface Prompt {
  _id: string;
  user_id: string; // אפשר גם: User אם יש לך ממשק User
  category_id: string | Category;
  sub_category_id: string | SubCategory;
  prompt: string;
  response: string;
  created_at: string; // אם את/ה מקבל/ת בפורמט DateTime string מהשרת
}
