import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tb-mat-table',
  templateUrl: './tb-mat-table.component.html',
  styleUrls: ['./tb-mat-table.component.css'],
})
export class TbMatTableComponent implements OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() gridModel: any;
  @Input() dataSource: MatTableDataSource<any>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSource.currentValue) {
      this.dataSource.paginator = this.paginator;
    }
  }

  get rowParameter() {
    return this.gridModel?.map((i) => i.rowParameter);
  }
}
