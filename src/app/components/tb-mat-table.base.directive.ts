import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseService } from '../services/base.service';

export class TbMatTableBaseDirective {
  dataSource: MatTableDataSource<any>;
  activeSort: Sort;
  pagination: PageEvent;
  totalCount: number;

  constructor(protected dataService: BaseService) {
    this.getGridItems();
  }

  getGridItems(pageEvent?: PageEvent, sortEvent?: Sort) {
    console.log(event);
    this.activeSort = sortEvent;
    this.pagination = pageEvent;
    this.dataService
      .getAllPartialValue(pageEvent?.pageIndex, pageEvent?.pageSize)
      .then((res) => {
        this.dataSource = new MatTableDataSource<any>(res['data']);
        this.totalCount = res['total'];
        console.log(this.dataSource.data);
      });
  }
}
