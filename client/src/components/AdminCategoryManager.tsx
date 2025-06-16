

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  Autocomplete,
  Alert,
} from "@mui/material";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
} from "../stores/Slices/categoryApiSlice";
import { Category } from "../interfaces/Interface";

const AdminCategoryManager = () => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newSubCategoryName, setNewSubCategoryName] = useState("");

  const { data: categories = [], refetch } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreatingCategory }] = useCreateCategoryMutation();
  const [createSubCategory, { isLoading: isCreatingSub }] = useCreateSubCategoryMutation();

  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      await createCategory({ name: newCategoryName }).unwrap();
      setSuccessMessage("קטגוריה נוספה בהצלחה");
      setNewCategoryName("");
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateSubCategory = async () => {
    if (!newSubCategoryName.trim() || !selectedCategory) return;

    try {
      await createSubCategory({
        name: newSubCategoryName,
        category_id: selectedCategory._id,
      }).unwrap();
      setSuccessMessage("תת־קטגוריה נוספה בהצלחה");
      setNewSubCategoryName("");
      setSelectedCategory(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 2 }}>
      <CardContent dir="rtl">
        <Typography variant="h5" gutterBottom>
          ניהול קטגוריות
        </Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        <Stack spacing={2} mt={2}>
          {/* הוספת קטגוריה */}
          <Typography variant="subtitle1">הוסף קטגוריה חדשה:</Typography>
          <TextField
            label="שם הקטגוריה"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleCreateCategory}
            disabled={isCreatingCategory}
          >
            הוסף קטגוריה
          </Button>

          {/* הוספת תת־קטגוריה */}
          <Typography variant="subtitle1" mt={4}>
            הוסף תת־קטגוריה:
          </Typography>
          <Autocomplete
            options={categories}
            getOptionLabel={(option) => option.name}
            value={selectedCategory}
            onChange={(event, newValue) => setSelectedCategory(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="בחר קטגוריה" fullWidth />
            )}
          />
          <TextField
            label="שם תת־הקטגוריה"
            value={newSubCategoryName}
            onChange={(e) => setNewSubCategoryName(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleCreateSubCategory}
            disabled={isCreatingSub}
          >
            הוסף תת־קטגוריה
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AdminCategoryManager;
