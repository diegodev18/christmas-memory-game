import { useState, useEffect } from "react";
import type { GameCard } from "@/types";

export const useCollection = () => {
  const [collection, setCollection] = useState<GameCard[]>([]);

  const fetchCollection = async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/collection/items",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch collection");
      setCollection([]);
      return;
    }

    const data = await response.json();
    const items = data.items.map((item: { card: GameCard }) => ({
      id: item.card.id,
      name: item.card.name,
      image_url: item.card.image_url,
    }));

    setCollection(items);
  };

  const addCollectionItem = async (cardId: number) => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/collection/new",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardId }),
      }
    );

    if (!response.ok) {
      console.error("Failed to add item to collection");
      return;
    }

    fetchCollection();
  };

  useEffect(() => {
    (async () => {
      fetchCollection();
    })();
  }, []);

  return { fetchCollection, collection, addCollectionItem };
};
