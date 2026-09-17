import createHttpError from "http-errors";
import { Student } from "../models/student.js";

export const getStudents = async (req, res) => {
  const { page = 1, perPage = 5, minMark, gender, search } = req.query;
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const studentsQuery = Student.find();

  if (minMark) {
    studentsQuery.where("avgMark").gte(minMark);
  }

  if (gender) {
    studentsQuery.where("gender").equals(gender);
  }

  if (search) {
    studentsQuery.where({
      name: { $regex: search, $options: "i" },
    });
  }

  const [totalItems, students] = await Promise.all([
    studentsQuery.clone().countDocuments(),
    studentsQuery.skip(skip).limit(limit),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    students,
    page,
    perPage,
    totalItems,
    totalPages,
  });
};

export const getStudentById = async (req, res) => {
  const { studentId } = req.params;

  const student = await Student.findOne({ _id: studentId });
  if (!student) {
    throw createHttpError(404, "Student not found");
  }

  res.status(200).json(student);
};

export const createStudent = async (req, res) => {
  console.log("createStudent");
  const student = await Student.create(req.body);
  res.status(201).json(student);
};

export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndDelete({ _id: studentId });
  if (!student) {
    throw createHttpError(404, "Student not found");
  }

  res.status(200).json(student);
};

export const updateStudent = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndUpdate({ _id: studentId }, req.body, {
    returnDocument: "after",
  });

  if (!student) {
    throw createHttpError(404, "Student not found");
  }

  res.status(200).json(student);
};
