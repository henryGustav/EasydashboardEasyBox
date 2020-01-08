'use strict';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../constant.service';
import {CrudService} from '../services/crud.service';

@Injectable()
export class CategoriesService {
    cloudinarUpload: any;
    authToken: any;

    constructor(private crud: CrudService, private http: Http, public constantService: ConstantService) {
        this.authToken = localStorage.getItem('token');
        this.cloudinarUpload = this.constantService.cloudinarUpload;
    }


    saveCategoryData(data: any) {
        const body = JSON.stringify(data);
        return this.crud.post('categories', body).map((data: Response) => data);
    }

    getCategoryDetails(id: any) {
        return this.crud.getOne('categories', id, true).map((data: Response) => data);
    }

    getSubCategoryData(categoryId: any) {
        return this.crud.getOne('subcategories/by/category', categoryId, true).map((data: Response) => data);
    }

    UpdateCategoryData(data, id: any) {
        const body = JSON.stringify(data);
        return this.crud.put('categories', body, id).map((data: Response) => data);
    }

    inactiveCategoryData(id: any) {
        return this.crud.delete('categories', id).map((data: Response) => data);
    }

    activeCategoryData(id: any) {
      return this.crud.delete('categories/active', id).map((data: Response) => data);
  }

    getCategoryData() {
        return this.crud.get('categories/all', true).map((data: Response) => data);
    }

}
