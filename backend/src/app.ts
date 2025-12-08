import express from "express";

import { PORT_NUMBER } from "@/config";
import cardsRouter from "@/routes/cards.route";

const app = express();

app.use(express.json());

app.use("/api/cards", cardsRouter);

app.listen(PORT_NUMBER, () => {
  console.log(`Server is running on port ${PORT_NUMBER.toString()}`);
});

export default app;
