import { useState, useEffect } from "react";

export const useCollection = () => {
  const [collection, setCollection] = useState<
    { id: number; name: string; url: string }[]
  >([]);

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
    const items = data.items.map(
      (item: { card: { id: number; name: string; url: string } }) => ({
        id: item.card.id,
        name: item.card.name,
        url: item.card.url,
      })
    );

    setCollection(items);
  };

  const addCollectionItem = async (itemId: number) => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/collection/new",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
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
