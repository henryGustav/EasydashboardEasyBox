'use strict';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../constant.service';
import {CrudService} from '../services/crud.service';

@Injectable()
export class SubCategoriesService {


    constructor(private http: Http, public constantService: ConstantService, private crud: CrudService) {
    }


    saveSubCategoryData(data: any) {
        const body = JSON.stringify(data);
        return this.crud.post('subcategories', body).map((data: Response) => data);
    }

    getSubCategoryData(categoryId: any) {
        return this.crud.getOne('subcategories/by/category', categoryId, true).map((data: Response) => data);
    }

    UpdateSubCategoryData(data, subCategoryId: any) {
        const body = JSON.stringify(data);
        return this.crud.put('subcategories', body, subCategoryId).map((data: Response) => data);
    }

    deleteSubCategoryData(id: any) {
        return this.crud.delete('subcategories', id).map((data: Response) => data);
    }

    private handleError(error: any) {
        return Observable.throw(error.json());
    }

}
