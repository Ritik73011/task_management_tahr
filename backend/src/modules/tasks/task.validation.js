import { z } from "zod";
import {
  TASK_PRIORITY,
  TASK_STATUS,
  SORT_ORDER,
} from "../../config/constants.js";

export const createTaskSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters.")
      .max(100, "Title cannot exceed 100 characters."),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters.")
      .optional(),

    priority: z.enum(Object.values(TASK_PRIORITY)).optional(),

    status: z.enum(Object.values(TASK_STATUS)).optional(),

    due_date: z.coerce.date({
      error: "Due date is required.",
    }),

    project_id: z.coerce
      .number()
      .int("Project ID must be an integer.")
      .positive("Project ID must be a positive number."),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    taskId: z.coerce
      .number()
      .int("Task ID must be an integer.")
      .positive("Task ID must be a positive number."),
  }),

  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters.")
      .max(100, "Title cannot exceed 100 characters.")
      .optional(),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters.")
      .optional(),

    priority: z.enum(Object.values(TASK_PRIORITY)).optional(),

    status: z.enum(Object.values(TASK_STATUS)).optional(),

    due_date: z.coerce.date().optional(),

    project_id: z.coerce
      .number()
      .int("Project ID must be an integer.")
      .positive("Project ID must be a positive number.")
      .optional(),
  }),
});

export const taskIdSchema = z.object({
  params: z.object({
    taskId: z.coerce
      .number()
      .int("Task ID must be an integer.")
      .positive("Task ID must be a positive number."),
  }),
});

export const getTasksSchema = z.object({
  query: z.object({
    status: z.enum(Object.values(TASK_STATUS)).optional(),

    priority: z.enum(Object.values(TASK_PRIORITY)).optional(),

    sort: z.enum(Object.values(SORT_ORDER)).optional(),
  }),
});
