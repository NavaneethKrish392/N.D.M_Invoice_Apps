import express from "express";

const router = express.Router();

import {
	apiTesting,
	createInvoice,
	getInvoiceList,
	getInvoiceListByID,
	updateInvoice,
	deleteInvoice,
	updateInvoiceFnYear,
	updateInvoiceStatus,
} from "../controllers/invoice_Controller";

router.get("/api", apiTesting);

router.post("/api/createInvoice", createInvoice);

router.post("/api/getInvoiceList", getInvoiceList);

router.post("/api/getInvoiceListByID", getInvoiceListByID);

router.post("/api/updateInvoice", updateInvoice);

router.post("/api/deleteInvoice", deleteInvoice);

router.post("/api/updateInvoiceFnYear", updateInvoiceFnYear);

router.post("/api/updateInvoiceStatus", updateInvoiceStatus);

export { router as invoiceRouter };
