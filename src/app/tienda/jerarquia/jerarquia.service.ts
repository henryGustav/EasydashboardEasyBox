'use strict';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from 'app/constant.service';
import { CrudService } from 'app/tienda/services/crud.service';


@Injectable()
export class JerarquiaService {

  cloudinarUpload: any;
  authToken: any;

  constructor(private http: Http, public crudService: CrudService, public constantService: ConstantService) {
    this.authToken = localStorage.getItem('token');
        this.cloudinarUpload = this.constantService.cloudinarUpload;
  }

  getUserDataByType(idTipo: any) {
    return this.crudService.getOne('equipo/tipos', idTipo, true).map((data: Response) => data);
  }

  getMembersDataByIdData(userId: any) {
    return this.crudService.getOne('equipo', userId, true).map((data: Response) => data);
  }

  getMembersAvailable(idRolJefe: any) {
    return this.crudService.getOne('equipo/disponibles', idRolJefe, true).map((data: Response) => data);
  }

  addMemberToGroup(jefeId: any, memberId: any) {
    return this.crudService.putTwo('equipo/agregar', null, jefeId, memberId).map((data: Response) => data);
  }

 deleteMemberToGroup(jefeId: any, memberId: any) {
    return this.crudService.putTwo('equipo/eliminar', null, jefeId, memberId).map((data: Response) => data);
  }
}
