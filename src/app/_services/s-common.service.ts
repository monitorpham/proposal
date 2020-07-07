import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SCommonService {

  constructor() { }

  dateStringToISOString(date: string ){
    let arrDate = date.split("-")
    
    let dateString = arrDate[2] + '-' + arrDate[1] + '-' + arrDate[0]
    // debugger;
    let d = new Date(dateString)
    return d.toISOString()
  }
  
  dateStringToTime(date: string){
    let arrDate = date.split("-")
    let dateString = arrDate[2] + '-' + arrDate[1] + '-' + arrDate[0]
    let d = new Date(dateString)
    return d.getTime()
  }

  public convertDate(dateString: String) {
    if (dateString) {
        let arr = dateString.split('T')
        return arr[0]
    }
    return ' '
}
}
