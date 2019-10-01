import { Component, OnInit } from '@angular/core';
import { IStandardFormField } from 'src/app/standard/standard.interface';
import { DialogFormComponent } from 'src/app/templates/dialog-form/dialog-form.component';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

enum SupplierInvoiceStatus {
    Open,
    Sent,
    Received,
    Paid,
    Closed
}

enum SupplierInvoiceType {
    ServiceInvoice,
    RentFacility,
}

@Component({
    selector: 'app-supplier-invoice-form',
    templateUrl: './supplier-invoice-form.component.html',
    styleUrls: ['./supplier-invoice-form.component.css']
})
export class SupplierInvoiceFormComponent implements OnInit {
    formData: any = {};
    fields: IStandardFormField[] = [
        // { name: 'code', type: 'string', required: true },
        { name: 'provider', type: 'ref', required: true },
        { name: 'store', type: 'ref', required: true },
        { name: 'type', type: 'enum', enum: SupplierInvoiceType, required: true },
        {
            name: 'status',
            type: 'enum',
            enum: SupplierInvoiceStatus,
            default: SupplierInvoiceStatus[SupplierInvoiceStatus.Open],
            required: true
        },
        { name: 'remarks', type: 'textarea' },
        {
            name: 'lines',
            type: 'table',
            add: array => {
                this.addServiceItem(array);
            },
            isShow: item => item.type === SupplierInvoiceType[SupplierInvoiceType.ServiceInvoice],
            displayName: 'Supplier Invoice Items',
            childName: 'Supplier Invoice Item',
            default: [],
            fields: [
                { name: 'name', type: 'string', required: true },
                { name: 'unit', type: 'string', required: true },
                { name: 'unitPrice', type: 'number', required: true },
                { name: 'quantity', type: 'number', required: true }
            ]
        },
        {
            name: 'lines',
            type: 'table',
            add: array => {
                this.addFacilityItem(array);
            },
            isShow: item => item.type === SupplierInvoiceType[SupplierInvoiceType.RentFacility],
            displayName: 'Supplier Invoice Items',
            childName: 'Supplier Invoice Item',
            default: [],
            fields: [
                { name: 'name', type: 'string', required: true },
                { name: 'unit', type: 'string', required: true },
                { name: 'unitPrice', type: 'number', required: true },
                { name: 'quantity', type: 'number', required: true }
            ]
        },
    ];

    constructor(private dialog: MatDialog) { }

    ngOnInit() { }

    addServiceItem(array) {
        const formData = { ...this.formData };
        const fields = [
            {
                name: 'service',
                displayName: 'Enter service name',
                type: 'ref',
                ref: 'provider-service',
                refIncludes: ['category']
            }
        ];

        const dialogRef = this.dialog.open(DialogFormComponent, {
            width: 'auto',
            minWidth: '50vw',
            maxHeight: '99vh',
            data: { data: formData, fields, title: 'Add Service Item', callback: true }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) {
                return;
            }
            // do something here
            of(result)
                .pipe(
                    map(item => item.service),
                    tap(service =>
                        array.push({ service: service, name: service.name, unit: service.unit, unitPrice: service.unitPrice })
                    )
                )
                .subscribe();
        });
    }

    addFacilityItem(array) {
        const formData = { ...this.formData };
        const fields = [
            {
                name: 'facility',
                displayName: 'Enter facility name',
                type: 'ref',
                ref: 'provider-facility',
                refIncludes: ['category']
            }
        ];

        const dialogRef = this.dialog.open(DialogFormComponent, {
            width: 'auto',
            minWidth: '50vw',
            maxHeight: '99vh',
            data: { data: formData, fields, title: 'Add Facility Item', callback: true }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) {
                return;
            }
            // do something here
            of(result)
                .pipe(
                    map(item => item.facility),
                    tap(facility =>
                        array.push({ facility: facility, name: facility.name, unit: facility.unit, unitPrice: facility.unitPrice })
                    )
                )
                .subscribe();
        });
    }

}
