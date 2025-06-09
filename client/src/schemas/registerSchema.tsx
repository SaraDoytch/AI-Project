import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(7, { message: "Phone must be at least 7 digits" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default registerSchema;
