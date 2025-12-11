import type { CorsOptions, CorsOptionsDelegate } from "cors";

import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config({ override: true, quiet: true });
}

export const {
  DATABASE_URL,
  JWT_SECRET = "your_jwt_secret_must_be_at_least_32_characters_long_and_in_environment_variables",
  NODE_ENV = "development",
  ORIGIN_DOMAIN = "localhost",
  PORT = 3000,
  SALT_ROUNDS = 10,
} = process.env;

export const PORT_NUMBER = isNaN(Number(PORT)) ? 3000 : Number(PORT);

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const PRODUCTION_ENV = NODE_ENV === "production";

export const COOKIE_OPTIONS = {
  domain: ORIGIN_DOMAIN,
  httpOnly: PRODUCTION_ENV ? true : false,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: PRODUCTION_ENV ? "strict" : "lax",
  secure: PRODUCTION_ENV ? true : false,
} as const;

export const SALT_ROUNDS_NUM =
  typeof SALT_ROUNDS === "number" ? SALT_ROUNDS : Number(SALT_ROUNDS);

export const CORS_OPTIONS: CorsOptions | CorsOptionsDelegate | undefined = {
  allowedHeaders: ["Content-Type", "Cookie"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  optionsSuccessStatus: 200,
  origin:
    NODE_ENV === "production"
      ? `https://${ORIGIN_DOMAIN}`
      : "http://localhost:5173",
};
