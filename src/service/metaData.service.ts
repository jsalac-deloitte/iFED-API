import { FilterQuery, DocumentDefinition } from "mongoose";
import MetaDataModel, { IMetaData } from "../model/metaData.model";
import { IAdditionalParams } from "../routes/root";

export async function all(
  query: FilterQuery<IMetaData>,
  additionalParams: IAdditionalParams = { page: 1, limit: 5, sort: "createdAt" }
) {
  const records = await MetaDataModel.find(query).lean();
  return records;
}

export async function createMetaData(
  payload: DocumentDefinition<Omit<IMetaData, "createdAt" | "updatedAt">>
) {
  try {
    const skill = await MetaDataModel.create(payload);
    return skill.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getMetaData(id: string) {
  try {
    const metaData = await MetaDataModel.findById(id);
    return metaData?.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}
