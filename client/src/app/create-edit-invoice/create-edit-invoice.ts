import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InvoiceHeader } from '../invoice-header/invoice-header';

@Component({
    selector: 'app-create-edit-invoice',
    imports: [
        CommonModule,
        InvoiceHeader
    ],
    templateUrl: './create-edit-invoice.html',
    styleUrl: './create-edit-invoice.scss',
})

export class CreateEditInvoice {

}
