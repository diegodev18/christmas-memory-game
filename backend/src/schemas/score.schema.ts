import { z } from "zod";

import { score_levels } from "@/generated/prisma/enums";

export const ScoreBodySchema = z.object({
  count: z.number().min(1, "Count must be at least 1"),
  level: z.enum(Object.values(score_levels)),
  time: z.number().min(1, "Time must be at least 1 second"),
});

export const ScoreQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Limit must be a positive integer",
    }),
});

export type Score = z.infer<typeof ScoreBodySchema>;
