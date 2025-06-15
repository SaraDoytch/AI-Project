// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   MenuItem,
//   Paper,
// } from "@mui/material";
// import {
//   useCreateCategoryMutation,
//   useCreateSubCategoryMutation,
//   useGetCategoriesQuery,
// } from "../stores/Slices/categoryApiSlice";
// import { useSelector } from "react-redux";
// import { RootState } from "../stores/Store";

// const AdminCategoryManager = () => {
//   const [categoryName, setCategoryName] = useState("");
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [selectedCategoryId, setSelectedCategoryId] = useState("");

//   const { data: categories = [] } = useGetCategoriesQuery();
//   const [createCategory] = useCreateCategoryMutation();
//   const [createSubCategory] = useCreateSubCategoryMutation();

//   const currentUser = useSelector((state: RootState) => state.auth.currentUser);
//   const isAdmin = currentUser?.role === "admin";

//   if (!isAdmin) return null;

//   const handleCreateCategory = async () => {
//     if (categoryName.trim()) {
//       await createCategory({ name: categoryName });
//       setCategoryName("");
//     }
//   };

//   const handleCreateSubCategory = async () => {
//     if (subCategoryName && selectedCategoryId) {
//       await createSubCategory({
//         name: subCategoryName,
//         category_id: selectedCategoryId,
//       });
//       setSubCategoryName("");
//     }
//   };

//   return (
//     <Paper sx={{ p: 4, mt: 4 }}>
//       <Typography variant="h5" gutterBottom>
//         ניהול קטגוריות
//       </Typography>

//       <Box display="flex" gap={2} mb={2}>
//         <TextField
//           label="שם קטגוריה"
//           value={categoryName}
//           onChange={(e) => setCategoryName(e.target.value)}
//         />
//         <Button variant="contained" onClick={handleCreateCategory}>
//           צור קטגוריה
//         </Button>
//       </Box>

//       <Typography variant="h6" mt={4}>
//         הוספת תת קטגוריה
//       </Typography>

//       <Box display="flex" gap={2} mt={2}>
//         <TextField
//           select
//           label="בחר קטגוריה"
//           value={selectedCategoryId}
//           onChange={(e) => setSelectedCategoryId(e.target.value)}
//           sx={{ minWidth: 200 }}
//         >
//           {categories.map((cat) => (
//             <MenuItem key={cat._id} value={cat._id}>
//               {cat.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           label="שם תת קטגוריה"
//           value={subCategoryName}
//           onChange={(e) => setSubCategoryName(e.target.value)}
//         />

//         <Button variant="outlined" onClick={handleCreateSubCategory}>
//           צור תת קטגוריה
//         </Button>
//       </Box>
//     </Paper>
//   );
// };

// export default AdminCategoryManager;

// src/components/admin/CategoryManager.tsx

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
