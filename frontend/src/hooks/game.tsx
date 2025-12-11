import { useState, useEffect } from "react";
import type { GameResponse, GameCard } from "@/types";

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
    const data = (await response.json()) as { data: GameCard };
    return data.data;
  };

  useEffect(() => {
    const loadCards = async () => {
      await fetchRandomCards();
    };
    void loadCards();
  }, []);

  return { cards, fetchRandomCards, getCardData };
};
