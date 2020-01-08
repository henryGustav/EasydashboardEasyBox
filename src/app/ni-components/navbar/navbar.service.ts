'use strict';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../constant.service';
import { CrudService } from '../../tienda/services/crud.service';

@Injectable()
export class NavBarService {
  //authToken: any;

  constructor(private http: Http, private crudService: CrudService) {
    //this.authToken = localStorage.getItem('token');
  }


  getUnreadNotificationData() {
    return this.crudService.get('notifications/unread/all', true).map((data: Response) => data);
  }

  readAllNotifications() {
    return this.crudService.get('notifications/all/read', true).map((data: Response) => data);
  }


  UpdateNotificationData(data, notifyId: any) {
    const body = JSON.stringify(data);
    return this.crudService.put('notifications', body, notifyId).map((data: Response) => data);
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }

}
