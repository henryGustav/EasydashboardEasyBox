'use strict';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../constant.service';

@Injectable()
export class OrderEndService {

    constructor(private http: Http, public constantService: ConstantService) {
    }


    getOrderData() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'orders/ended', {
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

    private handleError(error: any) {
        return Observable.throw(error);
    }

}
