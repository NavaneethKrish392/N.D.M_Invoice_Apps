import express from "express";
import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";
import { invoiceRouter } from "./routers/router";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== "test") {
	mongoose
		.connect("mongodb://localhost:27017/ndmInvoiceDB")
		.then(() => console.log("MongoDB connected Successfully"));
		.catch((err) => console.error("MongoDB connection error:", err));
}

app.use(json({ limit: "50mb" }));
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "", "public")));
app.use(invoiceRouter);
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "", "public"));
});

export { app as ndmInvoiceApp };
