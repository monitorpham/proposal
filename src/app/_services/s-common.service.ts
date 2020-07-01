import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SCommonService {

  constructor() { }

  dateStringToISOString(date: string ){
    let d = new Date(date)
    return d.toISOString()
  }
}
