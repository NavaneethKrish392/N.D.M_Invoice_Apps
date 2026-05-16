import express from "express";
import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";
import { invoiceRouter } from "./routers/router";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
mongoose.Promise = global.Promise;

// Use MONGO_URI from environment (Atlas). Falls back to local DB for development.

// const mongoUri =
// 	process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ndmInvoiceDB";

const mongoUri = "mongodb://127.0.0.1:27017/ndmInvoiceDB";
if (process.env.NODE_ENV !== "test") {
	mongoose
		.connect(mongoUri)
		.then(() => console.log("MongoDB connected Successfully"))
		.catch((err) => console.error("MongoDB connection error:", err));
}

app.use(json({ limit: "50mb" }));
app.use(urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "", "public")));
app.use(express.static(path.join(__dirname, "public")));
app.use(invoiceRouter);
// app.get("/", (req, res) => {
// 	res.sendFile(path.join(__dirname, "", "public"));
// });

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

export { app as ndmInvoiceApp };
