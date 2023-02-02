import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseService } from '../services/base.service';

export class TbMatTableBaseDirective {
  dataSource: MatTableDataSource<any>;
  activeSort: Sort;
  pagination: PageEvent;
  totalCount: number;
  
  constructor(protected dataService: BaseService) {}

  getGridItems(event?: PageEvent, sortEvent?: Sort) {
    this.activeSort = sortEvent;
    this.pagination = event;
    this.dataService
      .getAllPartialValue(event?.pageIndex, event?.pageSize)
      .then((res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource<any>(res['data']);
        this.totalCount = res['data']['count'];
      });
  }
}
