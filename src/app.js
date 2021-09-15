import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import industriaRoutes from "./routes/industria";

const app = express()

// Settings
app.set("pkg", pkg);
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

app.use("/industrialProtocol", industriaRoutes);

export default app;