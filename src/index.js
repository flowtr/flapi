import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import express from "express";
import { parseModule } from "./parser.js";
import fs from "fs";

dotenv.config();

const client = new MongoClient(
  process.env.DB_URI ?? "mongodb://localhost:27017"
);
await client.connect();
const db = client.db(process.env.DB_NAME);

const app = express();

/**
 * @type {import("./parser").FDPModel[]}
 */
const modules = JSON.parse(fs.readFileSync("flapi.json", { encoding: "utf-8" }));
for await (const module of modules.modules) {
  const { router } = parseModule(module, db);
  console.log("Discovered", module.name)
  app.use(`/${module.name}`, router);
}

app.listen(process.env.PORT || 3000, () => console.log("listening."));
