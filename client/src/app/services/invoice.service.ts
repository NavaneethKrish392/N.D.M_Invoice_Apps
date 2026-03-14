import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InvoiceModel, InvoiceResponseModel } from '../models/invoice.model';

@Injectable({
    providedIn: 'root',
})
export class InvoiceService {
    public domailUrl = 'http://localhost:8080/';
    constructor(public http: HttpClient) {}

    public getAllInvoiceDetails(paylaod: any): Observable<InvoiceResponseModel> {
        const url = this.domailUrl + 'api/getInvoiceList';
        return this.http.post<InvoiceResponseModel>(url, paylaod);
    }
}
