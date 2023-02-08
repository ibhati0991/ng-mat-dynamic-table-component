import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TbMatTableBaseDirective } from './components/tb-mat-table.base.directive';
import { CellType } from './constants';
import { BaseService } from './services/base.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends TbMatTableBaseDirective {
  dataSource: any = [];
  filterOptions = {
    persons: {
      'First Name': ['name', 'first_name'],
      'Middle Name': ['name', 'middle_name'],
      'Last Name': ['name', 'last_name'],
      Membership: ['memberships'],
    },
  };
  gridModel = [
    {
      title: 'Select',
      rowParameter: 'select',
      cellType: CellType.select,
      default: true,
      sortable: false,
    },
    {
      title: 'ID',
      rowParameter: 'id',
      cellType: CellType.text,
      default: true,
      sortable: true,
    },
    {
      title: 'Name',
      rowParameter: 'first_name',
      concatRowParameter: ['last_name'],
      cellType: CellType.concat,
      default: true,
      sortable: true,
    },
    {
      title: 'Last Name',
      rowParameter: 'last_name',
      cellType: CellType.text,
      default: false,
      sortable: true,
    },
    {
      title: 'email',
      rowParameter: 'email',
      cellType: CellType.text,
      default: true,
      sortable: true,
    },
    {
      title: 'Avatar',
      rowParameter: 'avatar',
      cellType: CellType.image,
      default: false,
      sortable: true,
    },
    {
      title: '',
      rowParameter: 'detail',
      cellType: CellType.detail,
      default: true,
      sortable: false,
    },
    // {
    //   title: 'Category',
    //   rowParameter: 'assessment_category',
    //   cellType: CellType.text,
    //   default: true,
    // },
    // {
    //   title: 'Value',
    //   rowParameter: 'value',
    //   cellType: CellType.text,
    //   default: true,
    // },
    // {
    //   title: 'Name',
    //   rowParameter: 'name.first_name',
    //   cellType: CellType.text,
    //   default: true,
    // },
    // {
    //   title: 'EID',
    //   rowParameter: 'identification_ids',
    //   cellType: CellType.list,
    //   listFilter: { name: 'EID' },
    //   listRowParameter: 'id',
    //   default: true,
    // },
    // {
    //   title: 'Memberships',
    //   cellType: CellType.text,
    //   rowParameter: 'memberships',
    // },
    // { title: 'Date', rowParameter: 'date_recorded', cellType: CellType.date },
  ];

  selectionGridModel = [
    {
      title: 'Select',
      rowParameter: 'select',
      cellType: CellType.select,
      default: true,
      sortable: false,
    },
    {
      title: 'Name',
      rowParameter: 'first_name',
      concatRowParameter: ['last_name'],
      cellType: CellType.concat,
      default: true,
      sortable: true,
    },
  ];

  constructor(public service: BaseService) {
    super(service);
  }

  get selectedItems() {
    return new MatTableDataSource<any>(this.selection.selected);
  }

  openDetailPage(event) {
    console.log(event);
  }
}
