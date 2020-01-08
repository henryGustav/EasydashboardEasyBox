'use strict';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../constant.service';
import { CrudService } from '../services/crud.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ArchivoService {
  cloudinarUpload: any;
  authToken: any;

  constructor(private crud: CrudService, private http: Http, public constantService: ConstantService) {
    this.authToken = localStorage.getItem('token');
  }

  public uploadArchivo(file: File) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authToken });
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      try {

        formData.append('file', file, file.name);
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (xhr.status == 500) {
              reject(xhr.response);
            }
            if (xhr.status == 200) {
              resolve(xhr.response);
            }
          }
        };

        xhr.open('POST', this.constantService.API_ENDPOINT + 'upload/productos/', true);
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        xhr.send(formData);
      } catch (e) {
        console.log(e);
      }
    });
  }

}
