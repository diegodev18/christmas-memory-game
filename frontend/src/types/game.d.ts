export interface GameCard {
  id: number;
  image_url: string;
  name: string;
}

export interface GameResponse {
  data: GameCard[];
}
