

import React from "react";
import {
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router"; // שימי לב
import { useGetCategoriesQuery } from "../stores/Slices/categoryApiSlice";
import AllLessons from "./AllLessons";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "בוקר טוב";
  if (hour < 18) return "צהריים טובים";
  return "ערב טוב";
};

const Home = () => {
  const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Greeting */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center', backgroundColor: '#e3f2fd' }}>
        <Typography variant="h5">{getGreeting()}</Typography>
        <Typography variant="h6">מוכנים להמשיך בחקירת עולם הידע?</Typography>
        <Typography variant="body1">בחרו נושא ונתחיל ללמוד יחד!</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          התחל ללמוד
        </Button>
      </Paper>

      {/* Categories */}
      <Typography variant="h6" gutterBottom textAlign="center">
        בחר נושא למידה
      </Typography>

      {isLoading ? (
        <Typography align="center">טוען קטגוריות...</Typography>
      ) : isError ? (
        <Typography align="center" color="error">שגיאה בטעינת הקטגוריות</Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
   
          <AllLessons></AllLessons>
        </Grid>
      )}
    </Container>
  );
};

export default Home;
