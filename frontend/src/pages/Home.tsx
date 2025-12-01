import { Button } from "@/components/ui/button";

function Home() {
  return (
    <>
      <div className="max-w-[800px] mx-auto pt-5">
        <header className="flex justify-end gap-x-4">
          <Button variant={"secondary"}>Start Game</Button>
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
    </>
  );
}

export default Home;
