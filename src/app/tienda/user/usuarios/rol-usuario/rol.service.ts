'use strict';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from 'app/constant.service';
import { CrudService } from '../../../services/crud.service';

@Injectable()
export class RolService {

  cloudinarUpload: any;
  authToken: any;

  constructor(private http: Http, public crudService: CrudService, public constantService: ConstantService) {
    this.authToken = localStorage.getItem('token');
        this.cloudinarUpload = this.constantService.cloudinarUpload;
  }

  getRolData() {
    return this.crudService.get('rol', true).map((data: Response) => data);
  }

  getRolDataByIdData(userId: any) {
    return this.crudService.getOne('rol', userId, true).map((data: Response) => data);
  }

  saveRolData(data: any) {
    const body = JSON.stringify(data);
    return this.crudService.post('rol', body).map((data: Response) => data);
}
  updateRolData(data, productId: any) {
    const body = JSON.stringify(data);
    return this.crudService.put('rol', data, productId).map((data: Response) => data);
  }

  getUserRolData(userId: any) {
    return this.crudService.getOne('rol/user', userId, true).map((data: Response) => data);
  }

}
