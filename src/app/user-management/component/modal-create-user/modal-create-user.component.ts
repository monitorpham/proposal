import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../../../_services/user.service';
import { EquipmentGroupService} from '../../../_services/equipment-group.service';
import { EquipmentGroup } from 'src/app/_models/equipment-group';
import { User } from '../../../_models/user';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-create-user',
  templateUrl: './modal-create-user.component.html',
  styleUrls: ['./modal-create-user.component.scss']
})
export class ModalCreateUserComponent implements OnInit {
  user!: User;
  isSaving = false;
  loading = false;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  errors = '';
  authorities: string[] = [];
  groups: EquipmentGroup[] = [];
  selectedGroup: EquipmentGroup;


  constructor(
    private bsModalRef: BsModalRef,
    private userService: UserService,
    private equipmentGroupService: EquipmentGroupService,
    private fb: FormBuilder,
    private router: Router,
    private toastr : ToastrService,
  ) { }

  
  ngOnInit(): void {
    this.userService.authorities().subscribe(authorities => {
      this.authorities = authorities;
    }, err =>{
      console.log(err)
    });
    this.equipmentGroupService.groups().subscribe(res=>{
      this.groups = res.map(item =>{
        let hospitalDepartment = item as EquipmentGroup;
        return hospitalDepartment
      })
      // console.log(this.departments)
    }, err =>{
      console.log(err)
    })
  }

  createUserForm = this.fb.group({
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    firstName: ['', [Validators.required,Validators.maxLength(50)]],
    lastName: ['', [Validators.required,Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    phone: ['',[Validators.required]],
    selectedGroup: ['',[Validators.required]],
    authorities: ['',[Validators.required]],
    // password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    // confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.success = true;
    this.bsModalRef.hide();
    this.toastr.success("Create proposal successfully!");
    this.refresh();
  }

  // private onSaveError(): void {
  //   this.isSaving = false;
  // }


  save(): void {
    // console.log(this.createUserForm)
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;
    this.isSaving = true;

    const options = {
      params: new HttpParams().append("phone",this.createUserForm.value.phone)
                              .append("idGroup",this.createUserForm.value.selectedGroup.id)
    }

    const authority = this.createUserForm.get(['authorities'])!.value;
    if( authority == "ROLE_ADMIN"){
      authority.push("ROLE_USER")
    }
    this.loading = true;
    console.log(this.createUserForm.value)
    this.userService.createUser(this.createUserForm.value,options).subscribe
      (
        () => this.onSaveSuccess(),
        response => this.processError(response),
      );
    // }
   }

   private processError(response: HttpErrorResponse): void {
    //  if (response.status === 400 && this.createUserForm.value.login == this.user.login) {
    //   this.errorUserExists = true;
    // } else if (response.status === 400 && this.createUserForm.value.email == this.user.email) {
    //   this.errorEmailExists = true;
    // } else {
      this.error = true;
      
    // }
    
  }

   onCancel(){
    this.bsModalRef.hide()
  }
  refresh(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/user-management']);
  }

  

}
