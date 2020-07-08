import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HospitalDepartmentService } from 'src/app/_services/hospital-department.service';
import { ProposalService } from 'src/app/_services/proposal.service';
import { SCommonService } from 'src/app/_services/s-common.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HospitalDepartment } from 'src/app/_models/hospital-department';
import * as moment from 'moment'
import { Proposal } from 'src/app/_models/proposal';
import { Department } from 'src/app/_models/department';

@Component({
  selector: 'app-modal-extend',
  templateUrl: './modal-extend.component.html',
  styleUrls: ['./modal-extend.component.scss']
})
export class ModalExtendComponent implements OnInit {
  proposal: Proposal
  departments: HospitalDepartment[] = []
  selectedDepartment: HospitalDepartment;
  startDate: string = ''
  proposalForm: any = {
    "additionalDate": null,
    "contentProposal": null,
    "hospitalDepartmentId": null,
    "id": null,
    "note": null,
    "startDate": null,
    "userExtraId": null
  }

  constructor(
    private bsModalRef: BsModalRef,
    private hospitalDepartmentService: HospitalDepartmentService,
    private proposalService: ProposalService,
    private commonService: SCommonService,
    private toastr : ToastrService,
    private router: Router,
    private formBuilder: FormBuilder){ 
      
    }


  ngOnInit(): void {
    this.initForm()
    console.log('edit proposal: ')
    console.log(this.proposal)

    this.hospitalDepartmentService.getAllDepartment().subscribe(res=>{
      this.departments = res.map(item =>{
        let hospitalDepartment = item as HospitalDepartment;
        return hospitalDepartment
      })
    }, err =>{
      console.log(err)
    })
  }

  initForm(){
    this.selectedDepartment = new HospitalDepartment(this.proposal.hospitalDepartmentId, this.proposal.hospitalDepartment)
    this.proposalForm.hospitalDepartmentId = this.selectedDepartment.id
    this.proposalForm.contentProposal = this.proposal.contentProposal
    this.proposalForm.note = this.proposal.note
    this.proposalForm.id = this.proposal.id
    this.proposalForm.startDate =  this.proposal.startDate
    this.proposalForm.additionalDate = this.proposal.additionalDate
    this.proposalForm.userExtraId = this.proposal.asigneeId
  }

  onSave(){
    let data = this.proposalForm
    data.hospitalDepartmentId = this.selectedDepartment.id
    data.startDate = this.commonService.DDMMYYYYtoIsoString(data.startDate)
    this.proposalService.updateProposal(data).subscribe(res =>{
      console.log(res)
      this.toastr.success("Update proposal successfully!");
      this.refresh();
    }, err=>{
      console.log(err)
      this.toastr.error(err.message? err.message:  "Update proposal failed!")
    })
    this.bsModalRef.hide()
  }

  onCancel(){
    this.bsModalRef.hide()
  }

  refresh(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home']);
  }

}
