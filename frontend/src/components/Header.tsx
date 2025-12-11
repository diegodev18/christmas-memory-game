import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-end h-9 gap-x-4">
      <p className="fixed top-2 left-2 text-sm opacity-85">
        Built with ❤️ by k014 on{" "}
        <a
          className="hover:underline text-blue-300"
          href="https://github.com/diegodev18/christmas-memory-game"
          target="_blank"
          rel="noreferrer"
        >
          Repository
        </a>
        .
      </p>
      <Button onClick={() => navigate("/scoreboard")} variant={"secondary"}>
        Scoreboard
      </Button>
      <Button onClick={() => navigate("/collection")} variant={"secondary"}>
        Collection
      </Button>
      <Button onClick={() => navigate("/game")} variant={"secondary"}>
        Start Game
      </Button>
      <Separator orientation="vertical" />
      <Button onClick={() => navigate("/auth")} variant={"outline"}>
        Auth
      </Button>
    </header>
  );
}
