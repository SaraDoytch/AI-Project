


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
//   // useGetCategoryByIdQuery,
// } from "../stores/Slices/categoryApiSlice";

// import { useCreatePromptMutation } from "../stores/Slices/promptApiSlice";
// // import { useAppSelector } from "../stores/hooks";
// import { useDispatch, useSelector } from 'react-redux';


// const CreateLesson = () => {
//   // const { categoryId: paramCategoryId } = useParams<{ categoryId: string }>();
//   const { _id: paramCategoryId } = useParams<{ _id: string }>();

//   const user = useSelector((state: any) => state.auth.currentUser);

//   const [categoryId, setCategoryId] = useState<string>("");
//   const [subCategoryId, setSubCategoryId] = useState<string>("");
//   const [question, setQuestion] = useState<string>("");
//   const [response, setResponse] = useState<string>("");

//   const {
//     data: categories = [],
//     isLoading: loadingCategories,
//     isError: errorCategories,
//   } = useGetCategoriesQuery();

//   const {
//     data: subCategories = [],
//     isLoading: loadingSubCategories,
//     isError: errorSubCategories,
//   } = useGetSubCategoriesByCategoryQuery(
//     { categoryId },
//     { skip: !categoryId }
//   );

//   // const {
//   //   data: currentCategory,
//   //   isLoading: loadingCurrentCategory,
//   //   isError: errorCurrentCategory,
//   // } = useGetCategoryByIdQuery(categoryId, { skip: !categoryId });

//   const [createPrompt, { isLoading: sending }] = useCreatePromptMutation();

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
//     console.log("Current user:", user);

//     if (!user?.id) {
//       setResponse("שגיאה: עליך להיות מחובר כדי לשלוח שאלה.");
//       return;
//     }

//     if (!categoryId || (!subCategoryId && !question.trim())) {
//       setResponse("נא לבחור קטגוריה או להזין שאלה.");
//       return;
//     }

//     try {
//       const result = await createPrompt({
//         user_id: user.id,
//         category_id: categoryId,
//         sub_category_id: subCategoryId || undefined,
//         prompt: question.trim() || "שאלה כללית על הנושא שנבחר",
//       }).unwrap();

//       setResponse(result.response);
//     } catch (error) {
//       console.error("שגיאה בשליחת שאלה:", error);
//       setResponse("אירעה שגיאה בעת יצירת השיעור.");
//     }
//   };
// const selectedCategory = categories.find((cat) => cat._id === categoryId);

//   return (
//     <Container maxWidth="md" sx={{ mt: 4, direction: "rtl" }}>
//       {/* <Typography variant="h4" gutterBottom>
//         צור שיעור חדש
//       </Typography> */}
// <Typography variant="h4" gutterBottom>
//   צור שיעור חדש {selectedCategory ? `– ${selectedCategory.name}` : ""}
// </Typography>

//       {/* בחירת קטגוריה */}
//       <TextField
//         select
//         fullWidth
//         label="קטגוריה"
//         value={categoryId}
//         onChange={(e) => {
//           setCategoryId(e.target.value);
//           setSubCategoryId(""); // אפס תת קטגוריה בעת שינוי קטגוריה
//         }}
//         sx={{ my: 2 }}
//         disabled={loadingCategories}
//       >
//         {categories.map((cat) => (
//           <MenuItem key={cat._id} value={cat._id}>
//             {cat.name}
//           </MenuItem>
//         ))}
//       </TextField>

//       {/* בחירת תת קטגוריה */}
//       {subCategories.length > 0 && (
//         <TextField
//           select
//           fullWidth
//           label="תת קטגוריה"
//           value={subCategoryId}
//           onChange={(e) => setSubCategoryId(e.target.value)}
//           sx={{ my: 2 }}
//           disabled={loadingSubCategories}
//         >
//           {subCategories.map((sub) => (
//             <MenuItem key={sub._id} value={sub._id}>
//               {sub.name}
//             </MenuItem>
//           ))}
//         </TextField>
//       )}

//       {/* שאלה חופשית */}
//       <TextField
//         fullWidth
//         label="שאלה חופשית (לא חובה)"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         multiline
//         rows={4}
//         sx={{ my: 2 }}
//       />

//       {/* כפתור שליחה */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSubmit}
//         disabled={sending || !categoryId}
//       >
//         {sending ? "שולח..." : "שלח שאלה"}
//       </Button>

//       <Divider sx={{ my: 4 }} />

//       {/* הצגת תגובת AI */}
//       {/* {response && (
//         <Paper elevation={3} sx={{ p: 3, bgcolor: "#f9f9f9" }}>
//           <Typography variant="h6" gutterBottom>
//             תשובת AI:
//           </Typography>
//           <Typography sx={{ whiteSpace: "pre-line" }}>{response}</Typography>
//         </Paper>
//       )} */}

//       {/* טעינה או שגיאה */}
//       {(loadingCategories || loadingSubCategories) && (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       )}
//       {(errorCategories || errorSubCategories) && (
//         <Alert severity="error" sx={{ mt: 2 }}>
//           שגיאה בטעינת קטגוריות.
//         </Alert>
//       )}
//     </Container>
//   );
// };

// export default CreateLesson;

// CreateLesson.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  TextField,
  MenuItem,
} from "@mui/material";

import {
  useGetCategoriesQuery,
  useGetSubCategoriesByCategoryQuery,
} from "../stores/Slices/categoryApiSlice";
import { useCreatePromptMutation } from "../stores/Slices/promptApiSlice";
import { useSelector } from "react-redux";

import AIResponseDialog from "./AIResponseDialog";
import NotLoggedInDialog from "./NotLoggedInDialog";

const CreateLesson = () => {
  const { _id: paramCategoryId } = useParams<{ _id: string }>();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.currentUser);

  const [categoryId, setCategoryId] = useState<string>("");
  const [subCategoryId, setSubCategoryId] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [notLoggedInOpen, setNotLoggedInOpen] = useState(false);

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

  const [createPrompt, { isLoading: sending }] = useCreatePromptMutation();
const selectedCategory = categories.find((cat) => cat._id === categoryId);
  useEffect(() => {
    if (
      paramCategoryId &&
      categories.find((cat) => cat._id === paramCategoryId)
    ) {
      setCategoryId(paramCategoryId);
    }
  }, [paramCategoryId, categories]);

  const handleSubmit = async () => {
    if (!user?.id) {
      setNotLoggedInOpen(true);
      return;
    }

    try {
      const result = await createPrompt({
        user_id: user.id,
        category_id: categoryId,
        sub_category_id: subCategoryId || undefined,
        prompt: question.trim() || "שאלה כללית על הנושא שנבחר",
      }).unwrap();
      console.log("response from server:", result);

      setResponse(result.lesson);
      setDialogOpen(true);
    } catch (error) {
      setResponse("אירעה שגיאה בעת יצירת השיעור.");
      setDialogOpen(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, direction: "rtl" }}>
      {/* <Typography variant="h4" gutterBottom>
        צור שיעור חדש
      </Typography> */}
   <Typography variant="h4" gutterBottom>
   צור שיעור חדש {selectedCategory ? `– ${selectedCategory.name}` : ""}
  </Typography>
      <Button variant="outlined" onClick={() => navigate(-1)}>
        חזרה
      </Button>

      <TextField
        select
        fullWidth
        label="קטגוריה"
        value={categoryId}
        onChange={(e) => {
          setCategoryId(e.target.value);
          setSubCategoryId("");
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

      <TextField
        fullWidth
        label="שאלה חופשית (לא חובה)"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        multiline
        rows={4}
        sx={{ my: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={sending || !categoryId}
      >
        {sending ? <CircularProgress size={24} /> : "שלח שאלה"}
      </Button>

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

      <AIResponseDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        response={response}
      />

      <NotLoggedInDialog
        open={notLoggedInOpen}
        onClose={() => setNotLoggedInOpen(false)}
      />
    </Container>
  );
};

export default CreateLesson;
