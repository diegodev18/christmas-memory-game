import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useScore } from "@/hooks/score";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

function Scoreboard() {
  const { scoreboard, fetchScoreboard, errorMessage } = useScore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchScoreboard();
  }, []);

  if (scoreboard.length === 0) {
    return (
      <>
        <div className="max-w-[800px] mx-auto pt-5">
          <Header />
          <main className="mt-10">
            <h1 className="text-center text-4xl font-medium">Scoreboard 🎄</h1>
            <p className="text-center max-w-[450px] mx-auto mt-2">
              No scores yet. Play a game to get started!
            </p>
            {errorMessage && (
              <p className="text-center text-red-500 mt-4">{errorMessage}</p>
            )}
            <Button
              onClick={() => navigate("/game")}
              variant={"destructive"}
              className="mt-8 mx-auto block"
            >
              Start Playing!
            </Button>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="max-w-[800px] mx-auto pt-5">
        <Header />
        <main className="mt-10">
          <h1 className="text-center text-4xl font-medium">Scoreboard 🎄</h1>
          <p className="text-center max-w-[450px] mx-auto mt-2">
            Here is your collection of festive cards!
          </p>
        </main>
      </div>
      <div className="flex flex-col mx-auto gap-4 max-w-[400px] pt-5">
        {scoreboard.map((score) => (
          <div>
            <h2 className="text-center">
              <span className="italic text-sm">level:</span>{" "}
              <strong className="text-xl font-semibold">
                {score.level.toUpperCase()}
              </strong>
            </h2>
            {score.scores.map((entry, idx) => (
              <p>
                {idx + 1}.{" "}
                <span className="uppercase font-semibold text-yellow-300">
                  {entry.user.user_name}
                </span>{" "}
                - Time:{" "}
                <span className="font-semibold text-green-400">
                  {entry.time.toString()}s
                </span>
                , Moves:{" "}
                <span className="font-semibold text-blue-400">
                  {entry.count.toString()}
                </span>
                .
              </p>
            ))}
          </div>
        ))}
      </div>
      {errorMessage && (
        <p className="text-center text-red-500 mt-4">{errorMessage}</p>
      )}
      <Button variant={"outline"} className="mt-10 mx-auto block">
        Take a Screenshot to Share!
      </Button>
    </>
  );
}

export default Scoreboard;
