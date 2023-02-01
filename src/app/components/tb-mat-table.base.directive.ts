import { SelectionModel } from '@angular/cdk/collections';

export class TbMatTableBaseDirective {
  selection = new SelectionModel<any>(true, []);
  constructor() {}
}
