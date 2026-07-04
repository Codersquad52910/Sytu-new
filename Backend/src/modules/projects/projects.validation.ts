import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').trim(),
    description: z.string().min(1, 'Description is required'),
    category: z.enum(['Web', 'Mobile', 'ML', 'Design', 'Other']),
    techStack: z.array(z.string()).default([]),
    githubUrl: z.string().url().optional().or(z.literal('')),
    demoUrl: z.string().url().optional().or(z.literal('')),
    teamSize: z.number().min(1).default(1),
    status: z.enum(['in_progress', 'completed', 'abandoned']).default('in_progress'),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1).trim().optional(),
    description: z.string().min(1).optional(),
    category: z.enum(['Web', 'Mobile', 'ML', 'Design', 'Other']).optional(),
    techStack: z.array(z.string()).optional(),
    githubUrl: z.string().url().optional().or(z.literal('')),
    demoUrl: z.string().url().optional().or(z.literal('')),
    teamSize: z.number().min(1).optional(),
    status: z.enum(['in_progress', 'completed', 'abandoned']).optional(),
  }),
});

export const requestScreenshotsUploadSchema = z.object({
  body: z.object({
    screenshots: z.array(z.object({
      filename: z.string().min(1, 'Filename is required'),
      contentType: z.string().min(1, 'ContentType is required'),
    })).max(5, 'Maximum of 5 screenshots allowed'),
  }),
});
