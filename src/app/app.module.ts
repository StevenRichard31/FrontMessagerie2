import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { IndexComponent } from './Views/index/index.component';
import { RegisterUserComponent } from './Views/User/register-user/register-user.component';
import { ListUserComponent } from './Views/User/list-user/list-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './Services/user.service';



// Routes of application
const appRoutes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'user/register', component: RegisterUserComponent},
    {path: 'user/list', component: ListUserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegisterUserComponent,
    ListUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
      UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
