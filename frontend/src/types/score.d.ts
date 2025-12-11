interface ScoreEntry {
  count: Decimal | null;
  level: score_levels;
  time: Decimal | null;
  user_id: number | null;
  created_at: Date | null;
  id: number;
}

interface ScoreboardEntry {
  level: "easy" | "medium" | "hard";
  scores: {
    user: {
      user_name: string;
    };
    user_id: undefined;
    count: Decimal;
    level: score_levels;
    time: Decimal;
    created_at: Date | null;
    id: number;
  }[];
}

export interface ScoreboardResponse {
  data: ScoreboardEntry[];
  message: string;
}

export interface ScoreResponse {
  data: ScoreEntry[];
  message: string;
}
