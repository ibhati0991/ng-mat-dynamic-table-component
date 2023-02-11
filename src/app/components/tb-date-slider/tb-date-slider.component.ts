import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tb-date-slider',
  templateUrl: './tb-date-slider.component.html',
  styleUrls: ['./tb-date-slider.component.css'],
})
export class TbDateSliderComponent implements OnInit {
  min: number = 0;
  max: number = 100;
  step: number = 5;

  value: number = 10;
  highValue: number = 80;

  constructor() {}

  ngOnInit() {}
}
