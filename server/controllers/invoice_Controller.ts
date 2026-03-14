import { Request, Response, NextFunction } from "express";

import Invoice from "../models/invoice";

export const apiTesting = (req: Request, res: Response) => {
	res.send({ hi: "API Working" });
};

export const createInvoice = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const invoiceProps = req.body;
	Invoice.create(invoiceProps)
		.then((invoice) => {
			if (invoice) {
				const FinalResult = {
					status: "Success",
					invoiceNumber: invoice._id,
				};
				res.json(FinalResult);
			} else {
				const FinalResult = {
					status: "Failure",
					message: "Something Went Wrong",
				};
				res.json(FinalResult);
			}
		})
		.catch(next);
};

export const getInvoiceList = (req: Request, res: Response) => {
	let query: any = {};
	const body: any = req.body || {};
	const fnYear = body.InvoiceFinancialYear;
	const hasDates = body.startDate && body.endDate;
	if (fnYear === "All") {
		query = {};
	} else {
		query.InvoiceFinancialYear = fnYear;
	}

	if (hasDates) {
		const startDate = new Date(body.startDate);
		const endDate = new Date(body.endDate);
		endDate.setUTCHours(23, 59, 59, 999);
		query.InvoiceDate = {
			$gte: startDate,
			$lte: endDate,
		};
	}
	Invoice.find(query)
		.sort({ InvoiceNo: -1 })
		.then((invoiceList) => {
			res.json({
				status: "Success",
				record_count: invoiceList.length,
				records: invoiceList,
			});
		})
		.catch((err) => {
			res.json({
				status: "Failure",
				error: "Something Went Wrong",
			});
		});
};

export const getInvoiceListByID = (req: Request, res: Response) => {
	const invoiceReq = req.body;
	Invoice.findOne({ _id: invoiceReq._id })
		.then((invoiceList) => {
			const FinalResult = { status: "Success", records: invoiceList };
			res.json(FinalResult);
		})
		.catch((err) => {
			const FinalResult = {
				status: "Failure",
				error: "Something Went Wrong",
			};
			res.json(FinalResult);
		});
};

export const updateInvoice = (req: Request, res: Response) => {
	const invoiceId = req.body._id;

	const updateQuery = {
		InvoiceNo: req.body.InvoiceNo,
		InvoiceDate: req.body.InvoiceDate,
		InvoiceOwner: req.body.InvoiceOwner,
		InvoiceIsGIWork: req.body.InvoiceIsGIWork,
		InvoiceVendorCode: req.body.InvoiceVendorCode,
		InvoicePoNumber: req.body.InvoicePoNumber,
		InvoiceTitle: req.body.InvoiceTitle,
		InvoiceWorkDetails: req.body.InvoiceWorkDetails,
		InvoiceTotal: req.body.InvoiceTotal,
		InvoiceCGST: req.body.InvoiceCGST,
		InvoiceSGST: req.body.InvoiceSGST,
		InvoiceGrandTotal: req.body.InvoiceGrandTotal,
		InvoiceGrandTotalWords: req.body.InvoiceGrandTotalWords,
	};

	Invoice.updateOne({ _id: invoiceId }, updateQuery)
		.then((result: any) => {
			const FinalResult = {
				status: "Success",
				message: "Invoice Update Success",
			};
			res.json(FinalResult);
		})
		.catch((err) => {
			const FinalResult = {
				status: "Failure",
				error: "Something Went Wrong",
			};
			res.json(FinalResult);
		});
};

export const deleteInvoice = (req: Request, res: Response) => {
	const myQuery = { InvoiceNo: req.body.InvoiceNo };
	Invoice.deleteOne({ InvoiceNo: req.body.InvoiceNo })
		.then((result) => {
			if (result.deletedCount === 0) {
				res.status(404).json({
					status: "Failure",
					message: "Document not found",
				});
			} else {
				res.json({
					status: "Success",
					message: "Invoice deleted successfully",
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: "Failure",
				message: "Error deleting invoice",
			});
		});
};

export const updateInvoiceFnYear = (req: Request, res: Response) => {
	Invoice.updateMany(
		{ invoice_fn_year: { $exists: false } },
		{
			$set: {
				InvoiceFinancialYear: req.body.InvoiceFinancialYear,
			},
		},
		{},
	)
		.then((result) => {
			if (result.modifiedCount === 0) {
				res.status(404).json({
					status: "Failure",
					message: "Document not found",
				});
			} else {
				res.json({
					status: "Success",
					message: "Invoice updated successfully",
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: "Failure",
				message: "Error deleting invoice",
			});
		});
};

export const updateInvoiceStatus = (req: Request, res: Response) => {
	const invoiceId = req.body._id;
	const updateQuery = {
		InvoiceEmailStatus: req.body.InvoiceEmailStatus,
		InvoiceEmailReceivedDate: req.body.InvoiceEmailReceivedDate,
		InvoiceAmountReceivedStatus: req.body.InvoiceAmountReceivedStatus,
		InvoiceAmountReceivedDate: req.body.InvoiceAmountReceivedDate,
		InvoiceGSTReceivedStatus: req.body.InvoiceGSTReceivedStatus,
		InvoiceGSTReceivedDate: req.body.InvoiceGSTReceivedDate,
		InvoiceGSTDeductedDate: req.body.InvoiceGSTDeductedDate,
	};

	Invoice.updateOne({ _id: invoiceId }, { $set: updateQuery })
		.then((result) => {
			if (result.modifiedCount === 0) {
				res.status(404).json({
					status: "Failure",
					message: "Document not found",
				});
			} else {
				res.json({
					status: "Success",
					message: "Invoice status updated successfully",
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: "Failure",
				message: "Error updating invoice status",
			});
		});
};
