import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EventEmitter } from 'events';
import { StandardListComponent } from 'src/app/standard/standard-list/standard-list.component';

@Component({
    selector: 'app-supplier-invoice-list',
    templateUrl: './supplier-invoice-list.component.html',
    styleUrls: ['./supplier-invoice-list.component.css']
})
export class SupplierInvoiceListComponent implements OnInit {
    actions = [
        {
            name: 'Send',
            format: 'function',
            function: item => this.updateStatus(item, 'Sent'),
            show: item => item.status === 'Open' && item.status !== 'Sent'
        },
        {
            name: 'Receive',
            format: 'function',
            function: item => this.updateStatus(item, 'Received'),
            show: item => item.status === 'Sent' && item.status !== 'Received'
        },
        {
            name: 'Paid',
            format: 'function',
            function: item => this.updateStatus(item, 'Paid'),
            show: item => item.status === 'Received' && item.status !== 'Paid'
        },
        {
            name: 'Close',
            format: 'function',
            function: item => this.updateStatus(item, 'Closed'),
            show: item => item.status !== 'Closed' && item.status === 'Paid'
        }
    ];
    columns: IStandardColumn[] = [
        { name: 'code' },
        { name: 'provider.name', displayName: 'Provider' },
        { name: 'status' },
        { name: 'remarks' },
        { name: 'audit.updatedDate', displayName: 'Updated', type: 'date' }
    ];
    filterList = [{ type: 'name', display: 'Name', queryType: 'string' }];
    refresh = new EventEmitter();

    @ViewChild('standardList', { static: true })
    AppStandardList: StandardListComponent;

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit() {}

    updateStatus(item, status: string) {
        const formData = { ...item };
        formData.status = status;

        const update$ = this.http.put(environment.apiUrl + '/service/supplier-invoice', formData);
        const transactionApis$ = [];

        if (formData.status === 'Received') {
            item.lines.forEach(line => {
                const stockTransactionModel = {
                    quantity: line.quantity,
                    stockItem: line.stockItem._id,
                    store: item.store,
                    event: null,
                    receipt: item._id,
                    type: 'StockIn',
                    stockItemName: line.stockItem.name,
                    stockItemUnit: line.stockItem.unit,
                    stockItemUnitPrice: line.stockItem.unitPrice,
                    stockItemCategory: line.stockItem.category
                };
                transactionApis$.push(this.http.post(environment.apiUrl + '/service/stock-transaction', stockTransactionModel));
            });
        }

        update$.subscribe(() => {
            if (transactionApis$.length > 0) {
                forkJoin(transactionApis$).subscribe(() => {
                    // window.location.reload();
                    this.AppStandardList.fetchAll();
                });
            } else {
                // window.location.reload();
                this.AppStandardList.fetchAll();
            }
        });
    }
}
