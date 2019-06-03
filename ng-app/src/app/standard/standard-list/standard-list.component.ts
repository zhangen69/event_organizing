import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IQueryModel } from 'src/app/interfaces/query-model';
import { Subject, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { StandardService } from 'src/app/services/standard.service';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-standard-list',
  templateUrl: './standard-list.component.html',
  styleUrls: ['./standard-list.component.css']
})
export class StandardListComponent implements OnInit, AfterViewInit {
  @Input() columns: any[];
  @Input() filterList: any[];
  @Input() domainName: string;
  @Input() title: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isAuth = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  totalItems = 0;
  queryModel: IQueryModel = {
    pageSize: 10,
    currentPage: 0,
  };
  selectedFilter: any;
  selectedFilterListerner = new Subject<any>();

  constructor(
    private service: StandardService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe) {
    this.isAuth = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe(isAuth => this.isAuth = isAuth);
    this.selectedFilterListerner.asObservable().subscribe(filter => {
      this.queryModel.type = filter.type;
      this.queryModel.queryType = filter.queryType;
    });
  }

  ngOnInit() {
    this.initial(this.domainName);
    this.selectedFilter = this.filterList[0];
    this.selectedFilterListerner.next(this.selectedFilter);
    this.displayedColumns = this.columns.map(x => x.name);
    this.displayedColumns.push('action');
    this.fetchAll();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.queryModel.currentPage = this.paginator.pageIndex;
      this.fetchAll();
    });
  }

  initial(domainName) {
    this.service.init(domainName, this.queryModel);
  }

  fetchAll() {
    return this.service.fetchAll(this.queryModel).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<any>(res.data);
      this.totalItems = res.totalItems;
    });
  }

  onChangeFilter(filter) {
    this.selectedFilterListerner.next(filter);
  }

  delete(item) {
    this.service.delete(item);
  }

  sortData(sort: Sort) {
    this.service.sort(sort);
  }

  applyFilter() {
    this.fetchAll().add(() => this.paginator.firstPage());
  }

  getValue(item, column) {
    let value = item[column.name];

    if (column.name.includes('.')) {
      let thisVal = item;
      column.name.split('.').forEach(ele => {
        thisVal = thisVal[ele];
      });
      value = thisVal;
    }

    switch (column.type) {
      case 'date':
        value = this.datePipe.transform(value, column.format || 'hh:mm a, dd-MM-yyyy');
        break;
      case 'currency':
          value = this.currencyPipe.transform(value);
        break;
      default:

        break;
    }

    return value;
  }
}
