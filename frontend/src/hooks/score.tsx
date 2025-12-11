import type { ScoreResponse } from "@/types";
import { useState } from "react";

export const useScore = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scoreboard, setScoreboard] = useState<ScoreResponse["data"]>([]);

  const fetchScoreboard = async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/score/top/10"
    );
    const data = (await response.json()) as ScoreResponse;

    if (!response.ok) {
      setErrorMessage(data.message || "Failed to fetch scoreboard");
      setScoreboard([]);
    }

    setScoreboard(data.data);
  };

  const submitScore = async (level: string, time: number, count: number) => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/score/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level, time, count }),
      }
    );
    const data = (await response.json()) as ScoreResponse;

    if (!response.ok) {
      setErrorMessage(data.message || "Failed to submit score");
      return false;
    }

    return true;
  };

  return {
    errorMessage,
    scoreboard,
    fetchScoreboard,
    submitScore,
  };
};
