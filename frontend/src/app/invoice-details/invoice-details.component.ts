import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  data: any;
  paymentAmount: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadInvoice(id);
  }

  loadInvoice(id: any) {
    this.http.get(`http://localhost:3000/api/invoices/${id}`)
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
      });
  }

addPayment() {
  const amount = Number(this.paymentAmount);

  if (!amount || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  this.http.post(
    `http://localhost:3000/api/invoices/${this.data.invoice.id}/payments`,
    { amount: amount }
  ).subscribe({
    next: (res) => {
      console.log("Payment success:", res);

      this.loadInvoice(this.data.invoice.id);

      this.paymentAmount = 0;
    },
    error: (err) => {
      console.error("Payment failed:", err);
    }
  });
}




  archiveInvoice() {
    this.http.post(
      `http://localhost:3000/api/invoices/${this.data.invoice.id}/archive`, {})
      .subscribe(() => this.loadInvoice(this.data.invoice.id));
  }

  restoreInvoice() {
    this.http.post(
      `http://localhost:3000/api/invoices/${this.data.invoice.id}/restore`, {})
      .subscribe(() => this.loadInvoice(this.data.invoice.id));
  }
get subtotal(): number {
  if (!this.data?.lines) return 0;

  return this.data.lines.reduce((sum: number, item: any) => {
    return sum + (Number(item.quantity) * Number(item.unitPrice));
  }, 0);
}

get taxAmount(): number {
  if (!this.data?.invoice) return 0;
  return this.subtotal * (Number(this.data.invoice.taxPercent) / 100);
}

get total(): number {
  return this.subtotal + this.taxAmount;
}

get totalPaid(): number {
  if (!this.data?.payments) return 0;

  return this.data.payments.reduce((sum: number, p: any) => {
    return sum + Number(p.amount);
  }, 0);
}

get balance(): number {
  return this.total - this.totalPaid;
}

newItem = {
  description: '',
  quantity: 1,
  unitPrice: 0
};

addLineItem() {

  if (!this.data?.items) {
    this.data.items = [];
  }

  this.data.items.push({
    description: this.newItem.description,
    quantity: this.newItem.quantity,
    unitPrice: this.newItem.unitPrice
  });

  // Reset form
  this.newItem = {
    description: '',
    quantity: 1,
    unitPrice: 0
  };
}


}
