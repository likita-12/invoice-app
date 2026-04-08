import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  totalInvoices = 0;
  totalRevenue = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/invoices')
      .subscribe(res => {
        this.totalInvoices = res.length;
        this.totalRevenue = res.reduce((sum, i) => sum + Number(i.total), 0);
      });
  }
}
