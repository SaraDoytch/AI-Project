

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
import { Link } from "react-router";
import { useGetCategoriesQuery } from "../stores/Slices/categoryApiSlice";

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
