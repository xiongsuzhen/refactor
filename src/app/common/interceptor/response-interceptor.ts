import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptor implements HttpInterceptor{

  constructor(private router: Router) { }

  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    // console.log('***ResponseInterceptor222***');
    return next.handle(req).pipe(tap(event => {
      if(event instanceof HttpResponse){
        // console.log('响应数据****', event.body);
        if(event.body.code == 401 || event.body.code == 402){
          //登录token过期，跳转到登录页
          this.router.navigateByUrl('/login');
        }
      }
    }));  
  }
}
