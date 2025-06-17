// src/features/Category/category.ts

import apiSlice from "../Slices/ApiSlice";
import { Category, SubCategory } from "../../interfaces/Interface";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- קטגוריות ---

    // יצירת קטגוריה
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (category) => ({
        url: "/api/categories/",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),

    // שליפת כל הקטגוריות
    getCategories: builder.query<Category[], void>({
      query: () => "/api/categories/",
      providesTags: ["Category"],
    }),
// שליפת קטגוריה לפי ID
getCategoryById: builder.query<Category, string>({
  query: (id) => `/api/categories/${id}`,
  providesTags: (_result, _error, id) => [{ type: "Category", id }],
}),
    // עדכון קטגוריה
    updateCategory: builder.mutation<Category, { id: string; updated: Partial<Category> }>({
      query: ({ id, updated }) => ({
        url: `/api/categories/${id}`,
        method: "PUT",
        body: updated,
      }),
      invalidatesTags: ["Category"],
    }),
    // --- קטגוריות ---
getAllCategoriesWithSubs: builder.query<Category[], void>({
  query: () => "/api/categories/withSubs",
  providesTags: ["Category", "SubCategory"],
}),

    // מחיקת קטגוריה
    deleteCategory: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/api/categories/${id}`,

        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // --- תתי קטגוריות ---

    // יצירת תת-קטגוריה
    createSubCategory: builder.mutation<SubCategory, Partial<SubCategory>>({
      query: (category_id) => ({
        url: "/api/categories/subCategory",

        method: "POST",
        body: category_id,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    // שליפת תתי קטגוריות לפי קטגוריה
   getSubCategoriesByCategory: builder.query<SubCategory[], { categoryId: string }>({
  query: ({ categoryId }) => `/api/categories/subCategories/${categoryId}`,
  providesTags: ["SubCategory"],
}),


    // עדכון תת-קטגוריה
    updateSubCategory: builder.mutation<SubCategory, { id: string; updated: Partial<SubCategory> }>({
      query: ({ id, updated }) => ({
        url: `/api/categories/subCategory/${id}`,
        method: "PUT",
        body: updated,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    // מחיקת תת-קטגוריה
    deleteSubCategory: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/api/categories/subCategory/${id}`,
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
  useGetCategoryByIdQuery,
  useGetSubCategoriesByCategoryQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetAllCategoriesWithSubsQuery
} = categoryApiSlice;

export default categoryApiSlice;
