import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CellType } from '../../constants';

@Component({
  selector: 'tb-mat-table',
  templateUrl: './tb-mat-table.component.html',
  styleUrls: ['./tb-mat-table.component.css'],
})
export class TbMatTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input() gridModel: any;
  @Input() dataService: any;

  totalCount = 0;
  dataSource = new MatTableDataSource<any>([]);
  defaultColumns = [];
  cellType = CellType;

  ngOnInit() {
    this.defaultColumns = this.gridModel
      .filter((g) => g.default)
      .map((g) => g.rowParameter);
    this.getGridItems();
  }

  getGridItems(event?: PageEvent) {
    this.dataService
      .getAllPartialValue(event?.pageIndex, event?.pageSize)
      .then((res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource<any>(res['data']);
        this.totalCount = res['total'];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //this.paginator.length = res['total'];
      });
  }

  get rowParameter() {
    return this.gridModel?.map((i) => i.rowParameter);
  }

  getElementFromPath(element, rowParameter) {
    rowParameter.split('.').forEach((r) => {
      element = element[r];
    });
    return element;
  }

  getElementFromList(element, rowParameter, listFilter, listRowParameter) {
    rowParameter.split('.').forEach((r) => {
      element = element[r];
    });
    const filterKey = Object.keys(listFilter)[0];
    element = element.filter((e) => e[filterKey] == listFilter[filterKey])[0];
    return element[listRowParameter];
  }
}
