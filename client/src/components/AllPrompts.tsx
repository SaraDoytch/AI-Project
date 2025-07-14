import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useGetAllPromptsQuery } from "../stores/Slices/promptApiSlice";
import { Prompt } from "../interfaces/Interface";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import { useGetCategoriesQuery } from "../stores/Slices/categoryApiSlice";

const AllPrompts = () => {
  const navigate = useNavigate();
  const {
    data: prompts = [] as Prompt[],
    isLoading,
    isError,
  } = useGetAllPromptsQuery();

const { data: categories = [] } = useGetCategoriesQuery();

  const [selectedLesson, setSelectedLesson] = useState<Prompt | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // for filtering

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName || !lastName) return "לא ידוע";
    return `${firstName[0]}.${lastName[0]}`;
  };
  // Filter prompts by selected category
  const filteredPrompts = selectedCategory
    ? prompts.filter((p) => p.category_id === selectedCategory)
    : prompts;
  return (
  <Container maxWidth={false} disableGutters sx={{ mt: 4, direction: "rtl" }}>
  <Typography variant="h4" gutterBottom>
    כל השיעורים במערכת
  </Typography>

  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
    {/* Sidebar filter */}
    <CategoryFilter
      categories={categories.filter((c) => c._id && c.name) as { _id: string; name: string }[]}
      selectedCategory={selectedCategory}
      onChange={setSelectedCategory}
    />

    {/* Main content */}
    <Box sx={{ flex: 1 }}>
      {isLoading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Typography color="error" align="center">
          שגיאה בטעינת השיעורים.
        </Typography>
      )}

      {!isLoading && filteredPrompts.length === 0 && (
        <Typography align="center">אין שיעורים בקטגוריה זו.</Typography>
      )}

      <Grid container spacing={3} mt={2}>
        {filteredPrompts.map((lesson) => (
          <Grid item xs={12} sm={6} md={4} key={lesson.id} sx={{ display: "flex" }}>
            <Paper
              onClick={() => setSelectedLesson(lesson)}
              sx={{
                p: 2,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 220,
                cursor: "pointer",
                transition: "0.3s",
                border: "1px solid #ddd",
                "&:hover": {
                  boxShadow: 4,
                  backgroundColor: "#f9f9f9",
                },
              }}
              elevation={0}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
              >
                {lesson.prompt}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                קטגוריה: {lesson.category_name || "לא זמין"}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt="auto" align="left">
                נוצר ע״י: {getInitials(lesson.firstName, lesson.lastName)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>

  <Dialog
    open={!!selectedLesson}
    onClose={() => setSelectedLesson(null)}
    maxWidth="sm"
    fullWidth
  >
    <DialogTitle>{selectedLesson?.prompt}</DialogTitle>
    <DialogContent dividers>
      <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
        {selectedLesson?.response}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setSelectedLesson(null)}>סגור</Button>
    </DialogActions>
  </Dialog>

  <Button sx={{ mt: 4 }} variant="outlined" onClick={() => navigate(-1)}>
    חזור
  </Button>
</Container>

  );
};

export default AllPrompts;
