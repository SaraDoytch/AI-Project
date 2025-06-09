import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useLoginMutation } from "../stores/Slices/UserApiSlice";
import { loginSchema } from "../schemas/loginSchema";
import { LoginCredentials } from "../interfaces/Interface";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const res = await login(data).unwrap();
      console.log("Login success:", res);
      // save token / user to localStorage or redux here if needed
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" textAlign="center">
        התחברות
      </Typography>

      <TextField
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      <TextField
        label="Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />

      {isError && (
        <Alert severity="error">
          {(error as any)?.data?.message || "Login failed"}
        </Alert>
      )}

      <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : "Login"}
      </Button>
    </Box>
  );
};

export default LoginForm;
