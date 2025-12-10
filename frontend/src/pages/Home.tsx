import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";
import Card from "@/components/Card";
import { useNavigate } from "react-router-dom";
import { exampleCards as cards } from "@/consts/cards";

function Home() {
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [shuffledCards] = useState(() => {
    return [...cards, ...cards].sort(() => Math.random() - 0.5);
  });
  const [isStarted, setIsStarted] = useState(false);
  const [collections, setCollections] = useState<number[]>([]);
  const navigate = useNavigate();
  const bgCard =
    "https://i.pinimg.com/1200x/54/ac/58/54ac5887bccf43c438839122586ea1ac.jpg";

  const handleCardClick = (idx: number) => {
    if (!isStarted) setIsStarted(true);

    // No permitir clic en cartas ya emparejadas
    if (matchedCards.includes(idx)) return;

    // No permitir clic en la misma carta
    if (clickedCards.includes(idx)) return;

    // Si ya hay 2 cartas seleccionadas, reiniciar
    if (clickedCards.length >= 2) {
      setClickedCards([idx]);
      return;
    }

    const newClickedCards = [...clickedCards, idx];
    setClickedCards(newClickedCards);

    // Verificar si hay dos cartas seleccionadas
    if (newClickedCards.length === 2) {
      const [firstIdx, secondIdx] = newClickedCards;
      const firstCard = shuffledCards[firstIdx];
      const secondCard = shuffledCards[secondIdx];

      // Si las cartas coinciden por ID
      if (firstCard.id === secondCard.id) {
        if (!collections.includes(firstCard.id)) {
          setCollections([...collections, firstCard.id]);
          toast(`You found a pair of ${firstCard.name} cards! 🎉`);
        }

        // Esperar un momento antes de ocultar las cartas
        setTimeout(() => {
          setMatchedCards([...matchedCards, firstIdx, secondIdx]);
          setClickedCards([]);
        }, 500);
      } else {
        // Si no coinciden, voltear después de un momento
        setTimeout(() => {
          setClickedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <>
      <div
        className="max-w-[800px] mx-auto pt-5"
        style={isStarted ? { position: "relative" } : {}}
      >
        <header className="flex justify-end h-9 gap-x-4">
          <Button onClick={() => navigate("/game")} variant={"secondary"}>
            Start Game
          </Button>
          <Separator orientation="vertical" />
          <Button onClick={() => navigate("/auth")} variant={"outline"}>
            Log in
          </Button>
        </header>
        <main className="mt-10">
          <h1 className="text-center text-4xl font-medium">Memoristmas 🎄</h1>
          <p className="text-center max-w-[450px] mx-auto mt-2">
            Find all the matching pairs of Christmas-themed cards to win the
            game!
          </p>
        </main>
      </div>
      <div className="flex justify-center flex-wrap max-w-[800px] mx-auto pt-5">
        {shuffledCards.map((card, idx) => (
          <Card
            key={idx}
            card={card}
            idx={idx}
            isFlipped={clickedCards.includes(idx)}
            isMatched={matchedCards.includes(idx)}
            isStarted={isStarted}
            backImage={bgCard}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
