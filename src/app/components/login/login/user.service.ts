import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/config';
// import { SessionStorageService } from "angular-web-storage";
import { Router } from '@angular/router';
import { HttpClientUtil } from 'src/app/common/utils/http-client-util.service';
import { StorageService } from 'src/app/common/utils/storage-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = config.api_url;

  userKey = 'authenticated-user';

  tokenKey = 'auth-token';

  menusKey = 'accessable-menu';

  apiCheckPass = false;

  static loginedUser: Object;

  constructor(
    private http: HttpClient,
    private sessionStorage: StorageService,
    private router: Router,
    private httpUtil: HttpClientUtil
  ) {}

  login(loginInfo: object) {
    const url = '/userinf/pub/v1/user/login';
    return this.http.post<any>(this.baseUrl + url, loginInfo);
    // return this.http.post<any>(this.baseUrl + url, loginInfo, {observe: 'response'});

    // return this.http.post<any>(this.baseUrl + url, loginInfo, {
    //   observe: 'response',
    //   headers: {'token': 'faffafafsf','userId': '100'}
    // }
    // );
  }

  saveUserIntoSessionStorage(user: any) {
    this.sessionStorage.set(this.tokenKey, user['token']);
    this.sessionStorage.setObject(this.userKey, user);
  }

  updateUserMenus() {
    this.httpUtil
      .get('/userinf/pub/v1/role/getUserMenus?userId=' + this.getLoginUserId())
      .subscribe((res) => {
        if (this.httpUtil.responseIsOk(res)) {
          this.sessionStorage.setObject(
            this.menusKey,
            this.httpUtil.getResponseData(res)
          );
        }
      });
  }

  saveUserMenus(menus: any) {
    this.sessionStorage.setObject(this.menusKey, menus);
  }

  removeUserMenus(menus: any) {
    this.sessionStorage.remove(this.menusKey);
  }

  removeUserFromSessionStorage() {
    //clear all data(token and user)
    this.sessionStorage.clear();
  }

  getUserMenus(): any {
    return this.sessionStorage.getObject(this.menusKey);
  }

  getLoginUser(): object {
    return this.sessionStorage.getObject(this.userKey);
  }

  getLoginUserId(): any {
    return this.sessionStorage.getObject(this.userKey)['id'];
  }

  getAuthToken(): string {
    return this.sessionStorage.get(this.tokenKey);
  }

  async asyncRequest(checkStatus: boolean) {
    try {
      console.log('Do some thing, ' + new Date());
      const result = await this.apiCheck();
      console.log('接口响应结果==', result);
      console.log('Do other thing, ' + new Date());
      checkStatus = true;
    } catch (e) {
      console.log('异常:', e);
    }
  }

  async apiCheck() {
    const url = '/setting/pub/v1/setting/searchVal?config_item=CUSTOMER';
    return this.httpUtil.get(url).toPromise();
  }

  checkLogin(): boolean {
    let isLogin = false;
    // 先判断本地是否存在token
    if (this.getAuthToken()) {
      isLogin = true;
    } else {
      // 存在token的情况下调接口验证token的有效性
      // let res = await this.apiCheck();
      // isLogin = this.httpUtil.responseIsOk(res);
    }
    return isLogin;
  }
}
