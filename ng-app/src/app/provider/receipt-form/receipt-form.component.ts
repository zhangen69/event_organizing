import { DialogFormComponent } from './../../templates/dialog-form/dialog-form.component';
import { Component, OnInit } from '@angular/core';
import { IStandardFormField } from '../../standard/standard.interface';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-receipt-form',
    templateUrl: './receipt-form.component.html',
    styleUrls: ['./receipt-form.component.css']
})
export class ReceiptFormComponent implements OnInit {
    formData: any;
    includes = ['provider', 'supplierInvoice'];
    fields: IStandardFormField[] = [
        // { name: 'code', type: 'string', required: true },
        { name: 'provider', type: 'ref', required: true },
        { name: 'supplierInvoice', type: 'ref', refName: 'code' },
        { name: 'remarks', type: 'textarea' },
        {
            name: 'lines',
            type: 'table',
            add: array => {
                this.addReceiptItem(array);
            },
            displayName: 'Receipt Items',
            childName: 'Receipt Item',
            default: [],
            fields: [
                { name: 'name', type: 'string', reuqired: true },
                { name: 'unit', type: 'string', reuqired: true },
                { name: 'unitPrice', displayName: 'U/Price (RM)', type: 'number', reuqired: true },
                { name: 'quantity', type: 'number', reuqired: true }
            ]
        }
    ];

    constructor(private dialog: MatDialog) {}

    ngOnInit() {}

    addReceiptItem(array) {
        const formData = { ...this.formData };
        const fields = [
            {
                name: 'stockItem',
                displayName: 'Enter stock item name',
                type: 'ref'
            }
        ];

        const dialogRef = this.dialog.open(DialogFormComponent, {
            width: 'auto',
            minWidth: '50vw',
            maxHeight: '99vh',
            data: { data: formData, fields, title: 'Add Stock Item', callback: true }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) {
                return;
            }
            // do something here
            of(result)
                .pipe(
                    map(item => item.stockItem),
                    tap(({ name, unit, unitPrice }) => array.push({ name, unit, unitPrice }))
                )
                .subscribe();
        });
    }

    afterSubmit(formData) {
        const stockTransactionModel = {};

        // this.http.post('/service/stockTransaction', )
    }
}
