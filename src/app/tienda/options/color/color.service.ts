'use strict';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()
export class ColorService {


    constructor(private http: Http, public constantService: ConstantService) {

    }

    saveColorData(data: any) {
        const body = JSON.stringify(data);
        console.log(body);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.post(this.constantService.API_ENDPOINT + 'productcolors', body, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    getColorData() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'productcolors', {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    getColorAllData() {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const authToken = localStorage.getItem('token');
      headers.append('Authorization', authToken);
      return this.http.get(this.constantService.API_ENDPOINT + 'productcolors/all', {
          headers: headers
      })
          .map((data: Response) => data.json())
          .catch(this.handleError);
  }

//
    getColorDetails(colorId: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'productcolors/' + colorId, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    UpdateColorData(data, colorId: any) {
        const body = JSON.stringify(data);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.put(this.constantService.API_ENDPOINT + 'productcolors/' + colorId, body, {
            headers: headers
        }).map((data: Response) => data.json())
            .catch(this.handleError);
    }

    deleteColorData(id: any) {
        const headers = new Headers();
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.delete(this.constantService.API_ENDPOINT + 'productcolors/' + id, {
            headers: headers
        }).map((data: Response) => data)
            .catch(this.handleError);
    }

    activeColorData(id: any) {
      const headers = new Headers();
      const authToken = localStorage.getItem('token');
      headers.append('Authorization', authToken);
      return this.http.delete(this.constantService.API_ENDPOINT + 'productcolors/active/' + id, {
          headers: headers
      }).map((data: Response) => data)
          .catch(this.handleError);
  }

    private handleError(error: any) {
        return Observable.throw(error);
    }

}
