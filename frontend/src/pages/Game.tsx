import { useState } from "react";
import { toast } from "sonner";
import Card from "@/components/Card";
import { useCollection } from "@/hooks/collection";
import { useGame } from "@/hooks/game";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectLevel() {
  const navigate = useNavigate();
  return (
    <div className="block mx-auto w-fit mt-4">
      <Select
        onValueChange={(val) => {
          const url = new URL(window.location.href);
          url.searchParams.set("level", val);
          navigate(url.pathname + url.search);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Game() {
  const { cards } = useGame(10);
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const fullCards = [...cards, ...cards];
  const { collection, addCollectionItem } = useCollection();
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
      const firstCard = fullCards[firstIdx];
      const secondCard = fullCards[secondIdx];

      // Si las cartas coinciden por ID
      if (firstCard.id === secondCard.id) {
        if (!collection.find((item) => item.id === firstCard.id)) {
          addCollectionItem(firstCard.id);
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
        <Header />
        <main className="mt-10">
          <h1 className="text-center text-4xl font-medium">Memoristmas 🎄</h1>
          <p className="text-center max-w-[450px] mx-auto mt-2">
            Find all the matching pairs of Christmas-themed cards to win the
            game!
          </p>
        </main>
      </div>
      <SelectLevel />
      <div className="flex justify-center flex-wrap max-w-[1200px] mx-auto pt-5">
        {fullCards.map((card, idx) => (
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

export default Game;
