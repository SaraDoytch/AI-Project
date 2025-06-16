// src/features/Admin/adminApiSlice.ts
import apiSlice from '../Slices/ApiSlice'; 
export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersWithPrompts: builder.query<
      Array<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        prompts: Array<{ id: string; title: string; created_at: string }>;
      }>,
      void
    >({
      query: () => '/api/admin/users_with_prompts',
      providesTags: ['User', 'Prompt'],
    }),
  }),
});

export const { useGetUsersWithPromptsQuery } = adminApiSlice;
