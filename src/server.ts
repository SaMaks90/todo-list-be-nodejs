import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { env } from "./config/env";

const port: number = Number(env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
