import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserExtrasService {

  constructor(
    private httpClient: HttpClient
  ) { }

  userExtras(){
    const url = `${environment.apiUrl}/user-extras`
    return this.httpClient.get<any>(url)
  }

}
