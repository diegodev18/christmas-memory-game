import { useState, useEffect } from "react";

interface GameCard {
  id: number;
}

interface CardData {
  id: number;
  image_url: string;
  name: string;
}

interface GameResponse {
  data: GameCard[];
}

export const useGame = (cardsLimit: number) => {
  const [cards, setCards] = useState<GameCard[]>([]);

  const fetchRandomCards = async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/cards/random/${cardsLimit}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch random cards");
      setCards([]);
      return;
    }

    const data = (await response.json()) as GameResponse;
    setCards(data.data);
  };

  const getCardData = async (id: number) => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/cards/data/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      return {} as GameCard;
    }
    const data = (await response.json()) as { data: CardData };
    return data.data;
  };

  useEffect(() => {
    fetchRandomCards();
  }, []);

  return { cards, fetchRandomCards, getCardData };
};
