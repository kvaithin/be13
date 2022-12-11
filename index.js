import cors from 'cors';
import express from 'express';
import bodyParser from "body-parser";
import { router } from "./routes.js";

const PORT = 8080;

const app = express();
app.use(cors());
app.use(router);
const parser = bodyParser.json();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})