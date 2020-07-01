import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EquipmentGroupService {

  constructor(
    private httpClient: HttpClient
  ) { }

  groups(){
    const url = `${environment.apiUrl}/equiqment-groups`
    return this.httpClient.get<any>(url)
  }

}
