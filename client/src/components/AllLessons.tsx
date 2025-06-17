

import {
  Typography,
  // Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";

import  Grid from "@mui/material/Grid";

import { Link } from "react-router";
import { useGetCategoriesQuery } from "../stores/Slices/categoryApiSlice";

const AllLessons = () => {
  const { data: categories = [] } = useGetCategoriesQuery();

  return (
    <>
    <Grid container spacing={2}>
      {categories.map((category) => (
        // @ts-expect-error – known MUI typing issue
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
      </Grid>
    </>
  );
};

export default AllLessons;
