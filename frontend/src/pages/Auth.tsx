import { useState } from "react";
import { useUser } from "@/hooks/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [action, setAction] = useState<"login" | "register">("login");
  const {
    user,
    register,
    login,
    logout,
    setEmail,
    setPassword,
    setUsername,
    errorMessage,
  } = useUser();
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="flex flex-col gap-y-4 items-center justify-center h-screen">
        <div className="text-lg font-mono">
          <h1>Welcome, {user.user_name}!</h1>
          <p>You are logged in.</p>
        </div>
        <div className="space-x-2">
          <Button variant={"secondary"} onClick={() => navigate("/game")}>
            Play now!
          </Button>
          <Button variant={"destructive"} onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    );
  }

  const handlerChangeAction = () => {
    setAction(action === "login" ? "register" : "login");
  };

  const handlerSubmit = async () => {
    if (action === "register") {
      register();
    } else {
      login();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col gap-y-2 w-100">
          <h2 className="text-xl bg-yellow-300/40 px-1.5 mx-auto font-mono">
            {action === "login" ? "Login" : "Register"}
          </h2>
          {action === "register" ? (
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
          ) : null}
          <Input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="User Name"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <Button type="submit" onClick={handlerSubmit}>
            {action === "login" ? "Login" : "Register"}
          </Button>
          <Button variant={"link"} type="button" onClick={handlerChangeAction}>
            {action === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </Button>
          {errorMessage ? (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          ) : null}
        </div>
      </div>
    </>
  );
}
