import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { NzMessageService } from 'ng-zorro-antd/message';
import { config } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class HttpClientUtil {
  private api_server = '';
  private file_server = '';

  constructor(private hc: HttpClient) {}

  private checkRequestUrl(requestUrl: string): boolean {
    if (!requestUrl || '' == requestUrl.trim() || null == requestUrl) {
      console.error('请求url为空，请检查');
      return false;
    }
    //  if(requestUrl && requestUrl.indexOf("/") != 0){
    //      console.error('请求url不合法，请检查：', requestUrl);
    //      return false;
    //  }
    return true;
  }

  private checkPostData(postData: any): boolean {
    // 常规空检查
    if (!postData || null == postData) {
      console.error('请求数据为空，请检查');
      return false;
    }
    // 空数组/空对象检查
    //  if(Object.keys(postData) && Object.keys(postData).length < 1){
    //    console.error('请求数据为空，请检查');
    //    return false;
    //  }
    return true;
  }

  // 提交到正式接口get方法
  public get(requestUrl: string, isFullUrl?: boolean): Observable<any> {
    if (isFullUrl) {
      return this.hc.get(requestUrl);
    } else {
      if (this.checkRequestUrl(requestUrl)) {
        return this.hc.get(this.api_server + requestUrl);
      }
    }
  }

  // 提交到正式接口get方法
  public getWithOption(
    requestUrl: string,
    params: HttpParams,
    isFullUrl?: boolean
  ): Observable<any> {
    if (isFullUrl) {
      if (params) {
        return this.hc.get(requestUrl, { params });
      } else {
        return this.hc.get(requestUrl);
      }
    } else {
      if (params) {
        return this.hc.get(this.api_server + requestUrl, { params });
      } else {
        return this.hc.get(this.api_server + requestUrl);
      }
    }
  }

  // 提交到正式接口post方法
  public post(
    requestUrl: string,
    postData: any,
    fullUrl?: boolean,
    httpOption?: object
  ): Observable<any> {
    if (this.checkRequestUrl(requestUrl) && this.checkPostData(postData)) {
      let postUrl = requestUrl;
      if (!fullUrl) {
        postUrl = this.api_server + requestUrl;
      }
      if (httpOption) {
        return this.hc.post(postUrl, postData, httpOption);
      } else {
        return this.hc.post(postUrl, postData);
      }
    }
  }
  public postFile(
    requestUrl: string,
    postData: any,
    fullUrl?: boolean,
    httpOption?: object
  ): Observable<any> {
    if (this.checkRequestUrl(requestUrl) && this.checkPostData(postData)) {
      let postUrl = requestUrl;
      if (!fullUrl) {
        postUrl = this.file_server + requestUrl;
      }
      if (httpOption) {
        return this.hc.post(postUrl, postData, httpOption);
      } else {
        return this.hc.post(postUrl, postData);
      }
    }
  }

  // 提交到正式接口get方法
  public getData(api_url: string, data?: any): Observable<any> {
    if (this.checkRequestUrl(api_url)) {
      return this.hc.get(this.api_server + api_url, { params: data });
    }
  }
  // 提交到正式接口get方法
  public getDataMode(api_url: string, data?: any): Observable<any> {
    if (this.checkRequestUrl(api_url)) {
      return this.hc.get('http:// 192.168.0.102:10001' + api_url, {
        params: data,
      });
    }
  }
  // 提交到正式接口get方法
  public getFileData(api_url: string, data?: any): Observable<any> {
    if (this.checkRequestUrl(api_url)) {
      return this.hc.get(this.file_server + api_url, { params: data });
    }
  }
  // 提交到正式接口put方法
  public putFile(
    requestUrl: string,
    putData: any,
    httpOption?: object
  ): Observable<any> {
    if (this.checkRequestUrl(requestUrl) && this.checkPostData(putData)) {
      if (httpOption) {
        return this.hc.put(this.api_server + requestUrl, putData, httpOption);
      } else {
        return this.hc.put(this.file_server + requestUrl, putData);
      }
    }
  }
  public put(
    requestUrl: string,
    putData: any,
    isFullUrl?: boolean,
    httpOption?: object
  ): Observable<any> {
    if(isFullUrl){
      if (this.checkRequestUrl(requestUrl) && this.checkPostData(putData)) {
        if (httpOption) {
          return this.hc.put(requestUrl, putData, httpOption);
        } else {
          return this.hc.put(requestUrl, putData);
        }
      }
    }
    else{
      if (this.checkRequestUrl(requestUrl) && this.checkPostData(putData)) {
        if (httpOption) {
          return this.hc.put(this.api_server + requestUrl, putData, httpOption);
        } else {
          return this.hc.put(this.api_server + requestUrl, putData);
        }
      }
    }
  }

  // 提交到正式接口delete方法
  public del(requestUrl: string, data?: any): Observable<any> {
    if (this.checkRequestUrl(requestUrl)) {
      return this.hc.delete(this.api_server + requestUrl, { params: data });
    }
  }
  // 提交到正式接口delete方法
  public delFile(requestUrl: string, data?: any): Observable<any> {
    if (this.checkRequestUrl(requestUrl)) {
      return this.hc.delete(this.file_server + requestUrl, { params: data });
    }
  }
  // 走本地proxy.config.json配置的get方法
  public localProxyGet(requestUrl: string): Observable<any> {
    if (this.checkRequestUrl(requestUrl)) {
      return this.hc.get(requestUrl);
    }
  }

  // 走本地proxy.config.json配置的post方法
  public localProxyPost(
    requestUrl: string,
    postData: any,
    httpOption?: object
  ): Observable<any> {
    if (this.checkRequestUrl(requestUrl) && this.checkPostData(postData)) {
      if (httpOption) {
        return this.hc.post(requestUrl, postData, httpOption);
      } else {
        return this.hc.post(requestUrl, postData);
      }
    }
  }

  public responseIsOk(res: any): boolean {
    let isOk = false;
    if (res && res['code'] && 200 == res['code']) {
      isOk = true;
    } else {
      this.printResponseMessage(res);
    }

    return isOk;
  }

  private getResponseCode(res: any): string {
    if (res && res['code']) {
      return res['code'];
    }
    return 'response code attribute not exist';
  }

  public getResponseMessage(res: any): string {
    if (res && res['msg']) {
      return res['msg'];
    }
    return 'response msg attribute not exist';
  }

  getResponseData(res: any): any {
    if (res && res['data']) {
      if (res['data'].length < 1) {
        return null;
      }
      return res['data'];
    }
    console.error('response data attribute not exist');
    return null;
  }

  dataNotFound(res: any): boolean {
    let dataNotFound = false;
    if (res && res['code']) {
      if (Number(res['code']) == 404) {
        return (dataNotFound = true);
      }
    }
    return dataNotFound;
  }

  getPageList(res: any): any {
    if (res && res['data']) {
      if (res['data'].length < 1) {
        return null;
      }
      return res['data']['list'];
    }
    console.error('response data attribute not exist');
    return null;
  }

  getPageInfo(res: any): any {
    if (res && res['data']) {
      if (res['data'].length < 1) {
        return null;
      }
      let result = res['data'];
      delete result['list'];
      return result;
    }
    console.error('response data attribute not exist');
    return null;
  }

  private printResponseMessage(res: any): void {
    console.error(
      '接口响应异常，响应代码[%s], 异常原因：%s',
      this.getResponseCode(res),
      this.getResponseMessage(res)
    );
  }

  public sucTips(msg: string): void {
    if (msg && '' != msg.trim()) {
      // this.msgService.create('success', msg);
    }
  }

  public errorTips(msg: string): void {
    if (msg && '' != msg.trim()) {
      // this.msgService.create('error', msg);
    }
  }
}
