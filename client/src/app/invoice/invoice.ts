import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceModel, InvoiceResponseModel } from '../models/invoice.model';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-invoice',
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        FormsModule,
        MatDatepickerModule,
    ],
    templateUrl: './invoice.html',
    styleUrl: './invoice.scss',
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
            ),
        ]),
    ],
    providers: [provideNativeDateAdapter()],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Invoice implements OnInit, AfterViewInit {
    public selectedFY: any;
    public financialYears: Array<any> = [
        {
            name: 'Choose Invoice Financial Year',
            value: '',
        },
        {
            name: 'All',
            value: 'All',
        },
        {
            name: '2020-21',
            value: '2020-21',
        },
        {
            name: '2021-22',
            value: '2021-22',
        },
        {
            name: '2022-23',
            value: '2022-23',
        },
        {
            name: '2023-24',
            value: '2023-24',
        },
        {
            name: '2024-25',
            value: '2024-25',
        },
        {
            name: '2025-26',
            value: '2025-26',
        },
        {
            name: '2026-27',
            value: '2026-27',
        },
    ];
    public startDate: any;
    public endDate: any;
    public dateRange: any;
    public displayedColumnValues: string[] = [];
    public childDisplayedColumnValues: string[] = [];
    public dataSource: MatTableDataSource<InvoiceModel> =
        new MatTableDataSource();

    public columnsToDisplay = [
        {
            columnTitle: '',
            columnValue: 'action',
        },
        {
            columnTitle: 'Invoice No',
            columnValue: 'InvoiceNo',
        },
        {
            columnTitle: 'Invoice Date',
            columnValue: 'InvoiceDate',
        },
        {
            columnTitle: 'Invoice Owner',
            columnValue: 'InvoiceOwner',
        },
        {
            columnTitle: 'Invoice Title',
            columnValue: 'InvoiceTitle',
        },
        {
            columnTitle: 'Invoice Total',
            columnValue: 'InvoiceTotal',
        },
        {
            columnTitle: 'Invoice CGST',
            columnValue: 'InvoiceCGST',
        },
        {
            columnTitle: 'Invoice SGST',
            columnValue: 'InvoiceSGST',
        },
        {
            columnTitle: 'Invoice Grand Total',
            columnValue: 'InvoiceGrandTotal',
        },
    ];

    public childColumnToDisplay = [
        {
            columnTitle: 'Description',
            columnValue: 'WorkDesc',
        },
        {
            columnTitle: 'SAC / HSN',
            columnValue: 'WorkSAC',
        },
        {
            columnTitle: 'Unit',
            columnValue: 'WorkUnit',
        },
        {
            columnTitle: 'Qty',
            columnValue: 'WorkQty',
        },
        {
            columnTitle: 'Rate',
            columnValue: 'WorkRate',
        },
        {
            columnTitle: 'Amount',
            columnValue: 'WorkAmount',
        },
    ];

    public expandedElement!: InvoiceModel;
    @ViewChild(MatPaginator) public paginator!: MatPaginator;
    @ViewChild(MatSort) public sort!: MatSort;

    private router = inject(Router);
    private invoiceSercice = inject(InvoiceService);

    constructor() {
        this.displayedColumnValues = this.columnsToDisplay.map(
            (col) => col.columnValue,
        );

        this.childDisplayedColumnValues = this.childColumnToDisplay.map(
            (col) => col.columnValue,
        );
    }

    ngOnInit() {
        this.selectedFY = this.getCurrentFinancialYear();
        const payLoad = {
            InvoiceFinancialYear: this.selectedFY,
        };
        this.getAllInvoiceData(payLoad);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public getCurrentFinancialYear() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        let startYear, endYear;
        if (month >= 3) {
            startYear = year;
            endYear = year + 1;
        } else {
            startYear = year - 1;
            endYear = year;
        }
        return `${startYear}-${String(endYear).slice(-2)}`;
    }

    public getAllInvoiceData(payLoad: any) {
        this.invoiceSercice
            .getAllInvoiceDetails(payLoad)
            .subscribe((res: InvoiceResponseModel) => {
                if (
                    res.records?.length > 0
                ) {
                    this.dataSource = new MatTableDataSource(
                        res.records as InvoiceModel[],
                    );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                } else {
                    this.dataSource = new MatTableDataSource(
                        [] as InvoiceModel[],
                    );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                }
            });
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public onStartDateChange(event: any) {
        this.startDate = event.value;
    }

    public onEndDateChange(event: any) {
        this.endDate = event.value;
    }

    public onSearch() {
        if (this.selectedFY) {
            const payLoad: any = {
                InvoiceFinancialYear: this.selectedFY,
            };

            if (this.startDate && this.endDate) {
                const parseToUTCISOString = (input: any) => {
                    const d = input instanceof Date ? input : new Date(input);
                    const y = d.getFullYear();
                    const m = d.getMonth();
                    const day = d.getDate();
                    return new Date(Date.UTC(y, m, day)).toISOString();
                };

                payLoad.startDate = parseToUTCISOString(this.startDate);
                payLoad.endDate = parseToUTCISOString(this.endDate);
            }
            this.getAllInvoiceData(payLoad);
        }
    }

    public onClear() {
        this.startDate = null;
        this.endDate = null;
        this.selectedFY = this.getCurrentFinancialYear();
        const payLoad = {
            InvoiceFinancialYear: this.getCurrentFinancialYear(),
        };
        this.getAllInvoiceData(payLoad);
    }

    createNewInvoice() {
        this.router.navigate(['/create-edit-invoice']);
    }
}
