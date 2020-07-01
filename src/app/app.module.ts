import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { NavComponent } from './nav/nav.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { ModalCreateProposalComponent } from './home/component/modal-create-proposal/modal-create-proposal.component';
import { ModalUpdateProgressComponent } from './home/component/modal-update-progress/modal-update-progress.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalDeleteProposalComponent } from './home/component/modal-delete-proposal/modal-delete-proposal.component';
import { ModalCompleteProgressComponent } from './home/component/modal-complete-progress/modal-complete-progress.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { ComponentComponent } from './user-management/component/component.component';
import { ModalCreateUserComponent } from './user-management/component/modal-create-user/modal-create-user.component';
import { ModalEditUserComponent } from './user-management/component/modal-edit-user/modal-edit-user.component';
import { AccountComponent } from './account/account.component';
import { SettingsComponent } from './account/settings/settings.component';
import { PasswordComponent } from './account/password/password.component';
import { PasswordStrengthBarComponent } from './account/password/password-strength-bar/password-strength-bar.component';
import { RegisterComponent } from './account/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { ModalViewProgressComponent } from './home/component/modal-view-progress/modal-view-progress.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserManagementComponent,
    NavComponent,
    ModalCreateProposalComponent,
    ModalUpdateProgressComponent,
    ModalDeleteProposalComponent,
    ModalCompleteProgressComponent,
    ModalViewProgressComponent,
    // ComponentComponent,
    ModalCreateUserComponent,
    ModalEditUserComponent,
    AccountComponent,
    SettingsComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    MglTimelineModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgbModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    AppRoutingModule, 
    TooltipModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    BsModalRef
  ],
  entryComponents: [
    ModalCreateProposalComponent,
    ModalUpdateProgressComponent,
    ModalDeleteProposalComponent,
    ModalCompleteProgressComponent,
    ModalViewProgressComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
