import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllProposals(){
    const url =`${environment.apiUrl}/proposals-data-table`
    return this.httpClient.get<any>(url);
  }

  getAllProposalsStatus(status){
    const url =`${environment.apiUrl}/get-All-Data-By-Status/{status}?status=${status}`
    return this.httpClient.get<any>(url);
  }

  createProposal(data){
    const url =`${environment.apiUrl}/proposals`
    return this.httpClient.post<any>(url, data);
  }

  updateProposal(data){
    const url =`${environment.apiUrl}/proposals`
    return this.httpClient.put<any>(url, data);
  }

  deleteProposal(id){
    const url =`${environment.apiUrl}/proposals/${id}`
    return this.httpClient.delete<any>(url);
  }

  getProgressesByProposalId(id) {
    const url = `${environment.apiUrl}/get-All-ProgressDetail-By-ProposalId?id=${id}`
    return this.httpClient.get<any>(url)
  }

  
}
