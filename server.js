import { readFileSync } from "node:fs";
import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { errors } from "celebrate";
import { connectMongoDB } from "./src/db/connectMongoDB.js";
import { notFoundHandler } from "./src/middleware/notFoundHandler.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import studentsRoutes from "./src/routes/studentsRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

const swaggerDocument = JSON.parse(
  readFileSync(new URL("./swagger.json", import.meta.url), "utf-8"),
);

const app = express();

app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(authRoutes);
app.use(studentsRoutes);
app.use(userRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}/`);
});
