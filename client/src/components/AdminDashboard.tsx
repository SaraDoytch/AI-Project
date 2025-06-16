// src/components/AdminDashboard.tsx
import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AdminCategoryPanel from "./AdminCategoryPanel";
import AdminUsersWithPrompts from "./AdminUsersWithPrompts";
import AdminCategoryManager from "./AdminCategoryManager";

const AdminDashboard = () => {
  const [view, setView] = useState<"categories" | "users" | "add">("categories");

  return (
    <Box sx={{ p: 3 }} dir="rtl">
      <Typography variant="h4" gutterBottom>לוח ניהול</Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <Button
          variant={view === "categories" ? "contained" : "outlined"}
          onClick={() => setView("categories")}
        >
          ניהול קטגוריות
        </Button>
        <Button
          variant={view === "add" ? "contained" : "outlined"}
          onClick={() => setView("add")}
        >
          הוסף קטגוריה/תת־קטגוריה
        </Button>
        <Button
          variant={view === "users" ? "contained" : "outlined"}
          onClick={() => setView("users")}
        >
          צפייה במשתמשים
        </Button>
      </Stack>

      {view === "categories" && <AdminCategoryPanel />}
      {view === "add" && <AdminCategoryManager />}
      {view === "users" && <AdminUsersWithPrompts />}
    </Box>
  );
};

export default AdminDashboard;
