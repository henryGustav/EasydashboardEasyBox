import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';
import {CrudService} from '../../services/crud.service';

@Injectable()
export class VariantService {
    cloudinarUpload: any;
    authToken: any;

    constructor(private http: Http, public constantService: ConstantService, private crud: CrudService) {
        this.authToken = localStorage.getItem('token');
        this.cloudinarUpload = this.constantService.cloudinarUpload;
    }

    saveVariantData(data: any) {
        const body = JSON.stringify(data);
        return this.crud.post('varients', body).map((data: Response) => data);
    }

    getAllVariantData(productId) {
        return this.crud.getOne('varients/by/product', productId, true).map((data: Response) => data);
    }

    getSingleVariantData(variantId) {
        return this.crud.getOne('varients', variantId, true).map((data: Response) => data);
    }

    updateVariantData(variantData, variantId) {
        const body = JSON.stringify(variantData);
        return this.crud.put('varients', body, variantId).map((data: Response) => data);
    }

    updateActiveVariantData(variantId) {
      return this.crud.delete('varients/disabled', variantId).map((data: Response) => data);
    }
}
