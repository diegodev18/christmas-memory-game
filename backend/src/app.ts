import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { CORS_OPTIONS, PORT_NUMBER } from "@/config";
import { getSessionMiddleware } from "@/middlewares/session.middleware";
import authRouter from "@/routes/auth.route";
import cardsRouter from "@/routes/cards.route";
import collectionRouter from "@/routes/collection.route";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));
app.use(getSessionMiddleware);

app.use("/api/cards", cardsRouter);
app.use("/api/auth", authRouter);
app.use("/api/collection", collectionRouter);

app.listen(PORT_NUMBER, () => {
  console.log(`Server is running on port ${PORT_NUMBER.toString()}`);
});

export default app;
