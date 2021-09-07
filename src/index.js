import { MongoSteel } from "mongosteel";
import dotenv from "dotenv";
import express from "express";
import { parseModule } from "./parser.js";
import fs from "fs";
import { log } from "./logger.js";
import cors from "cors";
import pug from "pug";

dotenv.config();

await MongoSteel.connect(process.env.DB_URI ?? "mongodb://localhost:27017");

const app = express();

app.use(express.json()).use(cors());

app.use("/assets", express.static("public"));
app.engine("pug", pug.__express);
app.set("view engine", "pug");

/**
 * @type {{
 * modules: import("./parser").FDPModule[]
 * }}
 */
const json = JSON.parse(fs.readFileSync("flapi.json", { encoding: "utf-8" }));
for await (const module of json.modules) {
  const { router } = parseModule(module);
  log.debug(`Discovered module: ${module.name}`);
  app.use(`/${module.name}`, router);
}

const port = process.env.PORT || 8080;

app.listen(port, () => log.info(`Listening on :${port}`));
