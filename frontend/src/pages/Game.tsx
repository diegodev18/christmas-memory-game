import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Card from "@/components/Card";
import { useCollection } from "@/hooks/collection";
import { useGame } from "@/hooks/game";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useScore } from "@/hooks/score";
import { useUser } from "@/hooks/user";
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
  const { submitScore } = useScore();
  const { user } = useUser();
  const { cards } = useGame(10);
  const navigate = useNavigate();
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const scoreSubmitted = useRef(false);
  const fullCards = [...cards, ...cards];
  const { collection, addCollectionItem } = useCollection();
  const level =
    new URLSearchParams(window.location.search).get("level") || "easy";
  const bgCard =
    "https://i.pinimg.com/1200x/54/ac/58/54ac5887bccf43c438839122586ea1ac.jpg";

  // Detectar cuando se completan todas las cartas
  useEffect(() => {
    if (
      matchedCards.length === fullCards.length &&
      matchedCards.length > 0 &&
      startTime &&
      !scoreSubmitted.current
    ) {
      const endTime = Date.now();
      const timeInSeconds = Math.floor((endTime - startTime) / 1000);
      submitScore(level, timeInSeconds, moveCount);
      scoreSubmitted.current = true;
      toast.success(
        `Game completed in ${timeInSeconds} seconds with ${moveCount} moves! 🎉`
      );
    }
  }, [
    matchedCards,
    fullCards.length,
    startTime,
    submitScore,
    level,
    moveCount,
  ]);

  if (!user) {
    return navigate("/auth");
  }

  const handleCardClick = (idx: number) => {
    if (!isStarted) {
      setIsStarted(true);
      setStartTime(Date.now());
    }

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
      setMoveCount(moveCount + 1);
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
