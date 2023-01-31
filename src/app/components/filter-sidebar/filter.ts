interface FilterOptions {
  filters: [
    {
      name: string
    }
  ]
}

class Filter {
  options: any;
  comparator: any;
  query: any;

  constructor(options = {fields:[]}, comparator = 'disabled', query = '') {
    this.options = options;
    this.comparator = comparator;
    this.query = query;
  }

  filter(inputs) {
    if(this.comparator == 'disabled')
      return true;
    if(!this.query)
      return true;
      
    return this._filter(inputs, JSON.parse(JSON.stringify(this.options.fields)));
  }

  _filter(inputs, fields) {
    let field = fields[0];
    let input = inputs[field];

    if(!input && field !== '=')
      return false;

    if(fields.length === 1)
      if(this.isArray(input))
        return this._filterArrayItems(input)
      else
        return this._compare(input);

    let remaingFields = fields.slice(1);
    if(field === '=') {
      let fieldCondition = remaingFields.splice(0, 2);
      if(inputs[fieldCondition[0]] === fieldCondition[1])
        return this._filter(inputs, remaingFields)
    }
    else if(this.isArray(input))
      return this._filterArrayObjects(input, remaingFields);
    else
      return this._filter(input, remaingFields);
  }

  _compare(input) {
    switch(this.comparator) {
      case 'equals':
        return input.toLowerCase() === this.query.toLowerCase();
      case 'less': 
        return input.toLowerCase() < this.query.toLowerCase();
      case 'greater':
        return input.toLowerCase() > this.query.toLowerCase();
      case 'includes':
        return input.toLowerCase().includes(this.query.toLowerCase());
      default:
        return true;
    }
  }

  _filterArrayObjects(inputs, fields) {
    var result = false;
    for(var i in inputs) {
        result = this._filter(inputs[i], fields);
        if(result)
          return true;
    }
    return false;
  }

  _filterArrayItems(inputs){
    for(var i in inputs) {
      if((this._compare(inputs[i])))
        return true;
    }
    return false;
  }

  isArray(obj) {
    return this.isObject(obj) && (obj instanceof Array);
  }

  isObject(obj) {
    return obj && (typeof obj  === 'object');
  }
}

class FilterGroup {
  name: string;
  filters: Array<Filter>;

  constructor(name, filters = []) {
    this.name = name;
    this.filters = filters;
  }

  applyFilters(data: Array<any>) {
    return data.filter((item) => {
      for(let filter of this.filters)
        if(!filter.filter(item))
          return false;

      return true;
    });
  }
}

export { FilterOptions, Filter, FilterGroup };