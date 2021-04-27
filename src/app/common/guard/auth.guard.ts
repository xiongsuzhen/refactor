import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild,
  CanLoad,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/components/login/login/user.service';
import { HttpClientUtil } from 'src/app/common/utils/http-client-util.service';
import { async } from '@angular/core/testing';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { UrlWhiteList } from 'src/app/common/guard/url-white-list';

@Injectable({
  providedIn: 'root',
})
export class  AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private userService: UserService,
    private router: Router,
    private httpUtil: HttpClientUtil
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('current url=', state.url);
    let accessableMenus = this.userService.getUserMenus();
    // console.log('当前用户可访问的菜单=', accessableMenus);
    //先检查白名单
    if (this.checkWhiteList(state.url)) {
      return true;
    }
    if (state.url.indexOf('error-page') >= 0) {
      return true;
    }
    if (state.url.indexOf('profile') >= 0) {
      return true;
    }
    if (state.url.indexOf('board') >= 0) {
      return true;
    }
    //判断是否已登录
    if (this.userService.checkLogin()) {
      if ('/page-index' == state.url) {
        return true;
      }
      //登录情况下判断是否有访问菜单的权限
      if (accessableMenus) {
        return this.enableAccessMenu(state.url, accessableMenus);
      } else {
        // return false;
        this.router.navigateByUrl('/error-page/403');
      }
    } else {
      this.router.navigateByUrl('/login');
    }

    //有token情况下做接口权限二次验证，不单独发接口验证请求，放到response-interceptor.ts实现
    // (async function(userService: UserService){
    //   try{
    //     console.log('Do some thing, ' + new Date());
    //     let result = await userService.apiCheck();
    //     console.log('接口响应验证结果==', result);
    //     userService.apiCheckPass = (200 == result["code"]);
    //     console.log('*****=', userService.apiCheckPass);
    //     console.log('Do other thing, ' + new Date());
    //   }catch(e){
    //     console.log('异常:', e);
    //   }
    // })(this.userService);
  }

  checkWhiteList(accessUrl: string): boolean {
    let allow = false;
    let urls = UrlWhiteList.urls;
    // console.log('白名单数据=', urls);
    UrlWhiteList.urls.forEach((item) => {
      if (item === accessUrl || accessUrl.indexOf(item) >= 0) {
        allow = true;
      }
    });

    return allow;
  }

  enableAccessMenu(url: string, menus: []): boolean {
    let enable = false;
    menus.forEach((item) => {
      let subMenus: [] = item['children'];
      subMenus.forEach((menu) => {
        if (url.indexOf(menu['href']) >= 0) {
          // if(menu["href"] == url){
          enable = true;
        }
      });
    });
    if (!enable) {
      this.router.navigateByUrl('/error-page/403');
    }
    return enable;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log('加载子路由[%s]，执行验证方法canActivateChild()', state.url);
    return this.canActivate(childRoute, state);
  }

  canLoad(
    route: import('@angular/router').Route,
    segments: import('@angular/router').UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log('延迟加载 route =', route);
    console.log('延迟加载 segments =', segments);
    return true;
  }
}
