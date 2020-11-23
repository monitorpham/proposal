import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SCommonService {

  constructor() { }

  dateStringToISOString(date: string) {
    let arrDate = date.split("-")

    let dateString = arrDate[2] + '-' + arrDate[1] + '-' + arrDate[0]
    // debugger;
    let d = new Date(dateString)
    return d.toISOString()
  }

  dateStringToTime(date: string) {
    let arrDate = date.split("T")
    let d = new Date(arrDate[0])
    // debugger;
    return d.getTime()
  }

  public DDMMYYYYtoIsoString(dateString: any){
    // debugger
    if(dateString){
      // console.log(dateString)
      // console.log(typeof dateString)
      if(typeof dateString == 'string'){
        if(dateString.toString().includes('Z')){
          return dateString
        }
        let arr = dateString.split('-')
        let dString = arr[2] + '-' + arr[1] + '-' + arr[0]
        let date = new Date(dString)
        return date.toISOString()
      }else{
        
        let date: Date = dateString
        console.log(date.toISOString())
        return date.toISOString()
        
      }
    }
    return ''
  }

  public toDDMMYYYY(dateString: String) {
    if (dateString) {
      let arr = dateString.split('T')
      let temp = arr[0].toString()
      let arr2 = temp.split('-')
      return arr2[2] + '-' + arr2[1] + '-' + arr2[0]
  }
  return ''
  }
}
