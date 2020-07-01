import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class PasswordService {
  
    constructor(
      private httpClient: HttpClient
    ) { }

    savePass(newPassword: string, currentPassword: string): Observable<{}> {
        const url =`${environment.apiUrl}/account/change-password`
        return this.httpClient.post(url, { currentPassword, newPassword });
      }
}