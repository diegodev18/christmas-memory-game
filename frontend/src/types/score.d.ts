interface ScoreEntry {
  count: Decimal | null;
  level: score_levels;
  time: Decimal | null;
  user_id: number | null;
  created_at: Date | null;
  id: number;
}

export interface ScoreResponse {
  data: ScoreEntry[];
  message: string;
}
