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
    Service,
    Facility
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
              this.addReceiptItem(array);
            },
            displayName: 'Supplier Invoice Items',
            childName: 'Supplier Invoice Item',
            default: [],
            fields: [
                { name: 'name', type: 'string', required: true },
                { name: 'unit', type: 'string', required: true },
                { name: 'unitPrice', type: 'number', required: true },
                { name: 'quantity', type: 'number', required: true }
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
              type: 'ref',
              refIncludes: ['category']
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
                  tap(stockItem =>
                      array.push({ stockItem: stockItem, name: stockItem.name, unit: stockItem.unit, unitPrice: stockItem.unitPrice })
                  )
              )
              .subscribe();
      });
  }

}
