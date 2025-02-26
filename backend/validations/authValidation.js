import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .max(100, 'El email no puede tener más de 100 caracteres'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(64, 'La contraseña no puede tener más de 64 caracteres'),
});

export const loginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .max(100, 'El email no puede tener más de 100 caracteres'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(64, 'La contraseña no puede tener más de 64 caracteres'),
});
