'use strict';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../constant.service';
import {CrudService} from '../services/crud.service';

@Injectable()
export class RolesService {
    cloudinarUpload: any;
    authToken: any;

    constructor(private crud: CrudService, private http: Http, public constantService: ConstantService) {
        this.authToken = localStorage.getItem('token');
        this.cloudinarUpload = this.constantService.cloudinarUpload;
    }


    saveRolData(data: any) {
        const body = JSON.stringify(data);
        return this.crud.post('rol', body).map((data: Response) => data);
    }

    getRolDetails(id: any) {
        return this.crud.getOne('rol', id, true).map((data: Response) => data);
    }

    UpdateRolData(data, id: any) {
        const body = JSON.stringify(data);
        return this.crud.put('rol', body, id).map((data: Response) => data);
    }

    getRolData() {
        return this.crud.get('rol', true).map((data: Response) => data);
    }

}
