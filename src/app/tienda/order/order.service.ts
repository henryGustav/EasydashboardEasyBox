'use strict';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers, RequestOptions, ResponseContentType, RequestMethod} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../constant.service';

@Injectable()
export class OrderService {

    constructor(private http: Http, public constantService: ConstantService) {
    }


    getOrderData() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'orders', {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

//
    getOrderDetails(orderId: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'orders/' + orderId, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    updateOrdersData(data: any, Id: any) {
        const body = JSON.stringify(data);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.put(this.constantService.API_ENDPOINT + 'orders/' + Id, body, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    deleteOrderData(id: any) {
        const headers = new Headers();
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.delete(this.constantService.API_ENDPOINT + 'orders/' + id, {
            headers: headers
        }).map((data: Response) => data)
            .catch(this.handleError);
    }


    generarOrdenPDF(orden): Observable<Response> {
      const headers = new Headers();
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        const options = new RequestOptions({ headers: headers });
        options.responseType = ResponseContentType.Blob;
        options.method = RequestMethod.Post;
        return this.http.post(this.constantService.API_ENDPOINT + 'download/generarOrden', orden, options).map((data: Response) => data)
            .catch(this.handleError);
  }

    private handleError(error: any) {
        return Observable.throw(error);
    }

}
