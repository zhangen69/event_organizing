import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IQueryModel } from 'src/app/interfaces/query-model';
import { merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AuthService } from 'src/app/auth/auth.service';
import { StandardService } from 'src/app/standard/standard.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { TitleDisplayPipe } from 'src/app/pipes/title-display.pipe';

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
  @Input() actions: any[];
  @Input()
  set includes(includes: string[]) {
    this.queryModel.includes = includes || [];
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isAuth = false;
  isOneItemSelected = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  totalItems = 0;
  queryModel: IQueryModel = {
    pageSize: 10,
    currentPage: 0,
  };

  constructor(
    private service: StandardService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private titleDisplayPipe: TitleDisplayPipe,
    private currencyPipe: CurrencyPipe) {
    this.isAuth = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe(isAuth => this.isAuth = isAuth);
  }

  ngOnInit() {
    this.initial(this.domainName);
    this.displayedColumns = this.columns.map(x => x.name);
    this.displayedColumns.unshift('checkbox');
    this.displayedColumns.push('action');
    this.columns.forEach(column => {
      if (!column.displayName) {
        column.displayName = this.titleDisplayPipe.transform(column.name);
      }
    });
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
      case 'array':
        let arrayIndex = column.index || 0;

        if ((value && value.length) && column.key) {
          arrayIndex = value.findIndex((currentVal, index, arr) => {
            return currentVal[column.key] === column.keyVal;
          });
        }

        value = value && value.length && arrayIndex > -1 ? value[arrayIndex][column.fieldName] : null;
        break;
      default:

        break;
    }

    return value;
  }

  toggleItemSelection() {
    const selectedItems = this.dataSource.data.filter(x => x.selected);
    this.isOneItemSelected = selectedItems.length === 1;
  }
}
