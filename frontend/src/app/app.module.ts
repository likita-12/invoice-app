import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceDetailsComponent,
    InvoiceListComponent,
    DashboardComponent,
    CreateInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
