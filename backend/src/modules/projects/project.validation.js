import { z } from "zod";
import { PROJECT_STATUS } from "../../config/constants.js";

export const createProjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Project name must be at least 3 characters.")
      .max(100, "Project name cannot exceed 100 characters."),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters.")
      .optional(),

    status: z.enum(Object.values(PROJECT_STATUS)).optional(),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    projectId: z.coerce
      .number()
      .int("Project ID must be an integer.")
      .positive("Project ID must be a positive number."),
  }),

  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Project name must be at least 3 characters.")
      .max(100, "Project name cannot exceed 100 characters.")
      .optional(),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters.")
      .optional(),

    status: z.enum(Object.values(PROJECT_STATUS)).optional(),
  }),
});

export const projectIdSchema = z.object({
  params: z.object({
    projectId: z.coerce
      .number()
      .int("Project ID must be an integer.")
      .positive("Project ID must be a positive number."),
  }),
});

export const getProjectsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),

    limit: z.coerce.number().int().positive().optional(),
  }),
});
