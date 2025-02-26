import { z } from "zod";

export const taskSchema = z.object({
  name: z.string().min(3, "Task name must be at least 3 characters"),
  description: z.string().optional(),
  icon: z.string({ message: "You must select an icon" }),
  status: z.string().nullable().optional()
});

export const taskUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  status: z.string().nullable().optional()
});
