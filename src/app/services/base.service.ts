import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  apiController = 'assessments';

  constructor(protected http: HttpClient) {}

  getAllPartialValue(
    page_no = 0,
    page_size = 10,
    sort_column?,
    sort_direction?,
    filters = []
  ) {
    let queryString = `?page=${page_no + 1}&per_page=${page_size}`;
    if (sort_column) {
      queryString =
        queryString +
        `&sort_column=${sort_column}&sort_direction=${sort_direction}`;
    }
    //console.log(queryString);
    return this.http
      .get(`https://reqres.in/api/users${queryString}`)
      .toPromise();
  }
}
