import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tb-date-slider',
  templateUrl: './tb-date-slider.component.html',
  styleUrls: ['./tb-date-slider.component.css'],
})
export class TbDateSliderComponent implements OnInit {
  value = this.sliderOptions.floor;
  highValue = this.sliderOptions.ceil;

  get sliderOptions() {
    return {
      floor: new Date(2019, 0, 1).getTime() / 1000,
      ceil: new Date().getTime() / 1000,
      step: 86400,
      hideLimitLabels: true,
      hidePointerLabels: false,
      translate: (value: number): string => {
        return new Date(value * 1000).toDateString().toString().substring(3);
      },
    };
  }

  dateFilter(event) {
    console.log(event);
  }

  updateRange(event, type) {
    if (type === 'ceil') {
      console.log(event);
    } else {
      console.log(event);
    }
  }

  constructor() {
    console.log(this.value, this.highValue);
  }

  ngOnInit() {}
}
