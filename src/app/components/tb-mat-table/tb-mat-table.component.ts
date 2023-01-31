import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
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
export class TbMatTableComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input() showColumnSelector: boolean;
  @Input() showPaginator: boolean;
  @Input() gridModel: any;
  @Input() dataService: any;
  @Input() activeSort: Sort;
  @Input() dataSource: any;
  @Output() selectionChange = new EventEmitter();

  totalCount = 0;
  defaultColumns = [];
  cellType = CellType;
  selection = new SelectionModel<any>(true, []);

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>([]);
    this.defaultColumns = this.gridModel
      .filter((g) => g.default)
      .map((g) => g.rowParameter);

    if (this.dataService) {
      this.getGridItems();
    }

    this.selection.changed.subscribe(() => {
      this.selectionChange.emit(this.selection.selected);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    if (changes.dataSource) {
      this.dataSource = new MatTableDataSource<any>(this.dataSource);
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy() {
    this.selection.changed.unsubscribe();
  }

  getGridItems(event?: PageEvent, sortEvent?: Sort) {
    this.activeSort = sortEvent;
    //console.log(event);
    //console.log(sortEvent);
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
