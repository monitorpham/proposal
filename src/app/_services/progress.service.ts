import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(
    private httpClient: HttpClient
  ) { }

  completeProgress(progess){
    const url = `${environment.apiUrl}/progess-detaill-stage?idProgressDetail=${progess.id}`
    return this.httpClient.put<any>(url, {note: progess.note})
  }

  getAllProgresses(){
    const url = `${environment.apiUrl}/progresses`
    return this.httpClient.get<any>(url)
  }

  updateProgress(formData, proposalId){
    const url = `${environment.apiUrl}/api/update-All-ProgressDetail-By-ProposalId?proposalId=${proposalId}`
    return this.httpClient.put(url, formData)
  }
  
}
