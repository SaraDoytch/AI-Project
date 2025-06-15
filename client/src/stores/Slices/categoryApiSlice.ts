// src/features/Category/categoryApiSlice.ts

import apiSlice from "../Slices/ApiSlice";
import { Category, SubCategory } from "../../interfaces/Interface";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- קטגוריות ---

    // יצירת קטגוריה
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (category) => ({
        url: "api/categories/addCategory",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),

    // שליפת כל הקטגוריות
    getCategories: builder.query<Category[], void>({
      query: () => "api/categories/getCategories",
      providesTags: ["Category"],
    }),

    // עדכון קטגוריה
    updateCategory: builder.mutation<Category, { id: string; updated: Partial<Category> }>({
      query: ({ id, updated }) => ({
        url: `api/categories/${id}`,
        method: "PUT",
        body: updated,
      }),
      invalidatesTags: ["Category"],
    }),

    // מחיקת קטגוריה
    deleteCategory: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `api/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // --- תתי קטגוריות ---

    // יצירת תת-קטגוריה
    createSubCategory: builder.mutation<SubCategory, Partial<SubCategory>>({
      query: (subCategory) => ({
        url: "api/categories/addSubcategory",
        method: "POST",
        body: subCategory,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    // שליפת תתי קטגוריות לפי קטגוריה
   getSubCategoriesByCategory: builder.query<SubCategory[], { categoryId: string }>({
  query: ({ categoryId }) => `/api/categories/subcategories/${categoryId}`,
  providesTags: ["SubCategory"],
}),


    // עדכון תת-קטגוריה
    updateSubCategory: builder.mutation<SubCategory, { id: string; updated: Partial<SubCategory> }>({
      query: ({ id, updated }) => ({
        url: `api/categories/${id}`,
        method: "PUT",
        body: updated,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    // מחיקת תת-קטגוריה
    deleteSubCategory: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `api/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategory"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateSubCategoryMutation,
  useGetSubCategoriesByCategoryQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = categoryApiSlice;

export default categoryApiSlice;
