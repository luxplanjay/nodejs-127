import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

const carsPath = path.join(import.meta.dirname, "assets", "cars.json");
const carsJson = await fs.readFile(carsPath, "utf-8");
const cars = JSON.parse(carsJson);

const app = express();

app.use(cors({ origin: "*" }));
app.use(helmet());

app.use((req, res, next) => {
  console.log("Middleware A", req.method, req.url);
  next();
});

app.use((req, res, next) => {
  console.log("Request time", new Date().toLocaleTimeString());
  next();
});

app.get("/", (req, res) => {
  throw new Error("Very bad error!");
});

// GET /cars
app.get("/cars", (req, res) => {
  console.log("app.get cars");
  res.status(200).json({ cars });
});

// GET /cars/:carId
app.get("/cars/:carId", (req, res) => {
  const car = cars.find((c) => c.id === req.params.carId);
  if (!car) {
    res.status(404).json({ message: "Car not found" });
  }

  res.status(200).json(car);
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd ? err.message : err.stack,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}/`);
});
