import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Subject } from 'rxjs';
import { StandardService } from 'src/app/services/standard.service';
import { IQueryModel } from 'src/app/interfaces/query-model';
import { EventPlan } from 'src/app/models/event-plan.model';

@Component({
  selector: 'app-event-plan-list',
  templateUrl: './event-plan-list.component.html',
  styleUrls: ['./event-plan-list.component.css']
})
export class EventPlanListComponent implements OnInit, AfterViewInit {
  isAuth = false;
  dataSource: MatTableDataSource<EventPlan>;
  displayedColumns: string[] = ['name', 'totalBudgetAmount', 'remarks', 'audit.updatedDate', 'action'];
  columns: any[] = [
    { name: 'name', displayName: 'Name'},
    { name: 'totalBudgetAmount', displayName: 'Total Budget (RM)'},
    { name: 'remarks', displayName: 'Remarks'},
    { name: 'audit.updatedDate', displayName: 'Updated'},
  ];
  totalItems = 0;
  queryModel: IQueryModel = {
    pageSize: 10,
    currentPage: 0,
  };
  filterList = [
    { type: 'name', display: 'Name', queryType: 'string' },
    { type: 'price', display: 'Price', queryType: 'number' },
  ];
  selectedFilter: any;
  selectedFilterListerner = new Subject<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private service: StandardService, private authService: AuthService) {
    this.service.init('event-plan', this.queryModel);
    this.isAuth = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe(isAuth => this.isAuth = isAuth);
    this.selectedFilterListerner.asObservable().subscribe(filter => {
      this.queryModel.type = filter.type;
      this.queryModel.queryType = filter.queryType;
    });
    this.selectedFilter = this.filterList[0];
    this.selectedFilterListerner.next(this.selectedFilter);
  }

  ngOnInit() {
    this.fetchAll();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.queryModel.currentPage = this.paginator.pageIndex;
      this.fetchAll();
    });
  }

  fetchAll() {
    return this.service.fetchAll(this.queryModel).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<EventPlan>(res.data);
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

  applyFilter(queryModel: IQueryModel) {
    this.fetchAll().add(() => this.paginator.firstPage());
  }
}
