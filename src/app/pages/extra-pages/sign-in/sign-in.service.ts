'use strict';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()
export class LoginService implements OnInit {


    constructor(private http: Http, public constantService: ConstantService) {

    }


    loginData(login: any) {
        const body = JSON.stringify(login);
        //console.log(body);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.constantService.Login_Auth + 'users/login', body, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }


//
    getUsersdata() {
        const userId = localStorage.getItem('id');
        console.log(userId);
        const headers = new Headers();
        const authToken = localStorage.getItem('token');
        //console.log(authToken);
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'users/me/' + userId, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error.json());
    }

/////////////////Message SOCKET ///////////////


//Authentication


    isAuthenticated() {
        const user = localStorage.getItem('token') !== null;

        if (user) {
            return true;
        } else {
            return false;
        }
    }

    ngOnInit() {

    }
}
