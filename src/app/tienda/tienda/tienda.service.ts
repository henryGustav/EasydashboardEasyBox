'use strict';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../constant.service';
import {CrudService} from '../services/crud.service';

@Injectable()
export class TiendaService {
    cloudinarUpload: any;
    authToken: any;

    constructor(private crud: CrudService, private http: Http, public constantService: ConstantService) {
        this.authToken = localStorage.getItem('token');
        this.cloudinarUpload = this.constantService.cloudinarUpload;
    }


    saveTiendaData(data: any) {
        const body = JSON.stringify(data);
        return this.crud.post('tienda', body).map((data: Response) => data);
    }

    getTiendaDetails(id: any) {
        return this.crud.getOne('tienda', id, true).map((data: Response) => data);
    }

    updateTiendaData(data, id: any) {
        const body = JSON.stringify(data);
        return this.crud.put('tienda', body, id).map((data: Response) => data);
    }

    inactiveTiendaData(id: any) {
        return this.crud.delete('tienda', id).map((data: Response) => data);
    }

    activeTiendaData(id: any) {
      return this.crud.delete('tienda/active', id).map((data: Response) => data);
  }

    getTiendaData() {
        return this.crud.get('tienda/all', true).map((data: Response) => data);
    }

}
