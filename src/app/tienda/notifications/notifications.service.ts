import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {CrudService} from '../services/crud.service';

@Injectable()
export class NotificationsService {

    constructor(private http: Http, public crudService: CrudService) {
    }

    getAllNotifications() {
        return this.crudService.get('notifications', true).map((data: Response) => data);
    }

    readAllNotifications() {
        return this.crudService.get('notifications/all/read', true).map((data: Response) => data);
    }
}
