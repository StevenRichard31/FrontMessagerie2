import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {NavigationExtras, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor(private router: Router) { }

  public handleError(httpErrorResponse: HttpErrorResponse | any) {

      if (httpErrorResponse.error.error) {
          if (httpErrorResponse.error.error.name === 'SequelizeValidationError') {
              const errors = httpErrorResponse.error.error.errors;
              return errors;
          } else {
              return [{error: httpErrorResponse.error.error}];
          }
      } else {
          const error1 =  JSON.stringify(httpErrorResponse);
          // création DATA
          const navigationExtras: NavigationExtras = {state:  {error: error1} } ;
          // redirection vers une route avec DATA
          this.router.navigate(['error'], navigationExtras);
      }

  }

}
