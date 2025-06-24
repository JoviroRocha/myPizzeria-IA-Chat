import express from "express";
import router from "./routes.js";
import { db } from "./db/db.js";

const app = express();
app.use(express.json(), router);

db.sync()
  .then(() => console.log("Tables created successfully!"))
  .catch((error) => {
    console.error("Unable to create tables : ", error);
  });

app.listen(3001, () => console.log("Backend executing on port 3001"));
