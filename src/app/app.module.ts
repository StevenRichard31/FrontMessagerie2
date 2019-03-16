import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndexComponent } from './Views/index/index.component';
import { RegisterUserComponent } from './Views/User/register-user/register-user.component';
import {RouterModule, Routes} from '@angular/router';


// Routes of application
const appRoutes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'user/register', component: RegisterUserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
