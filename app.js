import express from "express";
import path from "node:path";
import fs from "node:fs/promises";

const carsPath = path.join(import.meta.dirname, "assets", "cars.json");
const carsJson = await fs.readFile(carsPath, "utf-8");
const cars = JSON.parse(carsJson);

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// GET /products
app.get("/products", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
  });
});

// GET /cars
app.get("/cars", (req, res) => {
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

app.listen(3005, () => {
  console.log(`Server is running at http://localhost:3005/`);
});
