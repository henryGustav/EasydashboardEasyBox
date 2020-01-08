import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private toaster: ToastrService, private router: Router, ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do((event: HttpEvent<any>) => {
      /*if (event instanceof HttpResponse) {
        // do stuff with response if you want
        console.log(event.body)
        if (!event.body) {
          console.log('gabriel: ' + event.body);
          event = event.clone<any>({ body: [{}] });
          return event;
        }

      }*/
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {

        if (err.status === 401) {
          // redirect to the login route
          this.toaster.error('No autorizado', 'Error');
          this.router.navigate(['/dashboard']);
          // or show a modal
        }
        if (err.status === 403) {
          // redirect to the login route
          this.toaster.warning('Sesión Expirada', 'Logout');
          localStorage.clear();
          this.router.navigate(['/pages/sign-in']);
          // or show a modal
        }
      }
    });
  }
}
