import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { IndexComponent } from './Views/index/index.component';
import { RegisterUserComponent } from './Views/User/register-user/register-user.component';
import { ListUserComponent } from './Views/User/list-user/list-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {UserService} from './Services/user.service';
import {ProcessHTTPMsgService} from './Services/process-httpmsg.service';
import { ErrorPageComponent } from './Views/error/error-page/error-page.component';
import { Error404Component } from './Views/error/error404/error404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomMaterialModule} from './Modules/CustomMaterialModule';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';




// Routes of application
const appRoutes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'user/register', component: RegisterUserComponent},
    {path: 'user/list', component: ListUserComponent},
    {path: 'error', component: ErrorPageComponent},
    {path: 'error404', component: Error404Component},
    {path: '**', redirectTo: '/error404'}
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegisterUserComponent,
    ListUserComponent,
    ErrorPageComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    CustomMaterialModule
  ],
  providers: [
      UserService,
      ProcessHTTPMsgService,
      {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
