import express from "express";

/**
 * @typedef FDPModel
 * @property {Record<string, {
 *  type: "string";
 *  id: string;
 *  displayName: string;
 * }} fields
 */

/**
 * @typedef FDPModule
 * @property {string} name
 * @property {FDPModel} model
 */

/**
 * @param {import("mongodb").Db} db
 * @param {FDPModule} module
 * @returns
 */
export const parseModule = (module, db) => {
  const router = express.Router();

  router.get("/api", async (req, res) => {
    if (module.model) {
      const col = db.collection(module.name);
      const data = await col.find({}).toArray();

      return res.json(data);
    } else {
      return res.status(404);
    }
  });

  router.get("/api/:id", async (req, res) => {
    if (module.model) {
      const col = db.collection(module.name);
      const data = await col.findOne({
        _id: req.params.id,
      });

      return res.json(data);
    } else {
      return res.status(404);
    }
  });

  return { router };
};
