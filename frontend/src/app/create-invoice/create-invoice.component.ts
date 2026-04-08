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
    console.log("Create button clicked");   // ✅ debug log

    // Optional validation
    if (!this.invoice.customerName || !this.invoice.invoiceNumber) {
      alert("Please fill all required fields");
      return;
    }

    this.http.get('https://invoice-app-bni4.onrender.com/api/invoices', this.invoice)
      .subscribe({
        next: (res) => {
          console.log("Invoice created:", res);
          alert("Invoice created successfully ✅");

          // Navigate to home/dashboard
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error("Error creating invoice:", err);
          alert("Failed to create invoice ❌");
        }
      });
  }
}
