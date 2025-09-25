import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  BASE_URL: string = '';

  private formatErrors(error: any) {
    return throwError(error);
  }

     // GET METHOD
     get(path?: string, params: HttpParams = new HttpParams()): Observable<any> {
      return this.http.get(this.BASE_URL + 'relay-rest' + path,
       this.setSecureHeaders(sessionStorage.getItem('access-token')!)
       ).pipe(catchError(this.formatErrors));
    }

     // GETFILE METHOD
     getFile(path?: string, params: HttpParams = new HttpParams()): Observable<any> {
      return this.http.get(this.BASE_URL + 'relay-rest' + path,
       this.setSecureFileReaderHeaders(sessionStorage.getItem('access-token')!)
       ).pipe(catchError(this.formatErrors));
    }

    //  POST METHOD
    post(path?: string, body: Object = {}): Observable<any> {
      return this.http.post(this.BASE_URL + 'relay-rest' + path,
        body, this.setSecureHeaders(sessionStorage.getItem('access-token')!))
        .pipe(catchError(this.formatErrors));
    }

    //  LOGIN POST METHOD
    loginPost(path: string, body: Object = {}): Observable<any> {
      return this.http.post( path,
        body, { observe: 'response' })
        .pipe(catchError(this.formatErrors));
    }

    //  PUT METHOD
    put(path?: string, body: Object = {}): Observable<any> {
      return this.http.put(this.BASE_URL + 'relay-rest' +  path!,
        body, this.setSecureHeaders(sessionStorage.getItem('access-token')!))
        .pipe(catchError(this.formatErrors));
    }

      // DELTE METHOD
    delete(path?: string, params: HttpParams = new HttpParams()): Observable<any> {
      return this.http.delete(this.BASE_URL + 'relay-rest' + path,
       this.setSecureHeaders(sessionStorage.getItem('access-token')!))
        .pipe(catchError(this.formatErrors));
    }

      //  POSTBLOB METHOD
     postBlob(path?: string, body: Object = {}): Observable<any> {
      return this.http.post(this.BASE_URL + 'relay-rest' + path,
        body, { responseType : 'blob' })
        .pipe(catchError(this.formatErrors));
    }

    // getAuthLess METHOD
    getAuthLess(path?: string, params: HttpParams = new HttpParams()): Observable<any> {
      return this.http.get(this.BASE_URL + 'relay-rest' + path,
      ).pipe(catchError(this.formatErrors));
    }

    ///////////////// All header function ////////////////////

    setSecureHeaders(token: string) {
      const secureHttpOptions: Object = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          Accept: 'application/json',
          Authorization: token,
        }),
        responseType: 'json',
        observe: 'response',
      };

      return secureHttpOptions;
    }

    setSecureFileReaderHeaders(token: string) {
      const secureHttpOptions: Object = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          Accept: 'application/json',
          Authorization: token,
        }),
        responseType: '*/*',

        observe: 'response',
      };

      return secureHttpOptions;
    }
}
