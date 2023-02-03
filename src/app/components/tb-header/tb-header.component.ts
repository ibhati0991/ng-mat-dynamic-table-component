import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tb-header',
  templateUrl: './tb-header.component.html',
  styleUrls: ['./tb-header.component.css'],
})
export class TbHeaderComponent implements OnInit {
  @Input() header: string;
  @Input() subHeader: string;
  @Input() canExport: boolean;
  @Input() canAdd: boolean;
  @Output() export = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
