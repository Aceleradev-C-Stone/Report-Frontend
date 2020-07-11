import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import pt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { LevelIndicatorComponent } from './components/level-indicator/level-indicator.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AlertComponent } from './components/alert/alert.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { ListAllLogsComponent } from './components/list-all-logs/list-all-logs.component';
import { ListUserLogsComponent } from './components/list-user-logs/list-user-logs.component';
import { LogDetailsComponent } from './components/log-details/log-details.component';
import { LogTableSearchComponent } from './components/log-table-search/log-table-search.component';
import { LogTableComponent } from './components/log-table/log-table.component';
import { RegisterComponent } from './pages/register/register.component';
import { ListUserLogsArchivedComponent } from './components/list-user-logs-archived/list-user-logs-archived.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LogQueryPipe } from './pipes/log-query.pipe';

// Register portuguese locale data
registerLocaleData(pt);

@NgModule({
   declarations: [
      AppComponent,
      AlertComponent,
      NavbarComponent,
      FooterComponent,
      SearchFormComponent,
      LevelIndicatorComponent,
      LoginComponent,
      RegisterComponent,
      DashboardComponent,
      LogTableSearchComponent,
      LogTableComponent,
      ListAllLogsComponent,
      ListUserLogsComponent,
      ListUserLogsArchivedComponent,
      LogDetailsComponent,
      ProfileComponent,
      LogQueryPipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
   ],
   providers: [
      { provide: LOCALE_ID, useValue: 'pt-BR' },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
   ],
   bootstrap: [
      AppComponent,
   ]
})
export class AppModule { }
