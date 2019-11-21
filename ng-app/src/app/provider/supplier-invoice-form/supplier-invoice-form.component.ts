import { Component, OnInit } from '@angular/core';
import { IStandardFormField } from 'src/app/standard/standard.interface';
import { DialogFormComponent } from 'src/app/templates/dialog-form/dialog-form.component';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

enum SupplierInvoiceStatus {
  Open,
  Confirmed,
  Paid,
  Closed,
  Cancelled
}

enum SupplierInvoicePeriod {
  Immediate,
  ThirtyDays,
  SixtyDays,
  NinetyDays
}

enum SupplierInvoiceType {
  ServiceInvoice,
  RentFacility
}

@Component({
  selector: 'app-supplier-invoice-form',
  templateUrl: './supplier-invoice-form.component.html',
  styleUrls: ['./supplier-invoice-form.component.css']
})
export class SupplierInvoiceFormComponent implements OnInit {
  formData: any = {};
  includes: string[] = ['store', 'provider', 'eventPlan'];
  fields: IStandardFormField[] = [
    { name: 'provider', type: 'ref', required: true },
    // { name: 'store', type: 'ref', required: true },
    { name: 'eventPlan', type: 'ref', required: true },
    {
      name: 'status',
      type: 'enum',
      enum: SupplierInvoiceStatus,
      default: SupplierInvoiceStatus[SupplierInvoiceStatus.Open],
      required: true
    },
    {
      name: 'period',
      type: 'enum',
      enum: SupplierInvoicePeriod,
      default: SupplierInvoicePeriod[SupplierInvoicePeriod.ThirtyDays],
      required: true
    },
    { name: 'remarks', type: 'textarea' },
    {
      name: 'lines',
      type: 'table',
      add: array => {
        this.addItem(array);
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

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['eventPlan']) {
        const getEventPlan$ = this.http.get<{ data }>(environment.apiUrl + '/service/event-plan/' + params['eventPlan']).subscribe({
          next: ({ data }) => {
            this.formData.eventPlan = data;
          },
          complete: () => {
            getEventPlan$.unsubscribe();
          }
        });
      }
    });
  }

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

    const fields: IStandardFormField[] = [
      {
        name: 'type',
        type: 'enum',
        enum: SupplierInvoiceType,
        default: SupplierInvoiceType[SupplierInvoiceType.ServiceInvoice],
        required: true
      },
      {
        name: 'service',
        displayName: 'Enter service name',
        type: 'ref',
        ref: 'provider-service',
        refIncludes: ['category'],
        queryModel: queryModel,
        isShow: item => item.type === SupplierInvoiceType[SupplierInvoiceType.ServiceInvoice]
      },
      {
        name: 'facility',
        displayName: 'Enter facility name',
        type: 'ref',
        ref: 'provider-facility',
        refIncludes: ['category'],
        queryModel: queryModel,
        isShow: item => item.type === SupplierInvoiceType[SupplierInvoiceType.RentFacility]
      }
    ];

    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: 'auto',
      minWidth: '50vw',
      maxHeight: '99vh',
      disableClose: true,
      data: { data: formData, fields, title: 'Add Service Item', callback: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      // do something here
      of(result)
        .pipe(
          map(item => {
            if (item.type === SupplierInvoiceType[SupplierInvoiceType.RentFacility]) {
              return [item.facility, 'facility'];
            } else if (item.type === SupplierInvoiceType[SupplierInvoiceType.ServiceInvoice]) {
              return [item.service, 'service'];
            }
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
