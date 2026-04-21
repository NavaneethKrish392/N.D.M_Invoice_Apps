import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { InvoiceHeader } from '../invoice-header/invoice-header';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormGroup, FormBuilder, FormControl, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
    selector: 'app-create-edit-invoice',
    imports: [
        CommonModule,
        InvoiceHeader,
        MatIconModule,
        ReactiveFormsModule,
        MatTableModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatButtonModule,
        MatTooltipModule
    ],
    templateUrl: './create-edit-invoice.html',
    styleUrl: './create-edit-invoice.scss',
})

export class CreateEditInvoice {

    displayedColumns: string[] = ['slNo', 'isHeader', 'description', 'sacHsn', 'unit', 'qty', 'rate', 'amount', 'actions'];
    dataSource = new MatTableDataSource<any>();
    workTitle = signal('');
    isLoading = true;

    pageNumber: number = 1;
    isEditableNew: boolean = true;
    invoiceForm!: FormGroup;
    constructor(
        private fb: FormBuilder,
        private _formBuilder: FormBuilder) { }

    ngOnInit(): void {


        this.invoiceForm = this._formBuilder.group({
            invoiceRows: this._formBuilder.array([])
        });

        this.invoiceForm = this.fb.group({
            workTitle: new FormControl(''),
            invoiceRows: this.fb.array([].map(val => this.fb.group({
                slNo: new FormControl(1),
                isHeader: new FormControl(''),
                description: new FormControl(''),
                sacHsn: new FormControl(''),
                unit: new FormControl(''),
                qty: new FormControl(false),
                rate: new FormControl(true),
                amount: new FormControl(true)
            })
            ))
        });
        this.addInvoiceRow();
        this.isLoading = false;
        this.dataSource = new MatTableDataSource((this.invoiceForm.get('invoiceRows') as FormArray).controls);
    }

    addInvoiceRow() {
        const control = this.invoiceForm.get('invoiceRows') as FormArray;
        control.push(this.initiateVOForm());
        this.dataSource = new MatTableDataSource(control.controls);
        this.dataSource.data = [...this.dataSource.data];
        this.recalculateSerialNumbers();
    }

    // this function will enabled the select field for editd
    EditSVO(invoiceFormElement: any, i: any) {

        // invoiceFormElement.get('invoiceRows').at(i).get('name').disabled(false)
        invoiceFormElement.get('invoiceRows').at(i).get('isEditable').patchValue(false);
        // this.isEditableNew = true;

    }

    // On click of correct button in table (after click on edit) this method will call
    SaveVO(invoiceFormElement: any, i: any) {
        // alert('SaveVO')
        invoiceFormElement.get('invoiceRows').at(i).get('isEditable').patchValue(true);
    }

    // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
    CancelSVO(invoiceFormElement: any, i: any) {
        invoiceFormElement.get('invoiceRows').at(i).get('isEditable').patchValue(true);
    }

    deleteSVO(invoiceFormElement: any, i: any) {
        if (this.dataSource.data.length === 1) {

        } else {
            const control = this.invoiceForm.get('invoiceRows') as FormArray;
            control.removeAt(i);
            this.dataSource = new MatTableDataSource(control.controls);
            this.dataSource.data = [...this.dataSource.data];
            this.recalculateSerialNumbers();
        }
    }



    initiateVOForm(): FormGroup {
        return this.fb.group({
            slNo: new FormControl(1),
            isHeader: new FormControl(false),
            description: new FormControl(''),
            sacHsn: new FormControl('995470'),
            unit: new FormControl('Sq.ft'),
            qty: new FormControl('0.00'),
            rate: new FormControl('0.00'),
            amount: new FormControl('0.00'),
            isEditable: new FormControl(true),
            descError: new FormControl(''),
            unitError: new FormControl(''),
            qtyError: new FormControl(''),
            rateError: new FormControl('')
        });
    }

    recalculateSerialNumbers() {
        const control = this.invoiceForm.get('invoiceRows') as FormArray;
        let serial = 1;

        control.controls.forEach((row, index) => {
            const isHeader = row.get('isHeader')?.value;

            if (isHeader) {
                row.get('slNo')?.patchValue('');
            } else {
                row.get('slNo')?.patchValue(serial++);
            }
        });
    }

    handleCheckbox(index: number) {
        this.recalculateSerialNumbers();
    }

    getActionButtons(index: number): { showAdd: boolean; showDelete: boolean } {
        const control = this.invoiceForm.get('invoiceRows') as FormArray;
        const totalRows = control.length;

        if (totalRows === 1) {
            // Only 1 row: show add button only
            return { showAdd: true, showDelete: false };
        } else if (index === totalRows - 1) {
            // Last row: show both add and delete
            return { showAdd: true, showDelete: true };
        } else {
            // Other rows: show delete only
            return { showAdd: false, showDelete: true };
        }
    }

    calculateTotal(): string {
        const control = this.invoiceForm.get('invoiceRows') as FormArray;
        let total = 0;

        control.controls.forEach((row) => {
            const qty = parseFloat(row.get('qty')?.value) || 0;
            const rate = parseFloat(row.get('rate')?.value) || 0;
            total += qty * rate;
        });

        return total.toFixed(2);
    }

    calculateCGST(): string {
        const total = parseFloat(this.calculateTotal());
        const cgst = total * 0.09;
        return cgst.toFixed(2);
    }

    calculateSGST(): string {
        const total = parseFloat(this.calculateTotal());
        const sgst = total * 0.09;
        return sgst.toFixed(2);
    }

    calculateGrandTotal(): number {
        const total = parseFloat(this.calculateTotal());
        const cgst = parseFloat(this.calculateCGST());
        const sgst = parseFloat(this.calculateSGST());
        return total + cgst + sgst;
    }

    convertToWords(num: number): string {
        const a = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX',
            'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE',
            'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN',
            'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'
        ];
        const b = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY',
            'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'
        ];

        const numToWords = (n: number, suffix: string): string => {
            if (n === 0) return '';
            if (n < 20) return a[n] + ' ' + suffix;
            return b[Math.floor(n / 10)] + ' ' + a[n % 10] + ' ' + suffix;
        };

        const convertNumberToWords = (n: number): string => {
            if (n === 0) return 'ZERO RUPEES ONLY';
            let str = '';
            const crore = Math.floor(n / 10000000);
            n %= 10000000;
            const lakh = Math.floor(n / 100000);
            n %= 100000;
            const thousand = Math.floor(n / 1000);
            n %= 1000;
            const hundred = Math.floor(n / 100);
            const rest = n % 100;

            if (crore) str += numToWords(crore, 'CRORE ');
            if (lakh) str += numToWords(lakh, 'LAKH ');
            if (thousand) str += numToWords(thousand, 'THOUSAND ');
            if (hundred) str += a[hundred] + ' HUNDRED ';
            if (rest) {
                if (str !== '') str += 'AND ';
                str += numToWords(rest, '');
            }
            return str.trim();
        };

        const number = Math.floor(num);
        const paise = Math.round((num - number) * 100);

        let words = convertNumberToWords(number) + ' RUPEES';
        if (paise > 0) {
            words += ' AND ' + convertNumberToWords(paise) + ' PAISE';
        }
        words += ' ONLY';
        return words.toUpperCase();
    }

    calculateAmount(index: number) {
        const control = this.invoiceForm.get('invoiceRows') as FormArray;
        const row = control.at(index);
        const qty = parseFloat(row.get('qty')?.value) || 0;
        const rate = parseFloat(row.get('rate')?.value) || 0;
        const amount = qty * rate;
        row.get('amount')?.patchValue(amount.toFixed(2), { emitEvent: false });
    }
}
