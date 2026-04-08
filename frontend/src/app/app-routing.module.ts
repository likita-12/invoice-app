import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';

const routes: Routes = [
  { path: '', component: InvoiceListComponent },
  { path: 'invoices/:id', component: InvoiceDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create', component: CreateInvoiceComponent }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

