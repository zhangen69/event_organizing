import { IStandardDisplayField } from './../../standard/standard.interface';
import { environment } from 'src/environments/environment';
import { StandardHttpResponse } from 'src/app/standard/standard.interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  customer: any;
  invoices = [];
  invoiceDisplayFields: IStandardDisplayField[] = [
    { name: 'code', type: 'title' },
    { name: 'status' },
    { name: 'eventPlan.code', displayName: 'Event Plan Code' },
    { name: 'eventPlan.name', displayName: 'Event Plan Name' },
    { name: 'totalAmount', getValue: (item) => item.lines.reduce((acc, line) => acc + (line.quantity * line.unitPrice), 0) },
  ];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        const req$ = this.http.get<StandardHttpResponse>(environment.apiUrl + '/service/customer/' + params.id).subscribe({
          next: ({ data }) => {
            this.customer = data;
          },
          complete: () => {
            req$.unsubscribe();
          }
        });
        const invoiceQueryModel = {
          type: 'customer',
          searchText: params.id,
          queryType: 'match',
          includes: ['eventPlan']
        };
        const invoiceReq$ = this.http.get<StandardHttpResponse>(environment.apiUrl + '/service/invoice?queryModel=' + JSON.stringify(invoiceQueryModel)).subscribe({
          next: ({ data }) => {
            this.invoices = data;
          },
          complete: () => {
            invoiceReq$.unsubscribe();
          }
        });
      }
    });
  }

}
