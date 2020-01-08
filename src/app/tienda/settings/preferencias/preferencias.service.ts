'use strict';
import { Injectable, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../constant.service';
import { Body } from '@angular/http/src/body';


@Injectable()
export class PreferenciasService {


    constructor(private http: Http,
        public constantService: ConstantService) {

    }

    getPreferencias() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'preferencias/2', {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    getPreferenciasMovil() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'preferencias/preferenciasMovil/2', {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }
    

    body = new Preferencia();
    editarPreferencia(id, valorTexto) {
        this.body._id = id;
        this.body.valorTexto = valorTexto;
        let body = JSON.stringify(this.body);
        
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.put(this.constantService.API_ENDPOINT + 'preferencias/', body, {
            headers: headers
        }).map((data: Response) => data.json())
            .catch(this.handleError);
    }
    private handleError(error: any) {
        return Observable.throw(error.json());
    }

}

export class Preferencia {
    _id: string;
    codigo: string;
    valorTexto: string;

}

