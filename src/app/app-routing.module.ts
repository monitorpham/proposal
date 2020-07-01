import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { UserManagementComponent } from './user-management/user-management.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { UserManagementComponent } from './user-management/user-management.component';
import { SettingsComponent } from './account/settings/settings.component' 
import { PasswordComponent } from './account/password/password.component' 
import { RegisterComponent } from './account/register/register.component'

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent ,  canActivate: [AuthGuard]},
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'password', component: PasswordComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
