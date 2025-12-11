import { Response } from "express";

import type { SessionRequest } from "@/types";

import { score_levels } from "@/generated/prisma/enums";
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
  const parseResult = ScoreQuerySchema.safeParse(req.params);
  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid limit parameter: " + parseResult.error.message,
    });
  }

  const topScores = await Promise.all(
    Object.values(score_levels).map(async (lvl) => {
      const scores = await prisma.score.findMany({
        orderBy: [{ count: "desc" }, { time: "asc" }],
        take: parseResult.data.limit,
        where: { level: lvl },
      });
      const scoresWithUser = (
        await Promise.all(
          scores.map(async (score) => {
            const user = await prisma.users.findUnique({
              where: { id: score.user_id },
            });
            if (!user) return null;
            return {
              ...score,
              user: {
                user_name: user.user_name,
              },
              user_id: undefined,
            };
          })
        )
      ).filter((s) => s !== null);
      return {
        level: lvl,
        scores: scoresWithUser,
      };
    })
  );

  return res.status(200).json({
    data: topScores,
    message: "Top scores retrieved successfully",
  });
};
