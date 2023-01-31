import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
import { Filter } from './filter';
import { ObjectStorage } from '../../services/localstorage.service';

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class FilterSidebarComponent implements OnInit {
  @Input() filterName: any;
  @Input() filterOptions: any;
  @Input() sourceData: any;
  @Input() filters: any;
  @Input() condition: string;
  @Output() conditionChange = new EventEmitter<any>();
  @Output() filtersChange = new EventEmitter<any>();
  @Output() filteredData = new EventEmitter<any>();
  dropdown = [];
  dropdownMap = {};
  doFilter = false;

  constructor() {}

  ngOnInit(): void {
    this.doFilter = true;
    if (!this.filters) {
      if (!this.loadFilters(false)) this.filters = [];
      setTimeout(() => {
        this.applyFilters();
      });
    }
    if (this.filters.length === 0) this.addFilter();
    setTimeout(() => {
      this.filtersChange.emit(this.filters);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === 'sourceData' && this.doFilter) this.applyFilters();
      else if (propName === 'filterOptions') this.makeFilterDropdown();
    }
  }

  resetFilters() {
    this.filters = [];
    this.addFilter();
    this.filtersChange.emit(this.filters);
    this.applyFilters();
  }

  makeFilterDropdown() {
    this.dropdown = [];
    for (let group in this.filterOptions) {
      let filterGroup = this.filterOptions[group];
      for (let name in filterGroup) {
        if (!this.dropdownMap[name]) {
          let filterFields = JSON.parse(JSON.stringify(filterGroup[name]));
          let filter = {
            group: group,
            name: name,
            fields: filterFields,
          };
          this.dropdownMap[name] = filter;
        }
        this.dropdown.push(name);
      }
    }
  }

  dropdownSelect(event, filter) {
    filter.options = this.dropdownMap[event.value];
  }

  addFilter() {
    this.filters.push(new Filter());
  }

  applyFilters() {
    let results = {};
    //console.log(this.filters)
    for (let group in this.sourceData) {
      results[group] =
        this.sourceData[group] &&
        this.sourceData[group].filter((item) => {
          for (let filter of this.filters)
            if (filter.options && filter.options.group === group)
              if (!filter.filter(item)) return false;

          return true;
        });
    }
    //console.log(results)
    this.filteredData.emit(results);
    this.filtersChange.emit(this.filters);
  }

  trackById(id) {
    return id;
  }

  saveFilters() {
    if (this.filterName) ObjectStorage.setObject(this.filterName, this.filters);
  }

  loadFilters(emit = true) {
    let savedFilters = ObjectStorage.getObject(this.filterName);
    if (savedFilters) {
      this.filters = this.makeFilters(savedFilters);
      if (emit) this.filtersChange.emit(this.filters);
      return true;
    } else return false;
  }

  makeFilters(filters) {
    let newFilters = [];
    for (let filter of filters)
      newFilters.push(
        new Filter(filter.options, filter.comparator, filter.query)
      );
    return newFilters;
  }

  clearSavedFilters() {
    if (this.filterName) ObjectStorage.removeObject(this.filterName);
  }

  checkEnter($event: KeyboardEvent) {
    // //console.log($event)
    if (event['keyCode'] == 13) {
      this.applyFilters();
    }
  }
}
