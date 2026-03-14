export interface InvoiceModel {
    _id?: string;
    InvoiceNo: string;
    InvoiceDate: string;
    InvoiceVendorCode: string;
    InvoicePoNumber: string;
    InvoiceOwner: string;
    InvoiceTitle: string;
    InvoiceWorkDetails: [
        {
            WorkIsHeader: boolean;
            WorkDesc: string;
            WorkSAC: string;
            WorkUnit: string;
            WorkQty: number;
            WorkRate: number;
            _id?: string;
        }
    ];
    InvoiceTotal: number;
    InvoiceCGST: number;
    InvoiceSGST: number;
    InvoiceGrandTotal: number;
    InvoiceGrandTotalWords: string;
    createdOn: string;
}

export interface InvoiceResponseModel {
    status: string;
    record_count: number;
    records: Array<InvoiceModel>;
}
