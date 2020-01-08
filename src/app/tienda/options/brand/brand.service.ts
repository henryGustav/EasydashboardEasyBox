'use strict';
import { Injectable, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../constant.service';
import { HttpResponse } from 'selenium-webdriver/http';


@Injectable()
export class BrandService {


  constructor(private http: Http,
    public constantService: ConstantService) {

  }

  saveBrandData(data: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.post(this.constantService.API_ENDPOINT + 'brands', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  getBrandData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'brands', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  getBrandAllData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'brands/all', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  //
  getBrandDetails(brandId: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'brands/' + brandId, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  UpdateBrandData(data, brandId: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'brands/' + brandId, body, {
      headers: headers
    }).map((data: Response) => data.json())
      .catch(this.handleError);
  }

  deleteBrandData(id: any) {
    const headers = new Headers();
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'brands/' + id, {
      headers: headers
    }).map((data: Response) => data)
      .catch(this.handleError);
  }

  activeBrandData(id: any) {
    const headers = new Headers();
    const authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'brands/active/' + id, {
      headers: headers
    }).map((data: Response) => data)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
