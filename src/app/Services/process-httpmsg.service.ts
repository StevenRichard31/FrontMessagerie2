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
      /* let errMsg: string;


       if (error.error instanceof ErrorEvent) {
         errMsg = error.error.message;
       } else {
         errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
       }*/

    // return throwError(errMsg);
    // return throwError(error);

      if (httpErrorResponse.error.error) {
          if (httpErrorResponse.error.error.name === 'SequelizeValidationError') {
              const errors = httpErrorResponse.error.error.errors;
              return errors;
              // return httpErrorResponse;
          }
      } else {
          const error1 =  JSON.stringify(httpErrorResponse);
          const navigationExtras: NavigationExtras = {state:  {error: error1} } ;
          this.router.navigate(['error'], navigationExtras);
      }

  }


}
