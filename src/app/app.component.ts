import { Component } from '@angular/core';
import { CellType } from './constants';
import { BaseService } from './services/base.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dataSource: any = [];
  gridModel = [
    {
      title: 'ID',
      rowParameter: 'id',
      cellType: CellType.text,
      default: true,
    },
    {
      title: 'First Name',
      rowParameter: 'first_name',
      concatRowParameter: ['last_name'],
      cellType: CellType.concat,
      default: true,
    },
    {
      title: 'Last Name',
      rowParameter: 'last_name',
      cellType: CellType.text,
      default: false,
    },
    {
      title: 'email',
      rowParameter: 'email',
      cellType: CellType.text,
      default: true,
    },
    {
      title: 'Avatar',
      rowParameter: 'avatar',
      cellType: CellType.text,
      default: false,
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

  constructor(public service: BaseService) {}
}
