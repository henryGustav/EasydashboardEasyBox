'use strict';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';
import {CrudService} from '../../services/crud.service';

@Injectable()
export class UnidadesService {
    cloudinarUpload: any;
    authToken: any;

    constructor(private crud: CrudService, private http: Http, public constantService: ConstantService) {
        this.authToken = localStorage.getItem('token');
        this.cloudinarUpload = this.constantService.cloudinarUpload;
    }


    saveUnidadData(data: any) {
        const body = JSON.stringify(data);
        return this.crud.post('unidades', body).map((data: Response) => data);
    }

    getUnidadDetails(id: any) {
        return this.crud.getOne('unidades', id, true).map((data: Response) => data);
    }

    getSubUnidadData(categoryId: any) {
        return this.crud.getOne('productsizes/byUnidad', categoryId, true).map((data: Response) => data);
    }

    UpdateUnidadData(data, id: any) {
        const body = JSON.stringify(data);
        return this.crud.put('unidades', body, id).map((data: Response) => data);
    }

    inactiveUnidadData(id: any) {
        return this.crud.delete('unidades', id).map((data: Response) => data);
    }

    activeUnidadData(id: any) {
      return this.crud.delete('unidades/active', id).map((data: Response) => data);
  }

    getUnidadData() {
        return this.crud.get('unidades/all', true).map((data: Response) => data);
    }

}
