// // src/components/Learning.tsx
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
// } from "@mui/material";

// const subTopics = [
//   "היסטוריה של הבינה המלאכותית",
//   "למידת מכונה",
//   "רשתות נוירונים",
//   "עיבוד שפה טבעית",
// ];

// const Learning: React.FC = () => {
//   const [selectedSubTopic, setSelectedSubTopic] = useState("");
//   const [question, setQuestion] = useState("");

//   return (
//     <Container maxWidth="md" sx={{ mt: 4, direction: "rtl" }}>
//       <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           נושא הלמידה: בינה מלאכותית
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           בחרו תת-נושא שמעניין אתכם או שאלו שאלה בנושא:
//         </Typography>

//         <TextField
//           select
//           label="בחר תת נושא"
//           fullWidth
//           value={selectedSubTopic}
//           onChange={(e) => setSelectedSubTopic(e.target.value)}
//           margin="normal"
//         >
//           {subTopics.map((topic, index) => (
//             <MenuItem key={index} value={topic}>
//               {topic}
//             </MenuItem>
//           ))}
//         </TextField>

//         <Divider sx={{ my: 3 }} />

//         <TextField
//           label="רשמו שאלה בנושא"
//           placeholder="מה ההבדל בין AI ל-ML?"
//           multiline
//           rows={4}
//           fullWidth
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />

//         <Box sx={{ textAlign: "left", mt: 3 }}>
//           <Button variant="contained" color="primary">
//             שלח שאלה
//           </Button>
//         </Box>
//       </Paper>

//       <Box textAlign="center">
//         <Button variant="outlined" size="large" color="secondary">
//           עבור לשיעור
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Learning;


import React, { useState, useEffect } from "react";
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
import { useCreatePromptMutation } from "../stores/Slices/promptApiSlice";
import { useGetCategoriesQuery, useGetSubCategoriesByCategoryQuery } from "../stores/Slices/categoryApiSlice";

const Learning: React.FC = () => {
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const { data: categories = [], isLoading: loadingCategories } = useGetCategoriesQuery();
  const { data: subCategories = [], isLoading: loadingSubCategories } = useGetSubCategoriesByCategoryQuery(categoryId, {
    skip: !categoryId,
  });

  const [createPrompt, { isLoading: sending }] = useCreatePromptMutation();

  const handleSubmit = async () => {
    if (!categoryId || (!subCategoryId && !question)) return;

    try {
      const res = await createPrompt({
        category_id: categoryId,
        sub_category_id: subCategoryId,
        prompt: question || "שאלה כללית על הנושא שנבחר",
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
        <Typography variant="subtitle1" color="text.secondary">
          בחרו קטגוריה ותת-קטגוריה או שאלו שאלה חופשית
        </Typography>

        <TextField
          select
          label="בחר קטגוריה"
          fullWidth
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setSubCategoryId(""); // אפס תת קטגוריה
          }}
          margin="normal"
        >
          {loadingCategories ? (
            <MenuItem disabled>טוען...</MenuItem>
          ) : (
            categories.map((cat: any) => (
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
          onChange={(e) => setSubCategoryId(e.target.value)}
          margin="normal"
          disabled={!categoryId || loadingSubCategories}
        >
          {loadingSubCategories ? (
            <MenuItem disabled>טוען...</MenuItem>
          ) : (
            subCategories.map((sub: any) => (
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
          onChange={(e) => setQuestion(e.target.value)}
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
          <Typography>{response}</Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Learning;
