import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})

export class CreateInvoiceComponent {

  invoice = {
    invoiceNumber: '',
    customerName: '',
    taxPercent: 18
  };

  constructor(private http: HttpClient, private router: Router) {}

  create() {
    this.http.post('http://localhost:3000/api/invoices', this.invoice)
      .subscribe(() => this.router.navigate(['/']));
  }
}
