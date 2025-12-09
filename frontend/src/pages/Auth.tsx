import { useState } from "react";
import { useUser } from "@/hooks/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const [action, setAction] = useState<"login" | "register">("login");
  const { user, register, login, setEmail, setPassword, setUsername } =
    useUser();

  if (user) {
    return (
      <div>
        <h1>Welcome, {user.user_name}!</h1>
        <p>You are logged in.</p>
        <Button>Logout</Button>
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
        </div>
      </div>
    </>
  );
}
