'use strict';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { CrudService } from '../../services/crud.service';
import { ConstantService } from 'app/constant.service';
import { User } from '../../../interfaces/models';

@Injectable()
export class UsuarioService {

  cloudinarUpload: any;
  authToken: any;

  constructor(private http: Http, public crudService: CrudService, public constantService: ConstantService) {
    this.authToken = localStorage.getItem('token');
    this.cloudinarUpload = this.constantService.cloudinarUpload;
  }

  getUserData() {
    return this.crudService.get('usuarios', true).map((data: Response) => data);
  }

  getUserDataByIdData(userId: any) {
    return this.crudService.getOne('usuarios', userId, true).map((data: Response) => data);
  }

  saveUserData(data: any) {
    const body = JSON.stringify(data);
    return this.crudService.post('usuarios', body).map((data: Response) => data);
  }

  updateUserData(data, personId: any) {
    const body = JSON.stringify(data);
    return this.crudService.put('usuarios', data, personId).map((data: Response) => data);
  }

  deleteUserData(id: any) {
    return this.crudService.delete('usuarios', id).map((data: Response) => data);
  }

  getProvinciaData(id: any) {
    return this.crudService.getOne('admin/provincias', id, true).map((data: Response) => data);
  }

  getPaisData() {
    return this.crudService.get('admin/paises', true).map((data: Response) => data);
  }

  updateRolUserData(data, personId: any) {
    const body = JSON.stringify(data);
    return this.crudService.put('usuarios/roles', data, personId).map((data: Response) => data);
  }

}
