import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../constant.service';
import {CrudService} from '../services/crud.service';

@Injectable()
export class ProfileService {
    private authToken;
    private userId;

    constructor(private http: Http, public constantService: ConstantService, private crud: CrudService) {
        this.authToken = localStorage.getItem('token');
        this.userId = localStorage.getItem('id');
    }

    updatePassword(passwordData: any) { // userId means user/me _id

        const body = JSON.stringify(passwordData);
        const authToken = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.constantService.API_ENDPOINT + 'users/password/' + this.userId , passwordData, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    updateEmail(settingData: any) {
        const body = JSON.stringify(settingData);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.put(this.constantService.API_ENDPOINT + 'users/email/' + this.userId, body, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    getUsersdata() {
        const headers = new Headers();
        const authToken = localStorage.getItem('token');
        console.log(authToken);
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'users/me/' + this.userId, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error.json());
    }

}
