import express from "express";

import { PORT_NUMBER } from "@/config";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server is running on port ${PORT_NUMBER.toString()}`);
});

export default app;
