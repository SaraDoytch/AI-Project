// // src/features/Lesson/lessonApiSlice.ts

// import apiSlice from "../Slices/ApiSlice";
// import { User ,Lesson} from "../../interfaces/Interface";



// const lessonApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
    
//     // יצירה
//     createLesson: builder.mutation<Lesson, Partial<Lesson>>({
//       query: (lesson) => ({
//         url: "api/lesson/generate",
//         method: "POST",
//         body: lesson,
//       }),
//       invalidatesTags: ["Lesson"],
//     }),

//     // שליפה לפי משתמש
//     getLessons: builder.query<Lesson[], string>({ // userId
//       query: (userId) => `api/lessons/${userId}`,
//       providesTags: ["Lesson"],
//     }),

//     // עדכון שיעור
//     updateLesson: builder.mutation<Lesson, { id: string; updated: Partial<Lesson> }>({
//       query: ({ id, updated }) => ({
//         url: `api/lesson/${id}`,
//         method: "PUT",
//         body: updated,
//       }),
//       invalidatesTags: ["Lesson"],
//     }),

//     // מחיקה
//     deleteLesson: builder.mutation<{ success: boolean }, string>({
//       query: (id) => ({
//         url: `api/lesson/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Lesson"],
//     }),

//   }),
// });

// export const {
//   useCreateLessonMutation,
//   useGetLessonsQuery,
//   useUpdateLessonMutation,
//   useDeleteLessonMutation,
// } = lessonApiSlice;

// export default lessonApiSlice;
