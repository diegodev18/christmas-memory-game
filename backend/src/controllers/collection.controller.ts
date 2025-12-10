import type { Response } from "express";

import type { SessionRequest } from "@/types";

import prisma from "@/lib/prisma";
import { NewCollectionItemBodySchema } from "@/schemas/collection.schema";

export const getCollectionItems = async (
  req: SessionRequest,
  res: Response
) => {
  if (!req.session?.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const collectionItems = await prisma.collections.findMany({
    include: {
      cards: true,
    },
    where: {
      user_id: req.session.user.id,
    },
  });

  return res.status(200).json({
    items: collectionItems.map((item) => ({
      card: {
        id: item.cards.id,
        image_url: item.cards.url,
        name: item.cards.name,
      },
      id: item.id,
    })),
  });
};

export const newCollectionItem = async (req: SessionRequest, res: Response) => {
  if (!req.session?.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const parseResult = NewCollectionItemBodySchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const { cardId } = parseResult.data;

  const cardFound = await prisma.cards.findUnique({
    where: {
      id: cardId,
    },
  });

  if (!cardFound) {
    return res.status(404).json({ message: "Card not found" });
  }

  const existingCollectionItem = await prisma.collections.findFirst({
    where: {
      card_id: cardId,
      user_id: req.session.user.id,
    },
  });

  if (existingCollectionItem) {
    return res.status(409).json({ message: "Card already in collection" });
  }

  await prisma.collections.create({
    data: {
      card_id: cardId,
      user_id: req.session.user.id,
    },
  });

  return res.status(201).json({
    item: cardFound,
    message: "New collection item created successfully",
  });
};
