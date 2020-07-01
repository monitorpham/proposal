import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    // this.accountService.
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }

}
