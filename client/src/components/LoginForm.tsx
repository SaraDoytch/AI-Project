import React, { useState } from "react";
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
import { login } from '../stores/Slices/authSlice';
import { UserSchema } from "../interfaces/Interface"
import { useLoginMutation } from "../stores/Slices/UserApiSlice";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";


const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [Login] = useLoginMutation();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['token']);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const [success, setSuccess] = useState<string>("");

  const onSubmit = async (data: UserSchema) => {
    setError("");
    setSuccess("");
    try {
      const result = await Login(data).unwrap();
      setCookie('token', result.accessToken, { path: '/', maxAge: 3600 * 24 * 7 });
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      dispatch(login(result.user));
      navigate('/');

      setSuccess("התחברת בהצלחה!");
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box  sx={{ mt: 2 }}>
          {/* component="form" */}
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
      </form>
    </Container>
  );
};

export default LoginForm;
