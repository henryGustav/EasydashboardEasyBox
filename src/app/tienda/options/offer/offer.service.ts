'use strict';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()
export class OfferService {


    constructor(private http: Http, public constantService: ConstantService) {

    }


    saveOfferData(data: any) {
        const body = JSON.stringify(data);
        console.log(body);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.post(this.constantService.API_ENDPOINT + 'offers', body, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    getOfferData() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'offers', {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

//
    getOfferDetails(offerId: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'offers/' + offerId, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    UpdateOfferData(data, offerId: any) {
        const body = JSON.stringify(data);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.put(this.constantService.API_ENDPOINT + 'offers/' + offerId, body, {
            headers: headers
        }).map((data: Response) => data.json())
            .catch(this.handleError);
    }

    deleteOfferData(id: any) {
        const headers = new Headers();
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.delete(this.constantService.API_ENDPOINT + 'offers/' + id, {
            headers: headers
        }).map((data: Response) => data)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }

}
