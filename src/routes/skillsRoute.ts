import express, { Request, Response } from "express";
import { createSkillHandler } from "../controller/skills.controller";
import ValidateResource from "../middleware/validateResource";
import { createSkillSchema } from "../schema/skills.schema";

const skillsRoutes = express.Router();

skillsRoutes.post("/", ValidateResource(createSkillSchema), createSkillHandler);

export default skillsRoutes;
