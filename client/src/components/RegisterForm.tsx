import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import axios from "axios";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:8000/auth/register", formData);
      setSuccess("נרשמת בהצלחה!");
    } catch (err: any) {
      setError(err.response?.data?.detail || "שגיאה בהרשמה");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        הרשמה למערכת
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="שם פרטי"
          name="firstName"
          fullWidth
          required
          margin="normal"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="שם משפחה"
          name="lastName"
          fullWidth
          required
          margin="normal"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          label="טלפון"
          name="phone"
          fullWidth
          required
          margin="normal"
          value={formData.phone}
          onChange={handleChange}
        />
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
          הרשמה
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
