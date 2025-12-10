import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCollection } from "@/hooks/collection";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
          <h1 className="text-center text-4xl font-medium">Collection 🎄</h1>
          <p className="text-center max-w-[450px] mx-auto mt-2">
            Here is your collection of festive cards!
          </p>
        </main>
      </div>
      <div className="flex gap-4 justify-center flex-wrap max-w-[800px] mx-auto pt-5">
        {collection.map((card, idx) => (
          <Tooltip key={card.id}>
            <TooltipTrigger>
              <img
                className={`size-20 object-center object-cover rounded-lg ring ring-neutral-800 hover:scale-125 transition ease-in-out duration-200 hover:rotate-0 ${
                  idx % 2 === 0 ? "rotate-6" : "-rotate-6"
                }`}
                src={card.image_url}
                alt={card.name}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{card.name.toUpperCase()}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <Button variant={"outline"} className="mt-10 mx-auto block">
        Take a Screenshot to Share!
      </Button>
    </>
  );
}

export default Collection;
