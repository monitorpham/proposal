import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HospitalDepartmentService } from 'src/app/_services/hospital-department.service';
import { ThrowStmt } from '@angular/compiler';
import { HospitalDepartment } from 'src/app/_models/hospital-department';
import { ProposalService } from 'src/app/_services/proposal.service';
import { FormBuilder, Validators} from '@angular/forms';
import { SCommonService } from 'src/app/_services/s-common.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-create-proposal',
  templateUrl: './modal-create-proposal.component.html',
  styleUrls: ['./modal-create-proposal.component.css']
})
export class ModalCreateProposalComponent implements OnInit {
  departments: HospitalDepartment[] = []
  selectedDepartment: HospitalDepartment;
  startDate: string = ''
  proposalForm: any = {
    "contentProposal": null,
    "hospitalDepartmentId": null,
    "note": null,
    "startDate": null,
    "userExtraId": null,
    "additionalDate": null
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
    // let currentDate = new Date()
      this.startDate =  moment().format("DD-MM-YYYY");
      // console.log(currentDate.toISOString())

    // let currentDate = new Date()
    //   this.proposalForm.startDate = currentDate.toISOString().toString().split('T')[0]
    //   console.log(this.proposalForm)

    this.hospitalDepartmentService.getAllDepartment().subscribe(res=>{
      this.departments = res.map(item =>{
        let hospitalDepartment = item as HospitalDepartment;
        return hospitalDepartment
      })
    }, err =>{
      console.log(err)
    })
  }

  onSave(){
    let dateString = this.commonService.DDMMYYYYtoIsoString(this.startDate)
    let dId = this.selectedDepartment.id
    this.proposalForm.startDate = dateString
    this.proposalForm.hospitalDepartmentId = dId
    console.log(this.proposalForm)
    // debugger;

    if(!this.validateForm){
      this.toastr.error("please fill all required field!")
      return 
    }
    

    this.proposalService.createProposal(this.proposalForm).subscribe(res =>{
      console.log(res)
      this.toastr.success("Create proposal successfully!");
      this.refresh();
    }, err=>{
      console.log(err)
      this.toastr.error(err.message? err.message:  "Create proposal failed!")
    })

    
    this.bsModalRef.hide()
  }

  onCancel(){
    this.bsModalRef.hide()
  }

  validateForm(){
    if(this.proposalForm.contentProposal == null || this.proposalForm.hospitalDepartmentId == null ||
      this.proposalForm.note == null || this.proposalForm.startDate == null || 
      this.proposalForm.additionalDate == null|| this.proposalForm.userExtraId == null){
        return false
      }
      return true
  }

  refresh(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home']);
  }

}