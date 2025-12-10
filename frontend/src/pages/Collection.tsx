import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Card from "@/components/Card";
import { useCollection } from "@/hooks/collection";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/hooks/game";

function Collection() {
  const { collection } = useCollection();
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-[800px] mx-auto pt-5">
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
      <div className="flex gap-2 justify-center flex-wrap max-w-[800px] mx-auto pt-5">
        {collection.map((card, idx) => (
          <img
            className={`size-16 object-center object-cover rounded-lg ${
              idx % 2 === 0 ? "rotate-6" : "-rotate-6"
            }`}
            key={idx}
            src={card.image_url}
            alt={card.name}
          />
        ))}
      </div>
    </>
  );
}

export default Collection;
