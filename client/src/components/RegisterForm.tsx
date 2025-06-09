// components/RegisterForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schemas/registerSchema';
import { IUser } from '../interfaces/Interface';
import { useRegisterMutation } from '../stores/Slices/UserApiSlice';
import { TextField, Button, Box, Typography } from '@mui/material';
import { z } from 'zod';

const RegisterForm = () => {
  const [registerUser] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await registerUser(data).unwrap();
      alert('Registered successfully');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Register</Typography>
      <TextField label="First Name" fullWidth margin="normal" {...register('firstName')} error={!!errors.firstName} helperText={errors.firstName?.message} />
      <TextField label="Last Name" fullWidth margin="normal" {...register('lastName')} error={!!errors.lastName} helperText={errors.lastName?.message} />
      <TextField label="Email" fullWidth margin="normal" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
      <TextField label="Phone" fullWidth margin="normal" {...register('phone')} error={!!errors.phone} helperText={errors.phone?.message} />
      <TextField label="Password" fullWidth type="password" margin="normal" {...register('password')} error={!!errors.password} helperText={errors.password?.message} />
      <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
    </Box>
  );
};

export default RegisterForm;
