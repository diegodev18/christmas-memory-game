interface CardProps {
  card: {
    id: number;
    name: string;
    image: string;
    color: string;
  };
  idx: number;
  isFlipped: boolean;
  isMatched: boolean;
  isStarted: boolean;
  backImage: string;
  onClick: (idx: number) => void;
}

export default function Card({
  card,
  idx,
  isFlipped,
  isMatched,
  isStarted,
  backImage,
  onClick,
}: CardProps) {
  return (
    <div
      className={`m-2 perspective-1000 ${
        isMatched ? "opacity-0 scale-0" : ""
      } transition-all duration-300 ease-in-out hover:rotate-[4deg] hover:scale-[1.01]`}
      style={{
        perspective: "1000px",
        position: isStarted ? "static" : "absolute",
        rotate: isStarted ? "0deg" : `${idx * 2}deg`,
        marginTop: isStarted ? "0px" : `${idx * 4 + 20}px`,
      }}
    >
      <button
        className={`relative w-[180px] h-56 transition-transform duration-500 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onClick={() => onClick(idx)}
        disabled={isMatched}
      >
        {/* Parte trasera de la carta */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg ring-1 ring-neutral-600 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={backImage}
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
}
