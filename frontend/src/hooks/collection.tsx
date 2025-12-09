import { useState, useEffect } from "react";

export const useCollection = () => {
  const [collection, setCollection] = useState<
    { id: number; name: string; url: string }[]
  >([]);

  const fetchCollection = async () => {
    const data = await fetch(
      import.meta.env.VITE_API_URL + "/collection/items",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const items = (await data.json()).items.map(
      (item: { card: { id: number; name: string; url: string } }) => ({
        id: item.card.id,
        name: item.card.name,
        url: item.card.url,
      })
    );

    setCollection(items);
  };

  useEffect(() => {
    (async () => {
      fetchCollection();
    })();
  }, []);

  return { fetchCollection, collection };
};
