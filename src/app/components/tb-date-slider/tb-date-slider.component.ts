import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'tb-date-slider',
  templateUrl: './tb-date-slider.component.html',
  styleUrls: ['./tb-date-slider.component.css'],
})
export class TbDateSliderComponent implements OnInit ,OnChanges,OnDestroy {
  @Input()min: number = 0;
  @Input()max: number = 100;
  @Input()step: number = 1;

  @Output()valueChange = new EventEmitter();

  protected left: any ;
  protected right: any ;

  constructor() {}

  form: FormGroup ;
 
  obs:Subscription;
  obs2:Subscription;

  ngOnChanges(changes:SimpleChanges){
    if(changes){
      this.form = new FormGroup({
        value: new FormControl(this.min),
        highValue: new FormControl(this.max)
      });
    }
  }
 
  ngOnInit() {
    this.obs2=this.form.valueChanges
      .subscribe(() => this.updateRangeBar());
    
    this.obs=this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => this.valueChange.emit(data));
  }
  
  ngOnDestroy() {
    this.obs.unsubscribe();
    this.obs2.unsubscribe();
  }

  updateRangeBar(){
    this.left = `${(this.form.controls.value.value/this.max) * 100}%`;
    this.right = `${100 - (this.form.controls.highValue.value/this.max) * 100}%`;
  }
}
