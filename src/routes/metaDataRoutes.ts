import express, { Request, Response } from "express";
import {
  createMetaDataHandler,
  getAllHandler,
  getMetaDataHandler,
} from "../controller/metaData.controller";
import ValidateResource from "../middleware/validateResource";
import { createMetaDataSchema } from "../schema/metaData.schema";

const metaDataRoutes = express.Router();

metaDataRoutes.post(
  "/",
  ValidateResource(createMetaDataSchema),
  createMetaDataHandler
);

metaDataRoutes.get("/:id", getMetaDataHandler);
metaDataRoutes.get("/", getAllHandler);

export default metaDataRoutes;
