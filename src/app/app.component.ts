import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PM';
  user: any;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }
}
