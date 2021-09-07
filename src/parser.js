import express from "express";
import { Schema, model } from "mongosteel";
import { log } from "./logger.js";
import { ObjectId } from "mongodb";
import pluralize from "pluralize";

/**
 * @typedef FDPModel
 * @property {{
 *  type: string;
 *  id: string;
 *  displayName?: string;
 *  required?: boolean;
 *  default?: string;
 * }[]} fields
 */

/**
 * @typedef FDPModule
 * @property {string} name
 * @property {FDPModel} model
 */

/**
 * @param {FDPModule} module
 * @returns
 */
export const parseModule = (module) => {
  const router = express.Router();

  if (!module.model)
    return log.warn(`Could not find a model for ${module.name}`);

  const mSchema = new Schema(
    Object.values(module.model.fields)
      .map((field) => ({
        ...field,
        type:
          field.type === "text"
            ? "string"
            : field.type === "image"
            ? "string"
            : field.type,
      }))
      .reduce((acc, cur, i) => {
        acc[cur.id] = cur;
        return acc;
      }, {})
  );

  const m = model(module.name, mSchema);

  router.get("/", async (req, res) => {
    const data = await m.find({});

    return res.json({ data, module });
  });

  router.get("/:id", async (req, res) => {
    const data = await m.findOne({
      _id: req.params.id,
    });

    return res.json({ data, module });
  });

  router.post("/", async (req, res) => {
    const { valid, reason, res: result, badKey } = mSchema.validate(req.body);

    if (!valid)
      return res.status(400).json({
        badField: badKey,
        reason,
      });

    const data = await new m(result).save();

    return res.json({ data, module });
  });

  router.put("/:id", async (req, res) => {
    const data = await m.findOneAndUpdate(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        ...req.body,
      }
    );

    return res.json({ data, module });
  });

  router.delete("/:id", async (req, res) => {
    const data = await m.findOneAndDelete({
      _id: req.params.id,
    });

    return res.json({ data, module });
  });

  return { router };
};
