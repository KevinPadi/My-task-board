import { z } from "zod";

export const taskSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(3, "Task name must be at least 3 characters"),
  description: z.string().optional(),
  icon: z.string({ message: "You must select an icon" }),
  status: z.string().nullable().optional()
})

export type TaskSchema = z.infer<typeof taskSchema>