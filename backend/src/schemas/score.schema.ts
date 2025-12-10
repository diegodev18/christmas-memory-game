import { z } from "zod";

import { score_levels } from "@/generated/prisma/enums";

export const ScoreBodySchema = z.object({
  count: z.number().min(1, "Count must be at least 1"),
  level: z.enum(Object.values(score_levels)),
  time: z.number().min(1, "Time must be at least 1 second"),
});

export type Score = z.infer<typeof ScoreBodySchema>;
