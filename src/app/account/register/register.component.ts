import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterService } from '../../_services/register.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  registerForm = this.fb.group({
    key: ['',[Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  constructor( private registerService: RegisterService, private fb: FormBuilder,private router: Router) { }

  ngAfterViewInit(): void {
    if (this.login) {
      this.login.nativeElement.focus();
    }
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;
    console.log(this.registerForm)
    const password = this.registerForm.get(['newPassword'])!.value;
    if (password !== this.registerForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {
      const key = this.registerForm.get(['key'])!.value;
      this.registerService.saveRegister( key, password).subscribe(
        () => (this.onSaveSuccess),
        response => this.processError(response)
      );
    }
  }

  private onSaveSuccess(): void {
    this.success = true;
    this.router.navigate(['/login']);
  }

  openLogin(): void {
    // this.loginModalService.open();
  }

  private processError(response: HttpErrorResponse): void {
    // if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
    //   this.errorUserExists = true;
    // } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
    //   this.errorEmailExists = true;
    // } else {
      this.error = true;
    // }
  }

}
