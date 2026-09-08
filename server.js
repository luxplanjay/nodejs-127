import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { connectMongoDB } from "./src/db/connectMongoDB.js";
import { notFoundHandler } from "./src/middleware/notFoundHandler.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import studentsRoutes from "./src/routes/studentsRoutes.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());

app.use(studentsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}/`);
});
