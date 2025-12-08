import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config({ override: true, quiet: true });
}

export const { DATABASE_URL, PORT = 3000 } = process.env;

export const PORT_NUMBER = isNaN(Number(PORT)) ? 3000 : Number(PORT);
