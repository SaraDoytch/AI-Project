import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../schemas/AuthSchemas";
import { z } from "zod";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import axios from "axios";

type RegisterFormData = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");

  const onSubmit = async (data: RegisterFormData) => {
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:8000/auth/register", data);
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

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <TextField
          label="שם פרטי"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="שם משפחה"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="טלפון"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="אימייל"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          required
          margin="normal"
          type="email"
        />
        <TextField
          label="סיסמה"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          required
          margin="normal"
          type="password"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          הרשמה
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
