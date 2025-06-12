import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axios.post("http://localhost:8000/auth/login", formData);
      setSuccess("התחברת בהצלחה!");
      // ניתן לשמור את הטוקן: localStorage.setItem("token", res.data.token);
    } catch (err) {
      setError(err.response?.data?.detail || "שגיאה בהתחברות");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        התחברות
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="אימייל"
          name="email"
          type="email"
          fullWidth
          required
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="סיסמה"
          name="password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          התחבר
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
