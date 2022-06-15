import { omit } from "lodash";
import { FilterQuery, DocumentDefinition } from "mongoose";
import SkillModel, { ISkills } from "../model/skills.model";
import { IAdditionalParams } from "../routes";

export async function all(
  query: FilterQuery<ISkills>,
  additionalParams: IAdditionalParams = { page: 1, limit: 5, sort: "createdAt" }
) {
  const records = await SkillModel.find(query).lean();
  return records;
}

export async function createSkill(
  payload: DocumentDefinition<Omit<ISkills, "createdAt" | "updatedAt">>
) {
  try {
    const skill = await SkillModel.create(payload);
    return skill.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}
