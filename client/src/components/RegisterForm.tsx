// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { RegisterSchema } from "../schemas/AuthSchemas";
// import { z } from "zod";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Container,
//   Alert,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from 'react-router';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { User } from '../interfaces/Interface';
// import { useRegisterMutation } from '../stores/Slices/UserApiSlice';
// import { login } from '../stores/Slices/authSlice';
// // import { styles } from '../CSS/loginForm';
// import { loginRegister } from '../stores/Slices/authSlice'; 


// type RegisterFormData = z.infer<typeof RegisterSchema>;

// const RegisterForm = () => {
//     const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [Register] = useRegisterMutation();
//   const [apiError, setApiError] = useState<string | null>(null);


//   const {
//     register,
//     handleSubmit,
//     control,
//         setValue,

//     formState: { errors, isSubmitting },
//   } = useForm<RegisterFormData>({
//     resolver: zodResolver(RegisterSchema),
//         defaultValues: {
//       firstName: '',
//       lastName:'',
//       phone: '',
//       email: '',
//       password: '',
//     },
//   });

//   const [error, setError] = useState<string>("");
//   const [success, setSuccess] = useState<string>("");

//   const onSubmit = async (data: RegisterFormData) => {
//     setError("");
//     setSuccess("");
//     try {
//       const result = await Register(data).unwrap();
//             localStorage.setItem('currentUser', JSON.stringify(result.user));
//  dispatch(loginRegister(result.user));
//       navigate('/');
//       setSuccess("נרשמת בהצלחה!");
//     } catch (err: any) {
//       setError(err.response?.data?.detail || "שגיאה בהרשמה");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" gutterBottom>
//         הרשמה למערכת
//       </Typography>
//       {error && <Alert severity="error">{error}</Alert>}
//       {success && <Alert severity="success">{success}</Alert>}

//       <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
//         <TextField
//           label="שם פרטי"
//           {...register("firstName")}
//           error={!!errors.firstName}
//           helperText={errors.firstName?.message}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="שם משפחה"
//           {...register("lastName")}
//           error={!!errors.lastName}
//           helperText={errors.lastName?.message}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="טלפון"
//           {...register("phone")}
//           error={!!errors.phone}
//           helperText={errors.phone?.message}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="אימייל"
//           {...register("email")}
//           error={!!errors.email}
//           helperText={errors.email?.message}
//           fullWidth
//           required
//           margin="normal"
//           type="email"
//         />
//         <TextField
//           label="סיסמה"
//           {...register("password")}
//           error={!!errors.password}
//           helperText={errors.password?.message}
//           fullWidth
//           required
//           margin="normal"
//           type="password"
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//           sx={{ mt: 2 }}
//           disabled={isSubmitting}
//         >
//           הרשמה
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default RegisterForm;


import React from "react";
import { useForm, Controller } from "react-hook-form";
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../stores/Slices/UserApiSlice";
import { loginRegister } from "../stores/Slices/authSlice";

type RegisterFormData = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Register] = useRegisterMutation();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      role: "user", // ברירת מחדל
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError("");
    setSuccess("");
    try {
      const result = await Register(data).unwrap();
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      dispatch(loginRegister(result.user));
      navigate("/");
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

        {/* שדה בחירת תפקיד */}
        <FormControl
          fullWidth
          margin="normal"
          error={!!errors.role}
          required
        >
          <InputLabel id="role-label">תפקיד</InputLabel>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select labelId="role-label" label="תפקיד" {...field}>
                <MenuItem value="user">משתמש</MenuItem>
                <MenuItem value="admin">מנהל</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{errors.role?.message}</FormHelperText>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          הרשמה
        </Button>
         {/* כפתור מעבר להתחברות */}
        <Box textAlign="center" mt={2}>
          <Typography variant="body2">כבר רשום?</Typography>
          <Button variant="text" onClick={() => navigate("/loginForm")}>
            התחבר
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
