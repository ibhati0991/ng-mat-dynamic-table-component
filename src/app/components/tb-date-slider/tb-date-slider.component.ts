import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { ObjectStorage } from '../../services/localstorage.service';

@Component({
  selector: 'tb-date-slider',
  templateUrl: './tb-date-slider.component.html',
  styleUrls: ['./tb-date-slider.component.css'],
})
export class TbDateSliderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() sliderOption: any;
  @Output() valueChange = new EventEmitter();

  protected left: any;
  protected right: any;

  constructor() {}

  form: FormGroup;
  form2: FormGroup;

  obs: Subscription;
  obs2: Subscription;
  obs3: Subscription;

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.sliderOption);
    if (changes.sliderOption) {
      this.form = new FormGroup({
        value: new FormControl(this.sliderOption.min),
        highValue: new FormControl(this.sliderOption.max),
      });
      this.form2 = new FormGroup({
        value: new FormControl(this.getDate(this.sliderOption.min)),
        highValue: new FormControl(this.getDate(this.sliderOption.max)),
      });
      this.updateRangeBar();
    }
  }

  getDate(value) {
    return new Date(value * 1000);
  }
  getDateString(value) {
    return (new Date(value).getTime() / 1000);
  }

  ngOnInit() {
    this.obs2 = this.form.valueChanges.subscribe(() => this.updateRangeBar());

    this.obs = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe((data) => this.valueChange.emit(data));

    this.obs3 = this.form2.valueChanges.subscribe((data) => {
      this.form.patchValue({value:this.getDateString(data.value) , highValue:this.getDateString(data.highValue)});
      this.sliderOption.min=this.getDateString(data.value);
      this.sliderOption.max=this.getDateString(data.highValue);
      this.updateRangeBar();
    });
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
    this.obs2.unsubscribe();
    this.obs3.unsubscribe();
  }

  updateRangeBar() {
    this.left = `${
      ((this.form.controls.value.value - this.sliderOption.min) /
        (this.sliderOption.max - this.sliderOption.min)) *
      100
    }%`;
    this.right = `${
      ((this.sliderOption.max - this.form.controls.highValue.value) /
        (this.sliderOption.max - this.sliderOption.min)) *
      100
    }%`;
  }

  setAcademicYear() {
    let today = new Date();
    let dateOffset = 0;
    let year = today.getUTCFullYear();
    if (today.getMonth() < 7)
      dateOffset = -1;
    // this.floor = new Date(year + dateOffset, 7, 1);
    // this.ceil = new Date(year + dateOffset + 1, 6, 31);
  }

  saveDateRange() {
    let data = {
      // value: this.value,
      // highValue: this.highValue
    };
    ObjectStorage.setObject('date-range-slider', data);
  }

  applySavedDateRange() {
    let data = ObjectStorage.getObject('date-range-slider');
    if (data) {
      // this.floor = data.floor;
      // this.ceil = data.ceil;
      // this.value = data.value;
      // this.highValue = data.highValue;
      // this.convertDate();
      return true;
    }
    return false;
  }

  deleteDateRange() {
    ObjectStorage.removeObject('date-range-slider');
  }

}
