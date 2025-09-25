import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartyMasterComponent } from './party-master/party-master.component';
import { FirmMasterComponent } from './firm-master/firm-master.component';
import { FullComponent } from 'src/app/layouts/full/full.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { AddInvoiceComponent } from './invoice-list/add-invoice/add-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { PdfviewComponent } from './invoice-list/add-invoice/pdfview/pdfview.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { UsersComponent } from './users/users.component';
import { EWaybillComponent } from './e-waybill/e-waybill.component';
import { DataUploadComponent } from './data-upload/data-upload.component';
import { RoleGuard } from 'src/app/services/role.guard';


export const MasterRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'partymaster',
        component: PartyMasterComponent,
        data: {
          title: 'Party Master',
          urls: [
            { title: 'Master', url: '/master/partymaster' },
            { title: 'Party Master' },
          ],
        },
      },
      {
        path: 'firmmaster',
        component: FirmMasterComponent,
        data: {
          title: 'Firm Master',
          urls: [
            { title: 'Master', url: '/master/firmmaster' },
            { title: 'Firm Master' },
          ],
        },
      },
      {
        path: 'productmaster',
        component: ProductMasterComponent,
        data: {
          title: 'Product Master',
          urls: [
            { title: 'Master', url: '/master/productmaster' },
            { title: 'Product Master' },
          ],
        },
      },
      {
        path: 'invoicelist',
        component: InvoiceListComponent,
        data: {
          title: 'Invoice List',
          urls: [
            { title: 'Master', url: '/master/invoicelist' },
            { title: 'Invoice List' },
          ],
        },
      },
      {
        path: 'invoiceview',
        component: PdfviewComponent,
        data: {
          title: 'Invoice View',
          urls: [
            { title: 'Master', url: '/master/invoicelist' },
            { title: 'Invoice View' },
          ],
        },
      },
      {
        path: 'addinvoice',
        component: AddInvoiceComponent,
        data: {
          title: 'Add Invoice',
          urls: [
            { title: 'Master', url: '/master/addinvoice' },
            { title: 'Add Invoice' },
          ],
        },
      },
      {
        path: 'expenses',
        component: ExpensesComponent,
        data: {
          title: 'Expenses',
          urls: [
            { title: 'Master', url: '/master/expenses' },
            { title: 'Expenses' },
          ],
        },
      },
      {
        path: 'users',
        canActivate: [RoleGuard],
        component: UsersComponent,
        data: {
          title: 'Users',
          urls: [
            { title: 'Master', url: '/master/users' },
            { title: 'Users' },
          ],
          roles: ['Admin', 'Super Admin'],
        },
      },
      {
        path: 'e-waybill',
        component: EWaybillComponent,
        data: {
          title: 'E-way Bill',
          urls: [
            { title: 'Master', url: '/master/e-waybill' },
            { title: 'E-way Bill' },
          ],
        },
      },
      {
        path: 'dataUpload',
        component: DataUploadComponent,
        data: {
          title: 'Data Upload',
          urls: [
            { title: 'Master', url: '/master/dataUpload' },
            { title: 'Data Upload' },
          ],
        },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(MasterRoutes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
