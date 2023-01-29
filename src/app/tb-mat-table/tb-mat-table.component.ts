import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
const CellTypeENUM = {
  date: 'date',
};
@Component({
  selector: 'tb-mat-table',
  templateUrl: './tb-mat-table.component.html',
  styleUrls: ['./tb-mat-table.component.css'],
})
export class TbMatTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() gridModel: any;
  @Input() dataSource = new MatTableDataSource<any>([]);
  @Input() dataService: any;
  @Input() totalCount: number;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.length = this.totalCount;
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
}
