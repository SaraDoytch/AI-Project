import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../schemas/AuthSchemas";
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

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");

  const onSubmit = async (data: LoginFormData) => {
    setError("");
    setSuccess("");
    try {
      const res = await axios.post("http://localhost:8000/auth/login", data);
      setSuccess("התחברת בהצלחה!");
      // localStorage.setItem("token", res.data.token);
    } catch (err: any) {
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

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
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
          התחבר
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
