import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tb-date-slider',
  templateUrl: './tb-date-slider.component.html',
  styleUrls: ['./tb-date-slider.component.css'],
})
export class TbDateSliderComponent implements OnInit {
  @Input() min: number = 0;
  @Input()max: number = 100;
  @Input()step: number = 1;

  @Input()value: number = 10;
  @Output()valueChange = new EventEmitter();

  @Input()highValue: number = 80;
  @Output()highValueChange = new EventEmitter();

  protected left: any ;
  protected right: any ;

  constructor() {}

  ngOnInit() {
    this.updateRangeBar();
  }

  upateRange(event, type) {
    this.updateRangeBar();
    if (type === 'value') {
      this.valueChange.emit(event)
    } else {
      this.highValueChange.emit(event)
    }
  }

  updateRangeBar(){
    this.left = `${(this.value/this.max) * 100}%`;
    this.right = `${100 - (this.highValue/this.max) * 100}%`;
  }
}
