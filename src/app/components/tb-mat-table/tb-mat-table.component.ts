import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CellType } from '../../constants';

@Component({
  selector: 'tb-mat-table',
  templateUrl: './tb-mat-table.component.html',
  styleUrls: ['./tb-mat-table.component.css'],
})
export class TbMatTableComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit
{
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  @Input() showColumnSelector: boolean;
  @Input() showPaginator: boolean;

  @Input() primaryKey: any = 'id';

  @Input() gridModel: any;

  @Input() dataSource: MatTableDataSource<any>;
  @Input() totalCount: number = 0;

  @Input() activeSort: Sort;
  @Output() activeSortChange = new EventEmitter();

  @Input() selection: SelectionModel<any>;
  @Output() selectionChange = new EventEmitter();

  @Output() fetchMoreRecords = new EventEmitter();

  defaultColumns = [];
  cellType = CellType;

  ngOnInit() {
    this.defaultColumns = this.gridModel
      .filter((g) => g.default)
      .map((g) => g.rowParameter);

    this.selection.isSelected = this.isChecked.bind(this);

    this.selection.changed.subscribe(() => {
      this.selectionChange.emit(this.selection);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.totalCount) {
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.fetchMoreRecords.emit(this.paginator.page);
    });
  }

  ngOnDestroy() {
    this.selection.changed.unsubscribe();
    this.sort.sortChange.unsubscribe();
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
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  //custom is checked method
  isChecked(row: any): boolean {
    return this.selection.selected.find(
      (el) => el[this.primaryKey] === row[this.primaryKey]
    );
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
