import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { ListUserLogsComponent } from './components/list-user-logs/list-user-logs.component';
import { ListAllLogsComponent } from './components/list-all-logs/list-all-logs.component';
import { RegisterComponent } from './pages/register/register.component';
import { ListUserLogsArchivedComponent } from './components/list-user-logs-archived/list-user-logs-archived.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'yours', component: ListUserLogsComponent },
      { path: 'yours/archived', component: ListUserLogsArchivedComponent },
      { path: 'all', component: ListAllLogsComponent },
      { path: '', redirectTo: 'yours', pathMatch: 'full' }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent, 
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Otherwise redirect to home
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
