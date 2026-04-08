import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  invoices: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/invoices')
      .subscribe(res => this.invoices = res);
  }

  openInvoice(id: number) {
    this.router.navigate(['/invoices', id]);
  }
  goToCreate() {
  this.router.navigate(['/create']);
  }

}
