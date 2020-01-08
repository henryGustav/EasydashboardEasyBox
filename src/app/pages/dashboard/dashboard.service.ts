import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../constant.service';

@Injectable()
export class DashboardService {
    private authToken: any;

    constructor(private http: Http, public constantService: ConstantService) {
        this.authToken = localStorage.getItem('token');
    }

    getSalesData() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'dashboard/all/counts/1', {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    getGraphBarData() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'dashboard/graphs/bar', {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    getGraphPieData() {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const authToken = localStorage.getItem('token');
      headers.append('Authorization', authToken);
      return this.http.get(this.constantService.API_ENDPOINT + 'dashboard/graphs/pie', {
          headers: headers
      })
          .map((data: Response) => data.json())
          .catch(this.handleError);
  }

    getRecentOrders() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.get(this.constantService.API_ENDPOINT + 'dashboard/recent/ten/data', {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error.json());
    }

}
