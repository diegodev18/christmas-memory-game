import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-end h-9 gap-x-4">
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
