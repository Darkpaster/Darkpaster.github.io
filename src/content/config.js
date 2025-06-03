import { defineCollection, z } from 'astro:content';

const topicsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        level: z.number().min(1).max(5),
        tags: z.array(z.string()),
        related: z.array(z.string()).optional(),
        meme: z.string().optional(),
        publishedAt: z.date().optional(),
        updatedAt: z.date().optional(),
        draft: z.boolean().default(false),
        weight: z.number().optional(),
        category: z.enum(['cognition', 'society', 'meta', 'technology', 'philosophy']).optional(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
        readingTime: z.number().optional(),
    }),
});

export const collections = {
    topics: topicsCollection,
};