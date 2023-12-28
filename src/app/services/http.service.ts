import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpParamsOptions, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { Global } from '../Globals/global';
import { error } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  responseType: any = "arraybuffer";
  observe: any = "body";
  isShowLoader: boolean;
  contentType: string = "application/json";
  uploading: boolean;
  uploadProgress: any;

  constructor(private http: HttpClient) {

  }

  postMethod(url: string, params?: any, isShowLoader: boolean = true, responseType: string = "arraybuffer", observe = "body", contentType: string = "application/json"): Observable<any> {
    this.responseType = responseType;
    this.observe = observe;
    this.isShowLoader = isShowLoader;
    this.contentType = contentType;
    return this.httpClient("POST", Global.baseUrl + url, params);
  }


  getMethod(url: string, params?: any, isShowLoader: boolean = true, responseType: string = "arraybuffer", observe = "body", contentType: string = "application/json"): Observable<any> {
    this.responseType = responseType;
    this.observe = observe;
    this.isShowLoader = isShowLoader;
    this.contentType = contentType;
    return this.httpClient("GET", Global.baseUrl + url, params);
  }

  httpClient(method, url, params?): Observable<any> {
    let data: any;

    if (method == "POST") {
      data = new HttpRequest(method, url, params, {
        reportProgress: this.isShowLoader
        
      });

      this.uploading = true;
      this.http
        .request(data)
        .pipe(
          finalize(() => {
            this.uploading = false;
          })).subscribe(
            (event) => {
              if (event.type == HttpEventType.UploadProgress) {
                this.uploadProgress = Math.round(
                  (100 * event.loaded) / event.total
                );
              } else if (event instanceof HttpResponse) {
              }

            },
            (error) => {
              alert(error);
            }
          );
      // data =  this.http.post(url, params,
      //   {
      //     responseType: this.responseType
      //     , reportProgress: this.isShowLoader
      //     , observe: this.observe
      //     , headers: new HttpHeaders(
      //       { 'Content-Type': this.contentType },)
      //     // , params: new HttpParams({
      //     //   constructor(options: HttpParamsOptions = {} as HttpParamsOptions)
      //     //   ,has(param: string): boolean
      //     //   ,get(param: string): string | null
      //     //   ,getAll(param: string): string[] | null
      //     //   ,keys(): string[]
      //     //   ,append(param: string, value: string | number | boolean): HttpParams
      //     //   ,appendAll(params: { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; }): HttpParams
      //     //   ,set(param: string, value: string | number | boolean): HttpParams
      //     //   ,delete(param: string, value?: string | number | boolean): HttpParams
      //     //   ,toString(): string
      //     // },)
      //     , withCredentials: false
      //   });
    } else if (method == "GET") {
     data = this.http.get(url, params)
    }
   return data;
  }
}





// options: {
//   headers?: HttpHeaders | { [header: string]: string | string[] },
//   observe?: 'body' | 'events' | 'response',
//   params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> },
//   reportProgress?: boolean,
//   responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
//   withCredentials?: boolean,
// }