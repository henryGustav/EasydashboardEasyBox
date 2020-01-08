import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class CrudBaseService {
    protected data: any = {api: null};
    protected record: any = {api: null};
    private observable: Observable<any>;

    protected callCache(res: Response, post?: boolean) {
        this.record.api = res.json();
        (post) ? this.data.api.push(res.json()) : this.data.api = null; // Invalidate cache if not inserting
        return this.record.api;
    }

    protected extractData(res: Response) {
       if (!res){
         return [];
       }
       return res;
       /*
        this.observable = null;
        if (res.status >= 400) {
            return "FAILURE";
        } else if (res.status >= 200 && res.status <= 300) {

            return res.json() || [];
        }*/
    }

    protected handleError(error: Response | any) {
      return Observable.throw(error.error);
        //return Observable.throw(error.json());
    }
}
