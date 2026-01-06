import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { env } from "./config/env";

const port: string = env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
