

// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";

// // import {
// //   Container,
// //   Typography,
// //   Box,
// //   TextField,
// //   MenuItem,
// //   Button,
// //   Paper,
// //   Divider,
// //   CircularProgress,
// // } from "@mui/material";

// // import {
// //   useGetCategoriesQuery,
// //   useGetSubCategoriesByCategoryQuery,
// // } from "../stores/Slices/categoryApiSlice";
// // import { useCreatePromptMutation } from "../stores/Slices/promptApiSlice";

// // const Lesson = () => {
// //   const { categoryId: paramCategoryId } = useParams<{ categoryId: string }>();

// //   const [categoryId, setCategoryId] = useState<string>("");
// //   const [subCategoryId, setSubCategoryId] = useState<string>("");
// //   const [question, setQuestion] = useState<string>("");
// //   const [response, setResponse] = useState<string>("");

// //   const {
// //     data: categories = [],
// //     isLoading: loadingCategories,
// //   } = useGetCategoriesQuery();

// //   const {
// //     data: subCategories = [],
// //     isLoading: loadingSubCategories,
// //   } = useGetSubCategoriesByCategoryQuery(
// //     { categoryId },
// //     { skip: !categoryId }
// //   );

// //   const [createPrompt, { isLoading: sending }] = useCreatePromptMutation();

// //   // אם הגיע קטגוריה בפרמטר, עדכון סטייט לאחר שהקטגוריות נטענו
// //   useEffect(() => {
// //     if (paramCategoryId && paramCategoryId !== "0" && categories.length > 0) {
// //       const exists = categories.find((cat) => cat._id === paramCategoryId);
// //       if (exists) {
// //         setCategoryId(paramCategoryId);
// //       }
// //     }
// //   }, [paramCategoryId, categories]);

// //   const handleSubmit = async () => {
// //     if (!categoryId || (!subCategoryId && !question.trim())) return;

// //     try {
// //       const res = await createPrompt({
// //         category_id: categoryId,
// //         sub_category_id: subCategoryId,
// //         prompt: question.trim() || "שאלה כללית על הנושא שנבחר",
// //       }).unwrap();

// //       setResponse(res.response);
// //     } catch (error) {
// //       console.error("שגיאה בשליחת שאלה:", error);
// //       setResponse("אירעה שגיאה בעת יצירת השיעור.");
// //     }
// //   };

// //   return (
// //     <Container maxWidth="md" sx={{ mt: 4, direction: "rtl" }}>
// //       <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
// //         <Typography variant="h4" gutterBottom>
// //           {categoryId && categoryId !== "0"
// //             ? loadingCategories
// //               ? "טוען נושא הלמידה..."
// //               : `נושא הלמידה: ${
// //                   categories.find((cat) => cat._id === categoryId)?.name ||
// //                   "נושא לא נמצא"
// //                 }`
// //             : "נושא הלמידה"}
// //         </Typography>

// //         <Typography variant="subtitle1" color="text.secondary" gutterBottom>
// //           בחרו קטגוריה ותת-קטגוריה או שאלו שאלה חופשית
// //         </Typography>

// //         {/* קטגוריה */}
// //         <TextField
// //           select
// //           label="בחר קטגוריה"
// //           fullWidth
// //           value={categoryId}
// //           onChange={(e) => {
// //             setCategoryId(e.target.value);
// //             setSubCategoryId("");
// //             setResponse("");
// //           }}
// //           margin="normal"
// //           disabled={loadingCategories}
// //         >
// //           {loadingCategories ? (
// //             <MenuItem disabled>טוען קטגוריות...</MenuItem>
// //           ) : (
// //             categories.map((cat) => (
// //               <MenuItem key={cat._id} value={cat._id}>
// //                 {cat.name}
// //               </MenuItem>
// //             ))
// //           )}
// //         </TextField>

// //         {/* תת קטגוריה */}
// //         <TextField
// //           select
// //           label="בחר תת קטגוריה"
// //           fullWidth
// //           value={subCategoryId}
// //           onChange={(e) => {
// //             setSubCategoryId(e.target.value);
// //             setResponse("");
// //           }}
// //           margin="normal"
// //           disabled={!categoryId || loadingSubCategories}
// //         >
// //           {loadingSubCategories ? (
// //             <MenuItem disabled>טוען תתי קטגוריות...</MenuItem>
// //           ) : (
// //             subCategories.map((sub) => (
// //               <MenuItem key={sub._id} value={sub._id}>
// //                 {sub.name}
// //               </MenuItem>
// //             ))
// //           )}
// //         </TextField>

// //         <Divider sx={{ my: 3 }} />

// //         {/* שאלה חופשית */}
// //         <TextField
// //           label="או כתבו שאלה חופשית"
// //           placeholder="למשל: מה ההבדל בין AI ל-ML?"
// //           multiline
// //           rows={4}
// //           fullWidth
// //           value={question}
// //           onChange={(e) => {
// //             setQuestion(e.target.value);
// //             setResponse("");
// //           }}
// //         />

// //         {/* כפתור שליחה */}
// //         <Box sx={{ textAlign: "left", mt: 3 }}>
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             onClick={handleSubmit}
// //             disabled={sending}
// //           >
// //             {sending ? <CircularProgress size={24} /> : "שלח שאלה"}
// //           </Button>
// //         </Box>
// //       </Paper>

// //       {/* תגובה מה-AI */}
// //       {response && (
// //         <Paper elevation={2} sx={{ p: 4 }}>
// //           <Typography variant="h5" gutterBottom>
// //             תגובת AI:
// //           </Typography>
// //           <Typography sx={{ whiteSpace: "pre-line" }}>{response}</Typography>
// //         </Paper>
// //       )}
// //     </Container>
// //   );
// // };

// // export default Lesson;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// import {
//   Container,
//   Typography,
//   Box,
//   TextField,
//   MenuItem,
//   Button,
//   Paper,
//   Divider,
//   CircularProgress,
//   Alert,
// } from "@mui/material";

// import {
//   useGetCategoriesQuery,
//   useGetSubCategoriesByCategoryQuery,
//   useGetCategoryByIdQuery,
// } from "../stores/Slices/categoryApiSlice";

// import { useCreatePromptMutation } from "../stores/Slices/promptApiSlice";

// const CreateLesson = () => {
//   const { categoryId: paramCategoryId } = useParams<{ categoryId: string }>();

//   const [categoryId, setCategoryId] = useState<string>("");
//   const [subCategoryId, setSubCategoryId] = useState<string>("");
//   const [question, setQuestion] = useState<string>("");
//   const [response, setResponse] = useState<string>("");

//   // טוען את כל הקטגוריות
//   const {
//     data: categories = [],
//     isLoading: loadingCategories,
//     isError: errorCategories,
//   } = useGetCategoriesQuery();

//   // טוען את הקטגוריה הנבחרת לפי id
//   const {
//     data: currentCategory,
//     isLoading: loadingCurrentCategory,
//     isError: errorCurrentCategory,
//   } = useGetCategoryByIdQuery(categoryId, { skip: !categoryId });

//   // טוען תתי קטגוריות לפי הקטגוריה שנבחרה
//   const {
//     data: subCategories = [],
//     isLoading: loadingSubCategories,
//     isError: errorSubCategories,
//   } = useGetSubCategoriesByCategoryQuery(
//     { categoryId },
//     { skip: !categoryId }
//   );

//   const [createPrompt, { isLoading: sending }] = useCreatePromptMutation();

//   // אם הגיע categoryId בפרמטר מהנתיב, מעדכן את הסטייט לאחר טעינת הקטגוריות
//   useEffect(() => {
//     if (
//       paramCategoryId &&
//       paramCategoryId !== "0" &&
//       categories.length > 0 &&
//       categories.find((cat) => cat._id === paramCategoryId)
//     ) {
//       setCategoryId(paramCategoryId);
//     }
//   }, [paramCategoryId, categories]);

//   const handleSubmit = async () => {
//     if (!categoryId || (!subCategoryId && !question.trim())) return;

//     try {
//       const res = await createPrompt({
//         category_id: categoryId,
//         sub_category_id: subCategoryId,
//         prompt: question.trim() || "שאלה כללית על הנושא שנבחר",
//       }).unwrap();

//       setResponse(res.response);
//     } catch (error) {
//       console.error("שגיאה בשליחת שאלה:", error);
//       setResponse("אירעה שגיאה בעת יצירת השיעור.");
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 4, direction: "rtl" }}>
//       <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           {categoryId && categoryId !== "0"
//             ? loadingCurrentCategory
//               ? "טוען נושא הלמידה..."
//               : errorCurrentCategory
//               ? "שגיאה בטעינת נושא הלמידה"
//               : `נושא הלמידה: ${currentCategory?.name || "נושא לא נמצא"}`
//             : "נושא הלמידה"}
//         </Typography>

//         <Typography variant="subtitle1" color="text.secondary" gutterBottom>
//           בחרו קטגוריה ותת-קטגוריה או שאלו שאלה חופשית
//         </Typography>

//         {/* טיפול בשגיאה בטעינת קטגוריות */}
//         {errorCategories && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             שגיאה בטעינת הקטגוריות. נסו לרענן.
//           </Alert>
//         )}

//         {/* קטגוריה */}
//         <TextField
//           select
//           label="בחר קטגוריה"
//           fullWidth
//           value={categoryId}
//           onChange={(e) => {
//             setCategoryId(e.target.value);
//             setSubCategoryId("");
//             setResponse("");
//           }}
//           margin="normal"
//           disabled={loadingCategories}
//         >
//           {loadingCategories ? (
//             <MenuItem disabled>טוען קטגוריות...</MenuItem>
//           ) : (
//             categories.map((cat) => (
//               <MenuItem key={cat._id} value={cat._id}>
//                 {cat.name}
//               </MenuItem>
//             ))
//           )}
//         </TextField>

//         {/* טיפול בשגיאה בטעינת תתי קטגוריות */}
//         {errorSubCategories && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             שגיאה בטעינת תתי הקטגוריות.
//           </Alert>
//         )}

//         {/* תת קטגוריה */}
//         <TextField
//           select
//           label="בחר תת קטגוריה"
//           fullWidth
//           value={subCategoryId}
//           onChange={(e) => {
//             setSubCategoryId(e.target.value);
//             setResponse("");
//           }}
//           margin="normal"
//           disabled={!categoryId || loadingSubCategories}
//         >
//           {loadingSubCategories ? (
//             <MenuItem disabled>טוען תתי קטגוריות...</MenuItem>
//           ) : (
//             subCategories.map((sub) => (
//               <MenuItem key={sub._id} value={sub._id}>
//                 {sub.name}
//               </MenuItem>
//             ))
//           )}
//         </TextField>

//         <Divider sx={{ my: 3 }} />

//         {/* שאלה חופשית */}
//         <TextField
//           label="או כתבו שאלה חופשית"
//           placeholder="למשל: מה ההבדל בין AI ל-ML?"
//           multiline
//           rows={4}
//           fullWidth
//           value={question}
//           onChange={(e) => {
//             setQuestion(e.target.value);
//             setResponse("");
//           }}
//         />

//         {/* כפתור שליחה */}
//         <Box sx={{ textAlign: "left", mt: 3 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             disabled={sending}
//           >
//             {sending ? <CircularProgress size={24} /> : "שלח שאלה"}
//           </Button>
//         </Box>
//       </Paper>

//       {/* תגובה מה-AI */}
//       {response && (
//         <Paper elevation={2} sx={{ p: 4 }}>
//           <Typography variant="h5" gutterBottom>
//             תגובת AI:
//           </Typography>
//           <Typography sx={{ whiteSpace: "pre-line" }}>{response}</Typography>
//         </Paper>
//       )}
//     </Container>
//   );
// };

// export default CreateLesson;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";

import {
  useGetCategoriesQuery,
  useGetSubCategoriesByCategoryQuery,
  // useGetCategoryByIdQuery,
} from "../stores/Slices/categoryApiSlice";

import { useCreatePromptMutation } from "../stores/Slices/promptApiSlice";
// import { useAppSelector } from "../stores/hooks";
import { useDispatch, useSelector } from 'react-redux';


const CreateLesson = () => {
  const { categoryId: paramCategoryId } = useParams<{ categoryId: string }>();

  const user = useSelector((state: any) => state.auth.currentUser);

  const [categoryId, setCategoryId] = useState<string>("");
  const [subCategoryId, setSubCategoryId] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const {
    data: categories = [],
    isLoading: loadingCategories,
    isError: errorCategories,
  } = useGetCategoriesQuery();

  const {
    data: subCategories = [],
    isLoading: loadingSubCategories,
    isError: errorSubCategories,
  } = useGetSubCategoriesByCategoryQuery(
    { categoryId },
    { skip: !categoryId }
  );

  // const {
  //   data: currentCategory,
  //   isLoading: loadingCurrentCategory,
  //   isError: errorCurrentCategory,
  // } = useGetCategoryByIdQuery(categoryId, { skip: !categoryId });

  const [createPrompt, { isLoading: sending }] = useCreatePromptMutation();

  useEffect(() => {
    if (
      paramCategoryId &&
      paramCategoryId !== "0" &&
      categories.length > 0 &&
      categories.find((cat) => cat._id === paramCategoryId)
    ) {
      setCategoryId(paramCategoryId);
    }
  }, [paramCategoryId, categories]);

  const handleSubmit = async () => {
    console.log("Current user:", user);

    if (!user?.id) {
      setResponse("שגיאה: עליך להיות מחובר כדי לשלוח שאלה.");
      return;
    }

    if (!categoryId || (!subCategoryId && !question.trim())) {
      setResponse("נא לבחור קטגוריה או להזין שאלה.");
      return;
    }

    try {
      const result = await createPrompt({
        user_id: user.id,
        category_id: categoryId,
        sub_category_id: subCategoryId || undefined,
        prompt: question.trim() || "שאלה כללית על הנושא שנבחר",
      }).unwrap();

      setResponse(result.response);
    } catch (error) {
      console.error("שגיאה בשליחת שאלה:", error);
      setResponse("אירעה שגיאה בעת יצירת השיעור.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, direction: "rtl" }}>
      <Typography variant="h4" gutterBottom>
        צור שיעור חדש
      </Typography>

      {/* בחירת קטגוריה */}
      <TextField
        select
        fullWidth
        label="קטגוריה"
        value={categoryId}
        onChange={(e) => {
          setCategoryId(e.target.value);
          setSubCategoryId(""); // אפס תת קטגוריה בעת שינוי קטגוריה
        }}
        sx={{ my: 2 }}
        disabled={loadingCategories}
      >
        {categories.map((cat) => (
          <MenuItem key={cat._id} value={cat._id}>
            {cat.name}
          </MenuItem>
        ))}
      </TextField>

      {/* בחירת תת קטגוריה */}
      {subCategories.length > 0 && (
        <TextField
          select
          fullWidth
          label="תת קטגוריה"
          value={subCategoryId}
          onChange={(e) => setSubCategoryId(e.target.value)}
          sx={{ my: 2 }}
          disabled={loadingSubCategories}
        >
          {subCategories.map((sub) => (
            <MenuItem key={sub._id} value={sub._id}>
              {sub.name}
            </MenuItem>
          ))}
        </TextField>
      )}

      {/* שאלה חופשית */}
      <TextField
        fullWidth
        label="שאלה חופשית (לא חובה)"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        multiline
        rows={4}
        sx={{ my: 2 }}
      />

      {/* כפתור שליחה */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={sending || !categoryId}
      >
        {sending ? "שולח..." : "שלח שאלה"}
      </Button>

      <Divider sx={{ my: 4 }} />

      {/* הצגת תגובת AI */}
      {response && (
        <Paper elevation={3} sx={{ p: 3, bgcolor: "#f9f9f9" }}>
          <Typography variant="h6" gutterBottom>
            תשובת AI:
          </Typography>
          <Typography sx={{ whiteSpace: "pre-line" }}>{response}</Typography>
        </Paper>
      )}

      {/* טעינה או שגיאה */}
      {(loadingCategories || loadingSubCategories) && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}
      {(errorCategories || errorSubCategories) && (
        <Alert severity="error" sx={{ mt: 2 }}>
          שגיאה בטעינת קטגוריות.
        </Alert>
      )}
    </Container>
  );
};

export default CreateLesson;
