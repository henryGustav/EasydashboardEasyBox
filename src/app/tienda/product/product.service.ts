'use strict';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {ConstantService} from '../../constant.service';
import {CrudService} from '../services/crud.service';

@Injectable()
export class ProductsService {

    cloudinarUpload: any;
    authToken: any;

    constructor(private crud: CrudService, private http: Http, public constantService: ConstantService) {
        this.authToken = localStorage.getItem('token');
        this.cloudinarUpload = this.constantService.cloudinarUpload;
    }

    getUnitMeasurement(): any {
        return this.crud.get('unidades', true).map((data: Response) => data);
      }

    getCategoryData() {
        return this.crud.get('categories', true).map((data: Response) => data);
    }

    getCategoryAllData() {
        return this.crud.get('categories/category/allData', true).map((data: Response) => data);
    }

    saveProductData(data: any) {
        const body = JSON.stringify(data);
        return this.crud.post('products', body).map((data: Response) => data);
    }

    getProductData() {
        return this.crud.get('products', true).map((data: Response) => data);
    }

    getProductDataByTienda(idTienda) {
      return this.crud.getOne('products/tienda', idTienda, true).map((data: Response) => data);
  }

    getSubCategoryData(catId) {
        return this.crud.getOne('subcategories/by/category', catId, true).map((data: Response) => data);
    }

    getColorData() {
        return this.crud.get('productcolors', true).map((data: Response) => data);
    }


    getSizeDataByUnidad(idUnidad) {
        return this.crud.get('productsizes/byUnidad/' + idUnidad, true).map((data: Response) => data);
    }

    getBrandData() {
        return this.crud.get('brands', true).map((data: Response) => data);
    }

    getTiendaData() {
      return this.crud.get('admin/tiendas', true).map((data: Response) => data);
    }


    getProductDetails(productId: any) {
        return this.crud.getOne('products', productId, true).map((data: Response) => data);
    }

    UpdateProductData(data, productId: any) {
        const body = JSON.stringify(data);
        return this.crud.put('products', data, productId).map((data: Response) => data);
    }

    deleteProductData(id: any) {
        return this.crud.delete('products', id).map((data: Response) => data);
    }



}
