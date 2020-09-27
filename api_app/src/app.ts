import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path'
dotenv.config({ path: ".env" });

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, './../../web_app/dist/web_app')));

// Routes
app.use("/api", require("./api/controllers/index"));

// Return frontend app
app.use('**', express.static(path.join(__dirname, './../../web_app/dist/web_app')))

export default app;
