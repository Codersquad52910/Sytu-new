import { z } from 'zod';

const ExperienceInputSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  role: z.string().min(1, 'Role name is required'),
  from: z.string().datetime(),
  to: z.string().datetime().nullable().default(null),
  description: z.string().optional(),
});

const EducationInputSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  from: z.string().datetime(),
  to: z.string().datetime().optional(),
});

const AchievementInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  date: z.string().datetime(),
});

const CertificationInputSchema = z.object({
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  url: z.string().url().optional(),
  date: z.string().datetime(),
});

export const updatePortfolioSchema = z.object({
  body: z.object({
    about: z.string().optional(),
    headline: z.string().optional(),
    experience: z.array(ExperienceInputSchema).optional(),
    education: z.array(EducationInputSchema).optional(),
    achievements: z.array(AchievementInputSchema).optional(),
    certifications: z.array(CertificationInputSchema).optional(),
    theme: z.enum(['default', 'minimal', 'dark']).optional(),
  }),
});
