import { object, string, TypeOf } from "zod";

export const createSkillSchema = object({
  body: object({
    description: string({
      required_error: "description is required field",
    })
      .trim()
      .min(1, { message: "description can't be empty" }),
    type: string({
      required_error: "type is required field",
    })
      .trim()
      .min(1, { message: "type can't be empty" }),
  }),
});

export type CreateSkillInput = TypeOf<typeof createSkillSchema>;
