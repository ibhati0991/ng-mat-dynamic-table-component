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
    page_size = 25,
    sort_column?,
    sort_direction?,
    filters = []
  ) {
    let queryString = `?page_no=${page_no}&page_size=${page_size}`;
    if (sort_column) {
      queryString =
        queryString +
        `&sort_column=${sort_column}&sort_direction=${sort_direction}`;
    }
    return this.http
      .post(
        ` https://52.207.186.158:5000/v1/${this.apiController}/getAllPartialValue${queryString}`,
        filters
      )
      .toPromise();
  }
}
