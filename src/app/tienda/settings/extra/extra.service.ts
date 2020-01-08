'use strict';
import { Injectable, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../constant.service';
import { HttpResponse } from 'selenium-webdriver/http';


@Injectable()
export class ExtraService {


  constructor(private http: Http,
    public constantService: ConstantService) {

  }

  saveExtraData(data: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.post(this.constantService.API_ENDPOINT + 'extra', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  getExtraData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'extra', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  //
  getExtraDetails(extraId: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'extra/' + extraId, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  UpdateExtraData(data, extraId: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'extra/' + extraId, body, {
      headers: headers
    }).map((data: Response) => data.json())
      .catch(this.handleError);
  }

  deleteExtraData(id: any) {
    const headers = new Headers();
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'extra/' + id, {
      headers: headers
    }).map((data: Response) => data)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.json());
  }

}
