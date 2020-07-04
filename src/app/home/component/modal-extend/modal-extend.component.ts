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
    "contentProposal": "",
    "hospitalDepartmentId": 0,
    "note": "",
    "startDate": "",
    "asignee": "",
    "extraDate": 0
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
    this.proposalForm.startDate =  this.proposal.endDate
    this.proposalForm.extraDate = 0
    this.proposalForm.asignee = '...'
  }

  onSave(){
    // let dateString = this.commonService.dateStringToISOString(this.startDate)
    // let dId = this.selectedDepartment.id
    // this.proposalForm.startDate = dateString
    // this.proposalForm.hospitalDepartmentId = dId
    // console.log(this.proposalForm)
    // // debugger;

    // this.proposalService.createProposal(this.proposalForm).subscribe(res =>{
    //   console.log(res)
    //   this.toastr.success("Create proposal successfully!");
    //   this.refresh();
    // }, err=>{
    //   console.log(err)
    //   this.toastr.error(err.message? err.message:  "Create proposal failed!")
    // })

    
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
