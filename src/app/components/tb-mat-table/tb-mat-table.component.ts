import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CellType } from '../../constants';

@Component({
  selector: 'tb-mat-table',
  templateUrl: './tb-mat-table.component.html',
  styleUrls: ['./tb-mat-table.component.css'],
})
export class TbMatTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input() gridModel: any;
  @Input() dataService: any;
  activeSort: Sort;
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

  ngAfterViewInit() {}

  getGridItems(event?: PageEvent, sortEvent?: Sort) {
    this.activeSort = sortEvent;
    console.log(event);
    console.log(sortEvent);
    this.dataService
      .getAllPartialValue(event?.pageIndex, event?.pageSize)
      .then((res) => {
        //console.log(res);
        this.dataSource = new MatTableDataSource<any>(res['data']);
        this.dataSource.sort = this.sort;
        this.totalCount = res['total'];
      });
  }

  sortData(event) {
    console.log(event);
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

  getConcatinatedElementFromPath(row, g) {
    let rowItem = row;
    g.rowParameter.split('.').forEach((r) => {
      rowItem = rowItem[r];
    });
    let concatData;
    g.concatRowParameter.forEach((cr) => {
      let concatItem = row;
      cr.split('.').forEach((r) => {
        concatItem = concatItem[r];
      });
      concatData = `${concatData || ''} ${concatItem || ''}`;
    });
    return `${rowItem || ''} ${concatData || ''}`;
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
