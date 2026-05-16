import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';


@Component({
    selector: 'app-invoice-header',
    imports: [CommonModule, MatButtonModule, MatDividerModule],
    templateUrl: './invoice-header.html',
    styleUrl: './invoice-header.scss',
})
export class InvoiceHeader {
    print(){
        window.print();
    }
}
