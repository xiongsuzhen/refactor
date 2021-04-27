import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { UserService } from 'src/app/components/login/user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): import('rxjs').Observable<HttpEvent<any>> {
    // console.log('AuthInterceptor token=', this.userService.getAuthToken());
    if (this.userService.getAuthToken()) {
      const token = this.userService.getAuthToken();
      // const newHeaders = req.headers;
      // newHeaders.set('token', token);
      // newHeaders.set('userId', userId);
      if (token && null != token) {
        const authReq = req.clone({
          headers: req.headers
            .set('Accept', 'application/json')
            .set('token', token),
        });
        return next.handle(authReq);
      } else {
        return next.handle(req);
      }
    } else {
      return next.handle(req);
    }
  }
}
