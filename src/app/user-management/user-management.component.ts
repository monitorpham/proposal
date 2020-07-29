import { Component, OnInit,OnDestroy,AfterViewInit } from '@angular/core';
import { User } from '../_models/user';
import { Account } from '../_models/account';
import { AccountService } from '../_services/account.service';
import { UserService } from '../_services/user.service';
// import { UserService, AuthenticationService } from '../_services';
import { UserExtrasService} from '../_services/user-extras';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalCreateUserComponent } from '../user-management/component/modal-create-user/modal-create-user.component';
import { ModalEditUserComponent } from '../user-management/component/modal-edit-user/modal-edit-user.component';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
// import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Location } from '@angular/common';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnDestroy,OnInit {

  users: User[]| null = null;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  currentAccount: Account | null = null;
  groups: string[] = [];

  datatableElement: DataTableDirective;
  dtInstances:any;

  constructor(
    private accountService: AccountService,
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private userService: UserService,
    private userExtrasService: UserExtrasService,
    private router: Router,
    // public _location:Location
  ) {this.router.routeReuseStrategy.shouldReuseRoute = () => false; }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
    }
    // ngAfterViewInit(): void {
    //   // this.dtTrigger.next();
    // }
  ngOnInit(): void {
    // this.accountService.identity().subscribe(account => (this.currentAccount = account));
    this.accountService.identity().subscribe(account => (
      // console.log(account),
      this.currentAccount = account));

    this.userExtrasService.userExtras().subscribe(groups => {
      this.groups = groups;
    }, err =>{
      console.log(err);
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25
    };
    this.loadData();
    // console.log(this.loadData())
  }

  loadData() {
    this.userService.getAllUsers().subscribe(res => {
      // console.log(res)
      this.users = res.map(item => {
        let user = new User()
        user.id = item.id,
        user.login = item.login,
        user.firstName = item.firstName,
        user.lastName = item.lastName,
        user.email = item.email,
        user.activated = item.activated,
        user.authorities = item.authorities,
        user.createdDate = item.createdDate,
        user.lastModifiedBy = item.lastModifiedBy,
        user.lastModifiedDate = item.lastModifiedDate;
        return user;
      }, err => {
        console.log(err);
      });
      this.dtTrigger.next();
    });
  }

  

refresh(){
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['/user-management']);
}

  setActive(user: User, isActivated: boolean): void{
    this.userService.update({...user, activated: isActivated }).subscribe(() => this.users);
    this.refresh();
  }
  
  OpenCreateUserModal() {
    // const initialState = {
    //     title: 'Modal with component'
    //   };
    this.bsModalRef = this.modalService.show(ModalCreateUserComponent, { class: "modal-lg" });
  }

  OpenEditUserModal(user) {
    const initialState = {
      user: user,
      
    };
    // console.log(user)
    this.bsModalRef = this.modalService.show(ModalEditUserComponent, { initialState, class: "modal-lg" });
    // this.bsModalRef.content.user = null;
  }

}

