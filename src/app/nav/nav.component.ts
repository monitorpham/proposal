import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isUser:Boolean =  false;
  isAdmin:Boolean =  false;
  currentUser: User;

  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.fetch().subscribe(res =>{
      this.currentUser = res
      // console.log(this.currentUser)
      if(this.currentUser.authorities.includes("ROLE_USER")){
        this.isUser = true
      }
      if(this.currentUser.authorities.includes("ROLE_ADMIN")){
        this.isAdmin = true
      }
      // console.log(this.isAdmin)
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }

}
