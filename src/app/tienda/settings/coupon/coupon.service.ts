'use strict';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()
export class CouponService {


    constructor(private http: Http, public constantService: ConstantService) {

    }


    saveCouponData(data: any) {
        const body = JSON.stringify(data);
        console.log(body);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.post(this.constantService.API_ENDPOINT + 'coupons', body, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    getCouponData() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'coupons', {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

//
    getCouponDetails(couponId: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'coupons/' + couponId, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    updateCoupunData(data, couponId: any) {
        const body = JSON.stringify(data);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.put(this.constantService.API_ENDPOINT + 'coupons/' + couponId, body, {
            headers: headers
        }).map((data: Response) => data.json())
            .catch(this.handleError);
    }

    inactiveCouponData(id: any) {
      const headers = new Headers();
      const authToken = localStorage.getItem('token');
      headers.append('Authorization', authToken);
      return this.http.delete(this.constantService.API_ENDPOINT + 'coupons/' + id, {
        headers: headers
      }).map((data: Response) => data)
        .catch(this.handleError);
    }

    activeCouponData(id: any) {
      const headers = new Headers();
      const authToken = localStorage.getItem('token');
      headers.append('Authorization', authToken);
      return this.http.delete(this.constantService.API_ENDPOINT + 'coupons/active/' + id, {
        headers: headers
      }).map((data: Response) => data)
        .catch(this.handleError);
    }
    private handleError(error: any) {
        return Observable.throw(error);
    }

}
