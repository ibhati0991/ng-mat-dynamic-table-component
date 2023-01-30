import { SelectionModel } from '@angular/cdk/collections';
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
export class TbMatTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input() gridModel: any;
  @Input() dataService: any;
  activeSort: Sort;
  totalCount = 0;
  dataSource: MatTableDataSource<any>;
  defaultColumns = [];
  cellType = CellType;

  ngOnInit() {
    this.defaultColumns = this.gridModel
      .filter((g) => g.default)
      .map((g) => g.rowParameter);
    this.getGridItems();
  }

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

  get rowParameter() {
    return this.gridModel?.map((i) => i.rowParameter);
  }

  getElementFromPath(element, rowParameter) {
    rowParameter.split('.').forEach((r) => {
      element = element[r];
    });
    return element;
  }

  getConcatinatedElementFromPath(element, g) {
    let rowItem = element;
    g.rowParameter.split('.').forEach((r) => {
      rowItem = rowItem[r];
    });
    let concatData;
    g.concatRowParameter.forEach((cr) => {
      let concatItem = element;
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

  selection = new SelectionModel<any>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
    console.log(this.selection.selected);
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
