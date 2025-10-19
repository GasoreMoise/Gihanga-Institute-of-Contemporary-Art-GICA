import { z } from 'zod';

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200, 'Subject too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message too long'),
  honeypot: z.string().max(0, 'Bot detected') // Honeypot field
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Newsletter signup validation
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  honeypot: z.string().max(0, 'Bot detected')
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// Search validation
export const searchSchema = z.object({
  q: z.string().min(1, 'Search query required').max(100, 'Search query too long'),
  type: z.enum(['all', 'exhibitions', 'programme', 'contributors']).optional()
});

export type SearchData = z.infer<typeof searchSchema>;

// Sanity content validation
export const exhibitionSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.object({ current: z.string() }),
  summary: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  cover: z.object({
    asset: z.object({
      url: z.string(),
      metadata: z.object({
        dimensions: z.object({
          width: z.number(),
          height: z.number()
        })
      })
    }),
    alt: z.string().optional()
  }).optional(),
  body: z.array(z.any()).optional(),
  locale: z.enum(['en', 'rw'])
});

export type Exhibition = z.infer<typeof exhibitionSchema>;
