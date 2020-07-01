import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class HospitalDepartmentService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllDepartment(){
    const url = `${environment.apiUrl}/hospital-departments`
    return this.httpClient.get<any>(url)
  }
}
