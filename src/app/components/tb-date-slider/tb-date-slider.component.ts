import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'tb-date-slider',
  templateUrl: './tb-date-slider.component.html',
  styleUrls: ['./tb-date-slider.component.css'],
})
export class TbDateSliderComponent implements OnInit ,OnChanges,OnDestroy {
  @Input()min: number ;
  @Input()max: number ;
  @Input()step: number;

  @Output()valueChange = new EventEmitter();

  protected left: any ;
  protected right: any ;

  constructor() {}

  form: FormGroup ;
 
  obs:Subscription;
  obs2:Subscription;

  ngOnChanges(changes:SimpleChanges){
    if(changes.min || changes.max){
      this.form = new FormGroup({
        value: new FormControl(this.min),
        highValue: new FormControl(this.max)
      });
      this.updateRangeBar()
      
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
    this.left = `${((this.form.controls.value.value-this.min)/(this.max-this.min)) * 100}%`;
    this.right = `${((this.max-this.form.controls.highValue.value)/(this.max-this.min)) * 100}%`;
  }
}
