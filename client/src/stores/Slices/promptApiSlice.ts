// src/features/Prompt/promptApiSlice.ts

import apiSlice from "../Slices/ApiSlice";
import { Prompt } from "../../interfaces/Interface";

const promptApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // יצירת פנייה ל-AI ושמירת שיעור
    createPrompt: builder.mutation<Prompt, Partial<Prompt>>({
      query: (promptData) => ({
        url: "api/prompts/generate",
        method: "POST",
        body: promptData,
      }),
      invalidatesTags: ["Prompt"],
    }),

    // שליפת פניות לפי משתמש
    getPromptsByUser: builder.query<Prompt[], string>({ // userId
      query: (userId) => `api/prompts/user/${userId}`,
      providesTags: ["Prompt"],
    }),

    // --- שיעורים / Prompts --- (מנהל רואה הכול)
getAllPrompts: builder.query<Prompt[], void>({
  query: () => "api/prompts/",
  providesTags: ["Prompt"],
}),

    // מחיקת פנייה
    deletePrompt: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `api/prompt/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Prompt"],
    }),
  }),
});

export const {
  useCreatePromptMutation,
  useGetPromptsByUserQuery,
  useDeletePromptMutation,
  useGetAllPromptsQuery
} = promptApiSlice;

export default promptApiSlice;
