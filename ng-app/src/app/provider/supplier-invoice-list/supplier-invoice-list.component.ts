import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { StandardListComponent } from 'src/app/standard/standard-list/standard-list.component';

@Component({
    selector: 'app-supplier-invoice-list',
    templateUrl: './supplier-invoice-list.component.html',
    styleUrls: ['./supplier-invoice-list.component.css']
})
export class SupplierInvoiceListComponent implements OnInit {
    includes: string[] = ['provider', 'supplierInvoice', 'eventPlan'];
    actions = [
        {
            name: 'Confirm',
            format: 'function',
            function: item => this.updateStatus(item, 'Confirmed'),
            show: item => item.status === 'Open' && item.status !== 'Confirmed'
        },
        {
            name: 'Cancel',
            format: 'function',
            function: item => this.updateStatus(item, 'Cancelled'),
            show: item => item.status === 'Open' && item.status !== 'Cancelled'
        },
        {
            name: 'Paid',
            format: 'function',
            function: item => this.updateStatus(item, 'Paid'),
            show: item => item.status === 'Confirmed' && item.status !== 'Paid'
        },
        {
            name: 'Close',
            format: 'function',
            function: item => this.updateStatus(item, 'Closed'),
            show: item => item.status !== 'Closed' && item.status === 'Paid'
        }
    ];
    columns: IStandardColumn[] = [
        { name: 'code', width: '100px' },
        { name: 'eventPlan.name', displayName: 'Event Plan', width: '150px' },
        { name: 'provider.name', displayName: 'Provider', width: '150px' },
        { name: 'referenceNumber', width: '150px' },
        { name: 'period', width: '100px' },
        { name: 'status', width: '80px' },
        { name: 'remarks' },
        { name: 'audit.updatedDate', displayName: 'Updated', type: 'date' }
    ];
    filterList = [
        { type: 'code', display: 'Code', queryType: 'string' },
        { type: 'referenceNumber', display: 'Reference Number', queryType: 'string' },
        { type: 'status', display: 'Status', queryType: 'string' },
    ];
    refresh = new EventEmitter();

    @ViewChild('standardList', { static: true })
    AppStandardList: StandardListComponent;

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit() {}

    updateStatus(item: any, status: string) {
        const formData = { ...item };
        formData.status = status;

        this.http.put(environment.apiUrl + '/service/supplier-invoice', formData).subscribe(() => {
            this.AppStandardList.fetchAll();
        });
    }
}
