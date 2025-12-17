import app from "./app";

const port: string = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
