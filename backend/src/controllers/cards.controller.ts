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

  const randomCards = cards
    .sort(() => 0.5 - Math.random())
    .slice(0, limit)
    .map((card) => ({
      id: card.id,
      image_url: card.url,
      name: card.name,
    }));

  return res.status(200).json({
    data: randomCards,
    message: "Random cards retrieved successfully",
  });
};

export const getCardById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const numId = isNaN(Number(id)) ? -1 : Number(id);
  if (numId === -1) {
    return res.status(400).json({ message: "Invalid card Id" });
  }

  const card = await prisma.cards.findUnique({
    where: { id: numId },
  });

  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  return res.status(200).json({
    data: { id: card.id, image_url: card.url, name: card.name },
    message: "Card data retrieved successfully",
  });
};
