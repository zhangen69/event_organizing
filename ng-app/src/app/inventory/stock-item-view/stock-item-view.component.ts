import { environment } from './../../../environments/environment';
import { IStandardDisplayField } from './../../standard/standard.interface';
import { ActivatedRoute } from '@angular/router';
import { StandardService } from './../../standard/standard.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-stock-item-view',
  templateUrl: './stock-item-view.component.html',
  styleUrls: ['./stock-item-view.component.css']
})
export class StockItemViewComponent implements OnInit {
  attendee: any;
  displayFields: IStandardDisplayField[] = [
    { name: 'name' },
    { name: 'category.name', displayName: 'Category' },
    { name: 'unit' },
    { name: 'unitPrice' },
    { name: 'remarks' },
  ];

  constructor(private route: ActivatedRoute, private stockItemService: StandardService, private titleService: Title) {
    this.stockItemService.init('stock-item');
    this.titleService.setTitle('View Stock Item - ' + environment.title);
  }

  ngOnInit() {
    this.route.params.subscribe((params: any[]) => {
      if (params['id']) {
        this.stockItemService.fetch(params['id'], null, ['category']).subscribe({
          next: ({ data }) => {
            this.attendee = data;
          }
        });
      }
    });
  }
}
