
// src/components/AdminCategoryPanel.tsx
import { useState } from "react";
import {
  Box, Typography, Stack, IconButton, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Card, CardContent, Paper
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  useGetAllCategoriesWithSubsQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} from "../stores/Slices/categoryApiSlice";
import { useGetAllPromptsQuery } from "../stores/Slices/promptApiSlice";
import { SubCategory } from "../interfaces/Interface";

const AdminCategoryPanel = () => {
  const { data: categories = [], refetch } = useGetAllCategoriesWithSubsQuery();
  const { data: prompts = [] } = useGetAllPromptsQuery();

  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateSubCategory] = useUpdateSubCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editTarget, setEditTarget] = useState<{ id: string; type: "cat" | "sub" }>({ id: "", type: "cat" });

  const handleOpenEdit = (id: string, type: "cat" | "sub", currentName: string) => {
    setEditTarget({ id, type });
    setEditName(currentName);
    setEditOpen(true);
  };

  // const handleDelete = async (id: string, type: "cat" | "sub") => {
  //   if (window.confirm("האם את/ה בטוח/ה שברצונך למחוק?")) {
  //     if (type === "cat") await deleteCategory(id).unwrap();
  //     else await deleteSubCategory(id).unwrap();
  //     refetch();
  //   }
  // };

  const handleDelete = async (id: string, type: "cat" | "sub") => {
    console.log("Deleting", type, id);
    if (!id) {
      alert("לא ניתן למחוק: מזהה לא קיים");
      return;
    }
    if (window.confirm("האם את/ה בטוח/ה שברצונך למחוק?")) {
      if (type === "cat") await deleteCategory(id).unwrap();
      else await deleteSubCategory(id).unwrap();
      refetch();
    }
  };


  const handleSaveEdit = async () => {
    const { id, type } = editTarget;
    if (!editName.trim()) return;
    if (type === "cat") await updateCategory({ id, updated: { name: editName } }).unwrap();
    else await updateSubCategory({ id, updated: { name: editName } }).unwrap();
    setEditOpen(false);
    refetch();
  };

  return (
    <Box sx={{ p: 2 }} dir="rtl">
      <Typography variant="h5" gutterBottom>ניהול קטגוריות ותתי קטגוריות</Typography>

      <Stack spacing={2} mt={2}>
        {categories.map((cat) => (
          <Card key={cat.id}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{cat.name}</Typography>
                <Stack direction="row">
                  <IconButton onClick={() => handleOpenEdit(cat.id!, "cat", cat.name)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(cat.id!, "cat")}><Delete /></IconButton>
                </Stack>
              </Stack>

              {/* תתי קטגוריות */}
              <Stack mt={1} pl={2} spacing={1}>
                {cat.subCategories?.map((sub: SubCategory) => (
                  <Paper key={sub._id} sx={{ p: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography>{sub.name}</Typography>
                      <Stack direction="row">
                        <IconButton size="small" onClick={() => handleOpenEdit(sub.id, "sub", sub.name)}><Edit fontSize="small" /></IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(sub.id, "sub")}><Delete fontSize="small" /></IconButton>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* דיאלוג עריכה */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>עריכת שם</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            label="שם חדש"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>ביטול</Button>
          <Button onClick={handleSaveEdit} variant="contained">שמור</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminCategoryPanel;
