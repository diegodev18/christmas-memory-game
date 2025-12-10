import { Response } from "express";

import type { SessionRequest } from "@/types";

import prisma from "@/lib/prisma";
import { ScoreBodySchema, ScoreQuerySchema } from "@/schemas/score.schema";

export const submitScore = async (req: SessionRequest, res: Response) => {
  if (!req.session?.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.session.user.id;

  const parseResult = ScoreBodySchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      errors: parseResult.error.message,
      message: "Invalid score data",
    });
  }

  const { count, level, time } = parseResult.data;

  const score = await prisma.score.create({
    data: {
      count,
      level,
      time,
      user_id: userId,
    },
  });

  return res
    .status(200)
    .json({ message: "Score submitted successfully", score });
};

export const getTopScores = async (req: SessionRequest, res: Response) => {
  const parseResult = ScoreQuerySchema.safeParse(req.query.limit);
  if (!parseResult.success) {
    return res.status(400).json({ message: "Invalid limit parameter" });
  }

  const topScores = await prisma.score.findMany({
    orderBy: [{ count: "desc" }, { time: "asc" }],
    take: parseResult.data.limit,
  });

  return res.status(200).json({
    data: topScores,
    message: "Top scores retrieved successfully",
  });
};
