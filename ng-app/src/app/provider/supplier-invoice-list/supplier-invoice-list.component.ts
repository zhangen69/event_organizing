import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-supplier-invoice-list',
    templateUrl: './supplier-invoice-list.component.html',
    styleUrls: ['./supplier-invoice-list.component.css']
})
export class SupplierInvoiceListComponent implements OnInit {
    actions = [
        { name: 'Send', format: 'function', function: item => this.updateStatus(item, 'Sent'), show: item => item.status === 'Open' && item.status !== 'Sent' },
        { name: 'Receive', format: 'function', function: item => this.updateStatus(item, 'Received'), show: item => item.status === 'Sent' && item.status !== 'Received' },
        { name: 'Paid', format: 'function', function: item => this.updateStatus(item, 'Paid'), show: item => item.status === 'Received' && item.status !== 'Paid' },
        { name: 'Close', format: 'function', function: item => this.updateStatus(item, 'Closed'), show: item => item.status !== 'Closed' && item.status === 'Paid' },
    ];
    columns: IStandardColumn[] = [
        { name: 'code' },
        { name: 'provider.name', displayName: 'Provider' },
        { name: 'status' },
        { name: 'remarks' },
        { name: 'audit.updatedDate', displayName: 'Updated', type: 'date' }
    ];
    filterList = [{ type: 'name', display: 'Name', queryType: 'string' }];

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit() {}

    updateStatus(item, status: string) {
        const formData = { ...item };
        formData.status = status;
        this.http.put(environment.apiUrl + '/service/supplier-invoice', formData).subscribe(() => {
            window.location.reload();
        });
    }
}
