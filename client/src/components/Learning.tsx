

// // import React, { useState, useEffect } from "react";
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
// // import { useCreatePromptMutation } from "../stores/Slices/promptApiSlice";
// // import { useGetCategoriesQuery, useGetSubCategoriesByCategoryQuery } from "../stores/Slices/categoryApiSlice";

// // const Learning: React.FC = () => {
// //   const [categoryId, setCategoryId] = useState("");
// //   const [subCategoryId, setSubCategoryId] = useState("");
// //   const [question, setQuestion] = useState("");
// //   const [response, setResponse] = useState("");

// //   const { data: categories = [], isLoading: loadingCategories } = useGetCategoriesQuery();
// //   const { data: subCategories = [], isLoading: loadingSubCategories } = useGetSubCategoriesByCategoryQuery(categoryId, {
// //     skip: !categoryId,
// //   });

// //   const [createPrompt, { isLoading: sending }] = useCreatePromptMutation();

// //   const handleSubmit = async () => {
// //     if (!categoryId || (!subCategoryId && !question)) return;

// //     try {
// //       const res = await createPrompt({
// //         category_id: categoryId,
// //         sub_category_id: subCategoryId,
// //         prompt: question || "שאלה כללית על הנושא שנבחר",
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
// //           נושא הלמידה
// //         </Typography>
// //         <Typography variant="subtitle1" color="text.secondary">
// //           בחרו קטגוריה ותת-קטגוריה או שאלו שאלה חופשית
// //         </Typography>

// //         <TextField
// //           select
// //           label="בחר קטגוריה"
// //           fullWidth
// //           value={categoryId}
// //           onChange={(e) => {
// //             setCategoryId(e.target.value);
// //             setSubCategoryId(""); // אפס תת קטגוריה
// //           }}
// //           margin="normal"
// //         >
// //           {loadingCategories ? (
// //             <MenuItem disabled>טוען...</MenuItem>
// //           ) : (
// //             categories.map((cat: any) => (
// //               <MenuItem key={cat._id} value={cat._id}>
// //                 {cat.name}
// //               </MenuItem>
// //             ))
// //           )}
// //         </TextField>

// //         <TextField
// //           select
// //           label="בחר תת קטגוריה"
// //           fullWidth
// //           value={subCategoryId}
// //           onChange={(e) => setSubCategoryId(e.target.value)}
// //           margin="normal"
// //           disabled={!categoryId || loadingSubCategories}
// //         >
// //           {loadingSubCategories ? (
// //             <MenuItem disabled>טוען...</MenuItem>
// //           ) : (
// //             subCategories.map((sub: any) => (
// //               <MenuItem key={sub._id} value={sub._id}>
// //                 {sub.name}
// //               </MenuItem>
// //             ))
// //           )}
// //         </TextField>

// //         <Divider sx={{ my: 3 }} />

// //         <TextField
// //           label="או כתבו שאלה חופשית"
// //           placeholder="למשל: מה ההבדל בין AI ל-ML?"
// //           multiline
// //           rows={4}
// //           fullWidth
// //           value={question}
// //           onChange={(e) => setQuestion(e.target.value)}
// //         />

// //         <Box sx={{ textAlign: "left", mt: 3 }}>
// //           <Button variant="contained" color="primary" onClick={handleSubmit} disabled={sending}>
// //             {sending ? <CircularProgress size={24} /> : "שלח שאלה"}
// //           </Button>
// //         </Box>
// //       </Paper>

// //       {response && (
// //         <Paper elevation={2} sx={{ p: 4 }}>
// //           <Typography variant="h5" gutterBottom>
// //             תגובת AI:
// //           </Typography>
// //           <Typography>{response}</Typography>
// //         </Paper>
// //       )}
// //     </Container>
// //   );
// // };

// // export default Learning;
// import React, { useState } from "react";
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
// } from "@mui/material";
// import { useCreatePromptMutation } from "../stores/Slices/promptApiSlice";
// import {
//   useGetCategoriesQuery,
//   useGetSubCategoriesByCategoryQuery,
// } from "../stores/Slices/categoryApiSlice";

// const Learning: React.FC = () => {
//   const [categoryId, setCategoryId] = useState("");
//   const [subCategoryId, setSubCategoryId] = useState("");
//   const [question, setQuestion] = useState("");
//   const [response, setResponse] = useState("");

//   const { data: categories = [], isLoading: loadingCategories } = useGetCategoriesQuery();
//   const {
//     data: subCategories = [],
//     isLoading: loadingSubCategories,
//   } = useGetSubCategoriesByCategoryQuery(categoryId, {
//     skip: !categoryId,
//   });

//   const [createPrompt, { isLoading: sending }] = useCreatePromptMutation();

//   const selectedCategory = categories.find((cat: any) => cat._id === categoryId);
//   const selectedSubCategory = subCategories.find((sub: any) => sub._id === subCategoryId);

//   const handleSubmit = async () => {
//     if (!categoryId || (!subCategoryId && !question)) return;

//     try {
//       const res = await createPrompt({
//         category_id: categoryId,
//         sub_category_id: subCategoryId,
//         prompt: question || "שאלה כללית על הנושא שנבחר",
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
//         {/* <Typography variant="h4" gutterBottom>
//           נושא הלמידה
//         </Typography> */}
//         <Typography variant="subtitle1" color="text.secondary">
//           בחרו קטגוריה ותת-קטגוריה או שאלו שאלה חופשית
//         </Typography>

//         {selectedCategory && (
//           <Box sx={{ mt: 2, mb: 2 }}>
//               <Typography variant="h4" gutterBottom>
//           נושא הלמידה
//         </Typography>
//             <Typography>{selectedCategory.name}</Typography>
// {/* 
//             <Typography variant="h6">קטגוריה:</Typography>
//             <Typography>{selectedCategory.name}</Typography> */}

//             {selectedSubCategory && (
//               <>
//                 <Typography variant="h6">תת קטגוריה:</Typography>
//                 <Typography>{selectedSubCategory.name}</Typography>
//               </>
//             )}
//           </Box>
//         )}

//         <TextField
//           select
//           label="בחר קטגוריה"
//           fullWidth
//           value={categoryId}
//           onChange={(e) => {
//             setCategoryId(e.target.value);
//             setSubCategoryId(""); // אפס תת קטגוריה כשמשנים קטגוריה
//           }}
//           margin="normal"
//         >
//           {loadingCategories ? (
//             <MenuItem disabled>טוען...</MenuItem>
//           ) : (
//             categories.map((cat: any) => (
//               <MenuItem key={cat._id} value={cat._id}>
//                 {cat.name}
//               </MenuItem>
//             ))
//           )}
//         </TextField>

//         <TextField
//           select
//           label="בחר תת קטגוריה"
//           fullWidth
//           value={subCategoryId}
//           onChange={(e) => setSubCategoryId(e.target.value)}
//           margin="normal"
//           disabled={!categoryId || loadingSubCategories}
//         >
//           {loadingSubCategories ? (
//             <MenuItem disabled>טוען...</MenuItem>
//           ) : (
//             subCategories.map((sub: any) => (
//               <MenuItem key={sub._id} value={sub._id}>
//                 {sub.name}
//               </MenuItem>
//             ))
//           )}
//         </TextField>

//         <Divider sx={{ my: 3 }} />

//         <TextField
//           label="או כתבו שאלה חופשית"
//           placeholder="למשל: מה ההבדל בין AI ל-ML?"
//           multiline
//           rows={4}
//           fullWidth
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />

//         <Box sx={{ textAlign: "left", mt: 3 }}>
//           <Button variant="contained" color="primary" onClick={handleSubmit} disabled={sending}>
//             {sending ? <CircularProgress size={24} /> : "שלח שאלה"}
//           </Button>
//         </Box>
//       </Paper>

//       {response && (
//         <Paper elevation={2} sx={{ p: 4 }}>
//           <Typography variant="h5" gutterBottom>
//             תגובת AI:
//           </Typography>

//           <Box sx={{ mb: 2 }}>
//             <Typography variant="subtitle1">
//               <strong>קטגוריה:</strong> {selectedCategory?.name}
//             </Typography>
//             {selectedSubCategory && (
//               <Typography variant="subtitle1">
//                 <strong>תת קטגוריה:</strong> {selectedSubCategory.name}
//               </Typography>
//             )}
//           </Box>

//           <Typography>{response}</Typography>
//         </Paper>
//       )}
//     </Container>
//   );
// };

// export default Learning;
// src/components/Learning.tsx

import React, { useState } from "react";
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
} from "@mui/material";

import {
  useGetCategoriesQuery,
  useGetSubCategoriesByCategoryQuery,
} from "../stores/Slices/categoryApiSlice";
import { useCreatePromptMutation } from "../stores/Slices/promptApiSlice";

const Learning: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string>("");
  const [subCategoryId, setSubCategoryId] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  // שליפת קטגוריות
  const { data: categories = [], isLoading: loadingCategories } = useGetCategoriesQuery();

  // שליפת תתי קטגוריות לפי קטגוריה שנבחרה
  const {
    data: subCategories = [],
    isLoading: loadingSubCategories,
  } = useGetSubCategoriesByCategoryQuery( { categoryId }, 
  { skip: !categoryId }
  );

  const [createPrompt, { isLoading: sending }] = useCreatePromptMutation();

  const handleSubmit = async () => {
    // אם לא בחרו קטגוריה, או לא בחרו תת-קטגוריה וגם לא כתבו שאלה – אין שליחה
    if (!categoryId || (!subCategoryId && !question.trim())) return;

    try {
      const res = await createPrompt({
        category_id: categoryId,
        sub_category_id: subCategoryId,
        prompt: question.trim() || "שאלה כללית על הנושא שנבחר",
      }).unwrap();

      setResponse(res.response);
    } catch (error) {
      console.error("שגיאה בשליחת שאלה:", error);
      setResponse("אירעה שגיאה בעת יצירת השיעור.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, direction: "rtl" }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          נושא הלמידה
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          בחרו קטגוריה ותת-קטגוריה או שאלו שאלה חופשית
        </Typography>

        <TextField
          select
          label="בחר קטגוריה"
          fullWidth
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setSubCategoryId(""); // מאפס תת-קטגוריה כשמשנים קטגוריה
            setResponse("");
          }}
          margin="normal"
          disabled={loadingCategories}
        >
          {loadingCategories ? (
            <MenuItem disabled>טוען קטגוריות...</MenuItem>
          ) : (
            categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))
          )}
        </TextField>

        <TextField
          select
          label="בחר תת קטגוריה"
          fullWidth
          value={subCategoryId}
          onChange={(e) => {
            setSubCategoryId(e.target.value);
            setResponse("");
          }}
          margin="normal"
          disabled={!categoryId || loadingSubCategories}
        >
          {loadingSubCategories ? (
            <MenuItem disabled>טוען תתי קטגוריות...</MenuItem>
          ) : (
            subCategories.map((sub) => (
              <MenuItem key={sub._id} value={sub._id}>
                {sub.name}
              </MenuItem>
            ))
          )}
        </TextField>

        <Divider sx={{ my: 3 }} />

        <TextField
          label="או כתבו שאלה חופשית"
          placeholder="למשל: מה ההבדל בין AI ל-ML?"
          multiline
          rows={4}
          fullWidth
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            setResponse("");
          }}
        />

        <Box sx={{ textAlign: "left", mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={sending}>
            {sending ? <CircularProgress size={24} /> : "שלח שאלה"}
          </Button>
        </Box>
      </Paper>

      {response && (
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            תגובת AI:
          </Typography>
          <Typography sx={{ whiteSpace: "pre-line" }}>{response}</Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Learning;
