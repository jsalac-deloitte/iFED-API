import { Request, Response } from "express";
import { CreateMetaDataInput } from "../schema/metaData.schema";
import { createMetaData, getMetaData, all } from "../service/metaData.service";
import logger from "../utils/logger";

export async function createMetaDataHandler(
  req: Request<{}, {}, CreateMetaDataInput["body"]>,
  res: Response
) {
  try {
    const metaData = await createMetaData(req.body);
    return res.send(metaData);
  } catch (error: any) {
    logger.error(error);
    return res.status(400).send(error.message);
  }
}

export async function getMetaDataHandler(req: Request, res: Response) {
  try {
    const metaData = await getMetaData(req.params.id);
    if (metaData) {
      return res.send(metaData);
    }
    return res.sendStatus(404).send("No Record found.");
  } catch (error: any) {
    logger.error(error);
    return res.status(400).send(error.message);
  }
}

export async function getAllHandler(req: Request, res: Response) {
  try {
    const list = await all(req.query);
    if (list) {
      return res.send(list);
    }
    return res.sendStatus(404).send("No Record found.");
  } catch (error: any) {
    logger.error(error);
    return res.status(400).send(error.message);
  }
}
