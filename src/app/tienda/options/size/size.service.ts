'use strict';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()
export class SizeService {


    constructor(private http: Http, public constantService: ConstantService) {

    }


    saveSizeData(data: any) {
        const body = JSON.stringify(data);
        console.log(body);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.post(this.constantService.API_ENDPOINT + 'productsizes', body, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    getSizeData() {
        const headers = new Headers();
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'productsizes', {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    getSizeAllData(idUnidad) {
      const headers = new Headers();
      const authToken = localStorage.getItem('token');
      headers.append('Authorization', authToken);
      return this.http.get(this.constantService.API_ENDPOINT + 'productsizes/byUnidad/' + idUnidad + '/all', {
          headers: headers
      })
          .map((data: Response) => data.json())
          .catch(this.handleError);
  }

//
    getSizeDetails(sizeId: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'productsizes/' + sizeId, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    UpdateSizeData(data, sizeId: any) {
        const body = JSON.stringify(data);
        console.log(data);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.put(this.constantService.API_ENDPOINT + 'productsizes/' + sizeId, body, {
            headers: headers
        }).map((data: Response) => data.json())
            .catch(this.handleError);
    }

    inactiveSizeData(id: any) {
        const headers = new Headers();
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.delete(this.constantService.API_ENDPOINT + 'productsizes/inactive/' + id, {
            headers: headers
        }).map((data: Response) => data)
            .catch(this.handleError);
    }

    activeSizeData(id: any) {
      const headers = new Headers();
      const authToken = localStorage.getItem('token');
      headers.append('Authorization', authToken);
      return this.http.delete(this.constantService.API_ENDPOINT + 'productsizes/active/' + id, {
          headers: headers
      }).map((data: Response) => data)
          .catch(this.handleError);
  }

    private handleError(error: any) {
        return Observable.throw(error);
    }

}
