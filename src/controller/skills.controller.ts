import { Request, Response } from "express";
import { CreateSkillInput } from "../schema/skills.schema";
import { createSkill } from "../service/skills.service";
import logger from "../utils/logger";

export async function createSkillHandler(
  req: Request<{}, {}, CreateSkillInput["body"]>,
  res: Response
) {
  try {
    const skill = await createSkill(req.body);
    return res.send(skill);
  } catch (error: any) {
    logger.error(error);
    return res.status(400).send(error.message);
  }
}
