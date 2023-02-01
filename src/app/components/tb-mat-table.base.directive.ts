import { SelectionModel } from '@angular/cdk/collections';

export class TbMatTableBaseDirective {
  selection;
  constructor() {
    this.selection = new SelectionModel<any>(true, []);
  }
}
