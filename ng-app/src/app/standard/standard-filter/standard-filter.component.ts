import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-standard-filter',
  templateUrl: './standard-filter.component.html',
  styleUrls: ['./standard-filter.component.css']
})
export class StandardFilterComponent implements OnInit {
  @Input() filterList: any;
  @Input() queryModel: any;
  @Output() refresh = new EventEmitter<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  selectedFilter: any;
  selectedFilterListerner = new Subject<any>();

  constructor() { }

  ngOnInit() {
    this.selectedFilterListerner.asObservable().subscribe(filter => {
      this.queryModel.type = filter.type;
      this.queryModel.queryType = filter.queryType;
    });
    this.selectedFilter = this.filterList[0];
    this.selectedFilterListerner.next(this.selectedFilter);
  }

  applyFilter() {
    this.refresh.emit();
  }

  onChangeFilter(filter) {
    this.selectedFilterListerner.next(filter);
  }

}
