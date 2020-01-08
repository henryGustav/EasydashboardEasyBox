'use strict';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../constant.service';
import {CrudService} from '../services/crud.service';

@Injectable()
export class DemoService {


    constructor(private http: Http, public constantService: ConstantService, private crud: CrudService) {
    }




    getSubCategoryData(codPlanificacion: any) {
        return this.getOne(codPlanificacion).map((data: Response) => data);
    }

    getOne(id): Observable<any> {

          return this.http.get(`http://10.103.0.74:8082/mus/rest/demo/${id}`)
              .map(this.extractData)
              .share()
              .catch(this.handleError);

  }

    private handleError(error: any) {
        return Observable.throw(error.json());
    }

    protected extractData(res: Response) {
      if (!res){
        return [];
      }
      return res;
   }

}
