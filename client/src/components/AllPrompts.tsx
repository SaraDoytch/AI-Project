import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { useGetAllPromptsQuery } from "../stores/Slices/promptApiSlice";
import { Prompt } from "../interfaces/Interface";
import { useNavigate } from "react-router-dom";

const AllPrompts = () => {
  const navigate = useNavigate();
  const {
    data: prompts = [] as Prompt[],
    isLoading,
    isError,
  } = useGetAllPromptsQuery();

  const [selectedLesson, setSelectedLesson] = useState<Prompt | null>(null);

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName || !lastName) return "לא ידוע";
    return `${firstName[0]}.${lastName[0]}`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, direction: "rtl" }}>
      <Typography variant="h4" gutterBottom>
        כל השיעורים במערכת
      </Typography>

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

      {!isLoading && prompts.length === 0 && (
        <Typography align="center">אין עדיין שיעורים להצגה.</Typography>
      )}

      <Grid container spacing={3} mt={2}>
        {prompts.map((lesson) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={lesson.id}
            sx={{ display: "flex" }}
          >
            <Paper
              onClick={() => setSelectedLesson(lesson)}
              sx={{
                p: 2,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 220, // גובה קבוע לכולם
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
              <Typography
                variant="body2"
                color="text.secondary"
                mt="auto"
                align="left"
              >
                נוצר ע״י: {getInitials(lesson.firstName, lesson.lastName)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {selectedLesson && (
        <Paper sx={{ p: 3, mt: 5, backgroundColor: "#f9f9f9" }} elevation={3}>
          <Typography variant="h6" gutterBottom>
            {selectedLesson.prompt}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {selectedLesson.response}
          </Typography>
          <Button sx={{ mt: 2 }} onClick={() => setSelectedLesson(null)}>
            סגור
          </Button>
        </Paper>
      )}

      <Button sx={{ mt: 4 }} variant="outlined" onClick={() => navigate(-1)}>
        חזור
      </Button>
    </Container>
  );
};

export default AllPrompts;
