import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CellType } from '../../constants';

@Component({
  selector: 'tb-mat-table',
  templateUrl: './tb-mat-table.component.html',
  styleUrls: ['./tb-mat-table.component.css'],
})
export class TbMatTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() gridModel: any;
  @Input() dataService: any;

  totalCount: number;
  dataSource = new MatTableDataSource<any>([]);
  defaultColumns = [];
  cellType = CellType;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.length = this.totalCount;

    this.defaultColumns = this.gridModel
      .filter((g) => g.default)
      .map((g) => g.rowParameter);
    this.getGridData();
  }

  getGridData(event?) {
    this.dataService.getAllPartialValue(1, 10).then((res) => {
      console.log(res);
      this.dataSource = new MatTableDataSource<any>(res['data']);
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
