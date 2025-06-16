

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

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "בוקר טוב";
  if (hour < 18) return "צהריים טובים";
  return "ערב טוב";
};

const AllLessons = () => {
  const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();

  return (
    <>
    {categories.map((category) => (
               <Grid item key={category._id} xs={6} sm={4} md={3}>
                 <Card>
                   <CardActionArea component={Link} to={`/AllLessons/${category._id}`}>
                     <CardContent>
                       <Typography variant="body1" align="center">
                         {category.name}
                       </Typography>
                     </CardContent>
                   </CardActionArea>
                 </Card>
               </Grid>
             ))}
             </>
  );
};

export default AllLessons;
