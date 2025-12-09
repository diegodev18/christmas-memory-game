import { z } from "zod";

export const NewCollectionItemBodySchema = z.object({
  cardId: z.number().int().positive(),
});
