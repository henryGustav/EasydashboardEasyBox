'use strict';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {CrudService} from '../../services/crud.service';

@Injectable()
export class ClientService {


    constructor(private http: Http, public crudService: CrudService) {
    }

    getUserData() {
        return this.crudService.get('clients', true).map((data: Response) => data);
    }

//
    getUserDataByIdData(userId: any) {
        return this.crudService.getOne('clients', userId, true).map((data: Response) => data);

    }

}
