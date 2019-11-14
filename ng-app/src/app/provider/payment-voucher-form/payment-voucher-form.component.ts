import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from 'src/app/templates/dialog-form/dialog-form.component';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

enum PaymentVoucherStatus {
    Open,
    Sent,
    Paid,
    Closed
}

@Component({
    selector: 'app-payment-voucher-form',
    templateUrl: './payment-voucher-form.component.html',
    styleUrls: ['./payment-voucher-form.component.css']
})
export class PaymentVoucherFormComponent implements OnInit {
    formData: any = {};
    includes = ['provider', 'receipt', 'event'];
    fields = [
        { name: 'provider', type: 'ref', required: true },
        { name: 'eventPlan', type: 'ref', required: true },
        { name: 'status', type: 'enum', enum: PaymentVoucherStatus, default: PaymentVoucherStatus[PaymentVoucherStatus.Open] },
        {
            name: 'lines',
            type: 'table',
            add: array => {
                this.addItem(array);
            },
            displayName: 'Payment Voucher Items',
            childName: 'Payment Voucher Item',
            default: [],
            fields: [
                { name: 'name', type: 'string', required: true },
                { name: 'unit', type: 'string', required: true },
                { name: 'unitPrice', type: 'number', required: true },
                { name: 'quantity', type: 'number', required: true }
            ]
        },
        { name: 'remarks', type: 'textarea' }
    ];

    constructor(private dialog: MatDialog) {}

    ngOnInit() {}

    addItem(array) {
        const formData = { ...this.formData };

        if (!formData.provider) {
            alert('Please select a provider first!');
            return;
        }

        const queryModel = {
            type: 'provider',
            searchText: formData.provider._id,
            queryType: 'match'
        };

        const fields = [
            {
                name: 'service',
                displayName: 'Enter service name',
                type: 'ref',
                ref: 'provider-service',
                refIncludes: ['category'],
                queryModel: queryModel
            }
        ];

        const dialogRef = this.dialog.open(DialogFormComponent, {
            width: 'auto',
            minWidth: '50vw',
            maxHeight: '99vh',
            data: { fields, title: 'Add Service Item', callback: true }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) {
                return;
            }
            // do something here
            of(result)
                .pipe(
                    map(item => {
                        return [item.service, 'service'];
                    })
                )
                .subscribe(([item, propName]) => {
                    const line: any = { name: item.name, unit: item.unit, unitPrice: item.unitPrice };
                    line[propName] = item;
                    array.push(line);
                });
        });
    }
}
