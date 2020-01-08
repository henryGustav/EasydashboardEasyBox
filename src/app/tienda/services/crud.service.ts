import {MdSnackBar} from '@angular/material';
import {CrudBaseService} from './base.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ConstantService} from '../../constant.service';

@Injectable()
export class CrudService extends CrudBaseService {
    private authToken = localStorage.getItem('token');
    private headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.authToken});
   // private options = new RequestOptions({headers: this.headers});

    constructor(private constService: ConstantService, private http: HttpClient, private snack: MdSnackBar) {
        super();
    }

    get(api: string, auth?: boolean): Observable<any> { //auth
        if (auth) {
          this.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
            return this.http.get(this.constService.API_ENDPOINT + api + '/', {headers: this.headers})
                .map(this.extractData)
                .share()
                .catch(this.handleError);
        }
        else {
            return this.http.get(this.constService.API_ENDPOINT + api + '/')
                .map(this.extractData)
                .share()
                .catch(this.handleError);
        }
    }

    getOne(api: string, id: string, auth?: boolean): Observable<any> {
        if (auth) {
          this.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
            return this.http.get(`${this.constService.API_ENDPOINT}${api}/${id}`, {headers: this.headers})
                .map(this.extractData)
                .share()
                .catch(this.handleError);
        }
        else {
            return this.http.get(`${this.constService.API_ENDPOINT}${api}/${id}`)
                .map(this.extractData)
                .share()
                .catch(this.handleError);
        }
    }

    getTwo(api: string, id: string, idAux: string, auth?: boolean): Observable<any> {
      if (auth) {
        this.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
          return this.http.get(`${this.constService.API_ENDPOINT}${api}/${id}/${idAux}`, {headers: this.headers})
              .map(this.extractData)
              .share()
              .catch(this.handleError);
      }
      else {
        return this.http.get(`${this.constService.API_ENDPOINT}${api}/${id}/${id}`)
              .map(this.extractData)
              .share()
              .catch(this.handleError);
      }
  }


    post(api: string, body: any): Observable<any> {
      this.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(this.constService.API_ENDPOINT + api + '/', body, {headers: this.headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    put(api: string, body: any, id: string): Observable<any> {
      this.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.put(`${this.constService.API_ENDPOINT}${api}/${id}`, body, {headers: this.headers})
            .map(this.extractData)
            .catch(this.handleError);
    }
    putTwo(api: string, body: any, id: string, idNew: string): Observable<any> {
      this.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
      return this.http.put(`${this.constService.API_ENDPOINT}${api}/${id}/${idNew}`, body, {headers: this.headers})
          .map(this.extractData)
          .catch(this.handleError);
  }

    delete(api: string, id: string): Observable<any> {
        return this.http.delete(`${this.constService.API_ENDPOINT}${api}/${id}`, {headers: this.headers})
            .map(this.extractData)
            .catch(this.handleError);
    }
}
