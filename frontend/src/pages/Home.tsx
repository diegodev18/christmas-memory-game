import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

function Home() {
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [bgCards] = useState<string[]>([
    "https://i.pinimg.com/1200x/54/ac/58/54ac5887bccf43c438839122586ea1ac.jpg",
    "https://i.pinimg.com/1200x/54/ac/58/54ac5887bccf43c438839122586ea1ac.jpg",
    "https://i.pinimg.com/1200x/54/ac/58/54ac5887bccf43c438839122586ea1ac.jpg",
  ]);
  const [cards] = useState<
    { id: number; name: string; image: string; color: string }[]
  >([
    {
      id: 1,
      name: "Reno",
      image:
        "https://as2.ftcdn.net/v2/jpg/05/44/16/87/1000_F_544168719_oLnqNZxl4ppagM0ztzWl5MMSWGBzIoMN.jpg",
      color: "red",
    },
    {
      id: 2,
      name: "Reno 1",
      image:
        "https://as1.ftcdn.net/v2/jpg/05/44/16/86/1000_F_544168674_kAfWk6ZsfLqVKp0PLAP7q5h4aaGQVYV9.jpg",
      color: "red",
    },
    {
      id: 3,
      name: "Reno 2",
      image:
        "https://as2.ftcdn.net/v2/jpg/05/44/16/87/1000_F_544168736_bF0ttcz1cBUmNlthVZZ6luL12ZBzPT9T.jpg",
      color: "red",
    },
  ]);
  const [shuffledCards] = useState<typeof cards>(() =>
    [...cards, ...cards].sort(() => Math.random() - 0.5)
  );
  const [randomBgCard] = useState(
    () => bgCards[Math.floor(Math.random() * bgCards.length)]
  );

  const handleCardClick = (idx: number) => {
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
      <div className="max-w-[800px] mx-auto pt-5">
        <header className="flex justify-end h-9 gap-x-4">
          <Button variant={"secondary"}>Start Game</Button>
          <Separator orientation="vertical" />
          <Button variant={"outline"}>Log in</Button>
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
        {shuffledCards.map((card, idx) => {
          const isMatched = matchedCards.includes(idx);
          const isFlipped = clickedCards.includes(idx);

          return (
            <div
              key={idx}
              className={`m-2 perspective-1000 ${
                isMatched ? "opacity-0 scale-0" : ""
              } transition-all duration-300 ease-in-out`}
              style={{ perspective: "1000px" }}
            >
              <button
                className={`relative w-[180px] h-56 transition-transform duration-500 preserve-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
                onClick={() => handleCardClick(idx)}
                disabled={isMatched}
              >
                {/* Parte trasera de la carta */}
                <div
                  className="absolute inset-0 backface-hidden rounded-lg ring-1 ring-neutral-600 overflow-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={randomBgCard}
                    alt="Card back"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Parte frontal de la carta */}
                <div
                  className="absolute inset-0 backface-hidden rounded-lg ring-1 ring-neutral-600 overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
