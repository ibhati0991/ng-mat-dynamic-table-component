import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tb-date-slider',
  templateUrl: './tb-date-slider.component.html',
  styleUrls: ['./tb-date-slider.component.css'],
})
export class TbDateSliderComponent implements OnInit {
  min: number = 0;
  max: number = 100;
  step: number = 1;
  value: number = 10;
  highValue: number = 80;

  left: any ;
  right: any ;

  constructor() {}

  ngOnInit() {
    this.updateRangeBar();
  }

  upateRange(event, type) {
    this.updateRangeBar();
    if (type === 'value') {
    } else {
    }
  }

  updateRangeBar(){
    this.left = `${(this.value/this.max) * 100}%`;
    this.right = `${100 - (this.highValue/this.max) * 100}%`;
  }
}
