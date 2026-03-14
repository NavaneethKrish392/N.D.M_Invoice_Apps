import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const InvoiceSchema = new Schema({
	InvoiceNo: {
		type: String,
	},
	InvoiceDate: {
		type: Date,
	},
	InvoiceFinancialYear: {
		type: String,
	},
	InvoiceVendorCode: {
		type: String,
	},
	InvoicePoNumber: {
		type: String,
	},
	InvoiceOwner: {
		type: String,
	},
	InvoiceIsGIWork: {
		type: Boolean,
	},
	InvoiceTitle: {
		type: String,
	},
	InvoiceWorkDetails: [
		{
			WorkIsHeader: {
				type: Boolean,
			},
			WorkDesc: {
				type: String,
			},
			WorkSAC: {
				type: String,
			},
			WorkUnit: {
				type: String,
			},
			WorkQty: {
				type: Number,
			},
			WorkRate: {
				type: Number,
			},
			WorkAction: {
				type: Number,
			},
		},
	],
	InvoiceTotal: {
		type: Number,
	},
	InvoiceCGST: {
		type: Number,
	},
	InvoiceSGST: {
		type: Number,
	},
	InvoiceGrandTotal: {
		type: Number,
	},
	InvoiceGrandTotalWords: {
		type: String,
	},
	createdOn: {
		type: Date,
		default: Date.now(),
	},
	InvoiceEmailStatus: {
		type: Boolean,
		default: false,
	},
	InvoiceEmailReceivedDate: {
		type: Date,
	},
	InvoiceAmountReceivedStatus: {
		type: Boolean,
		default: false,
	},
	InvoiceAmountReceivedDate: {
		type: Date,
	},
	InvoiceGSTReceivedStatus: {
		type: Boolean,
		default: false,
	},
	InvoiceGSTReceivedDate: {
		type: Date,
	},
	InvoiceGSTDeductedDate: {
		type: Date,
	},
});

const Invoice = model("Invoice", InvoiceSchema);

export default Invoice;
