import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import {
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useGetCategoriesQuery,
} from "../stores/Slices/categoryApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../stores/Store";

const AdminCategoryManager = () => {
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const { data: categories = [] } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [createSubCategory] = useCreateSubCategoryMutation();

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const isAdmin = currentUser?.role === "admin";

  if (!isAdmin) return null;

  const handleCreateCategory = async () => {
    if (categoryName.trim()) {
      await createCategory({ name: categoryName });
      setCategoryName("");
    }
  };

  const handleCreateSubCategory = async () => {
    if (subCategoryName && selectedCategoryId) {
      await createSubCategory({
        name: subCategoryName,
        category_id: selectedCategoryId,
      });
      setSubCategoryName("");
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        ניהול קטגוריות
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="שם קטגוריה"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button variant="contained" onClick={handleCreateCategory}>
          צור קטגוריה
        </Button>
      </Box>

      <Typography variant="h6" mt={4}>
        הוספת תת קטגוריה
      </Typography>

      <Box display="flex" gap={2} mt={2}>
        <TextField
          select
          label="בחר קטגוריה"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="שם תת קטגוריה"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
        />

        <Button variant="outlined" onClick={handleCreateSubCategory}>
          צור תת קטגוריה
        </Button>
      </Box>
    </Paper>
  );
};

export default AdminCategoryManager;
