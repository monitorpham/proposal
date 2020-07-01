import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../_models/user'

@Injectable({
    providedIn: 'root'
  })
  export class RegisterService {
  
    constructor(
      private httpClient: HttpClient
    ) { }

      saveRegister(key: string, newPassword: string): Observable<{}> {
        const url =`${environment.apiUrl}/account/reset-password/finish`
        return this.httpClient.post(url, {key, newPassword});
      }
}