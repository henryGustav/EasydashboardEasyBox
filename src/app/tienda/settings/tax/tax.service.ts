'use strict';
import { Injectable, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../constant.service';
import { HttpResponse } from 'selenium-webdriver/http';


@Injectable()
export class TaxService {


  constructor(private http: Http,
    public constantService: ConstantService) {

  }

  saveTaxData(data: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.post(this.constantService.API_ENDPOINT + 'tax', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  getTaxData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'tax', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  //
  getTaxDetails(taxId: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'tax/' + taxId, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  UpdateTaxData(data, taxId: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'tax/' + taxId, body, {
      headers: headers
    }).map((data: Response) => data.json())
      .catch(this.handleError);
  }

  deleteTaxData(id: any) {
    const headers = new Headers();
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'tax/' + id, {
      headers: headers
    }).map((data: Response) => data)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.json());
  }

}
