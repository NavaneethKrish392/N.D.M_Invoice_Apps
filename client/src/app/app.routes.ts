import { Routes } from '@angular/router';
import { Invoice } from './invoice/invoice';

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
];
