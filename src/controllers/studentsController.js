import createHttpError from "http-errors";
import { Student } from "../models/student.js";

export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
};

export const getStudentById = async (req, res) => {
  const { studentId } = req.params;

  const student = await Student.findOne({ _id: studentId });
  // 1) Студента з таким id може не бути
  if (!student) {
    throw createHttpError(404, "Student not found");
  }

  // 2) Невалідний id
  // 6aa0432d44a5b60650c078a6
  // 6aa04401540f67560eeb185a
  // 1123
  // ObjectId

  // 3) Все добре
  res.status(200).json(student);
};

export const createStudent = async (req, res) => {
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
  // res.status(204).end();
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
