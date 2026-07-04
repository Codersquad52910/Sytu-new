import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Workspace title is required').trim(),
    description: z.string().min(1, 'Description is required'),
    category: z.string().min(1, 'Category is required'),
    imageUrl: z.string().url().optional(),
    projects: z.array(z.string()).default([]),
  }),
});

export const updateWorkspaceSchema = z.object({
  body: z.object({
    title: z.string().min(1).trim().optional(),
    description: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    imageUrl: z.string().url().optional(),
    projects: z.array(z.string()).optional(),
  }),
});
