import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

if (process.env.NODE_ENV !== "production") {
  config({ override: true, path: ".env", quiet: true });
}

export default defineConfig({
  datasource: {
    url: env("DATABASE_URL"),
  },
  schema: "prisma/schema.prisma",
});
