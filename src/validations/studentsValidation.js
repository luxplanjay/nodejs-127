import { Segments, Joi } from "celebrate";
import { isValidObjectId } from "mongoose";

export const getAllStudentsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1),
    perPage: Joi.number().min(5).max(20),
  }),
};

export const createStudentSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(250).required(),
    age: Joi.number().integer().min(6).required(),
    onDuty: Joi.boolean(),
    avgMark: Joi.number().min(1).required(),
    gender: Joi.string().valid("male", "female", "other").required(),
  }),
};

const objectIdValidator = (value, helpers) => {
  // ✅
  if (isValidObjectId(value)) {
    return value;
  }
  // ❌
  return helpers.message("Invalid id format");
};

export const studentIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    studentId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateStudentSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(250),
    age: Joi.number().integer().min(6),
    onDuty: Joi.boolean(),
    avgMark: Joi.number().min(1),
    gender: Joi.string().valid("male", "female", "other"),
  }).min(1),
  ...studentIdParamSchema,
};
