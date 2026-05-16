import { Routes } from '@angular/router';
import { Invoice } from './invoice/invoice';
import { CreateEditInvoice } from './create-edit-invoice/create-edit-invoice';

export const routes: Routes = [
    {
        path: '',
        component: Invoice,
    },
    {
        path: 'invoice',
        component: Invoice,
        pathMatch: 'full',
    },
    {
        path: 'create-edit-invoice',
        component: CreateEditInvoice,
        pathMatch: 'full',
    },
];
