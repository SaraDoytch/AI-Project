// schemas/AuthSchemas.ts
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("אימייל לא תקין").min(1, "שדה אימייל חובה"),
  password: z.string().min(8, "הסיסמה חייבת להכיל לפחות 8 תווים"),
});



export const RegisterSchema = z.object({
  firstName: z.string().min(1, "שדה שם פרטי חובה"),
  lastName: z.string().min(1, "שדה שם משפחה חובה"),
  phone: z.string()
    .min(8, "מספר טלפון חייב להכיל לפחות 8 ספרות")
    .max(15, "מספר טלפון ארוך מדי")
    .regex(/^[0-9+()-\s]+$/, "מספר טלפון לא תקין"),
  email: z.string().email("אימייל לא תקין").min(1, "שדה אימייל חובה"),
  password: z.string().min(8, "הסיסמה חייבת להכיל לפחות 8 תווים"),
  role: z.enum(["user", "admin"]),
});
