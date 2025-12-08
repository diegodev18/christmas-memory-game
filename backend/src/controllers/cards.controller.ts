import type { Request, Response } from "express";

import prisma from "@/lib/prisma";

export const getRandomCards = async (req: Request, res: Response) => {
  let limit = parseInt(req.params.limit, 10);
  if (isNaN(limit) || limit <= 0) {
    limit = 10;
  } else if (limit > 100) {
    limit = 100;
  }

  const cards = await prisma.cards.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  const randomCards = cards.sort(() => 0.5 - Math.random()).slice(0, limit);

  return res
    .status(200)
    .json({ data: randomCards, message: "Get random cards endpoint" });
};
