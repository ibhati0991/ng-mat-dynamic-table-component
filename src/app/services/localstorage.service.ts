import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class ObjectStorage {
  static setObject(key, obj) {
    window.localStorage.setItem(key, JSON.stringify(obj));
  }

  static getObject(key) {
    let strObj = window.localStorage.getItem(key);
    return strObj && JSON.parse(strObj);
  }

  static removeObject(key) {
    window.localStorage.removeItem(key);
  }

  static clear() {
    window.localStorage.clear();
  }
}


@Injectable()
export class LocalStorageService {

  constructor() { }
}
