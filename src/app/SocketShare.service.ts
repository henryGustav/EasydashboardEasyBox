'use strict';
import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import {ConstantService} from './constant.service';

@Injectable()
export class SocketSharedService {
    socket;

    constructor(public constService: ConstantService) {
    }

    socketConnection() {
      /*
        console.log("socket est....");
        this.socket = io.connect(this.constService.Socket_Url);
        this.socket.on('connect', function () {
            console.log('connected');
        });

        this.socket.on('disconnect', function () {
            console.log('disconnected');
        });

        this.socket.on('error', function (e) {
            console.log('System', e ? e : 'A unknown error occurred');
        });
        */
    }

    userInfo(userId: any) {
        const data: any = {
            userId: ''
        };    // when app reload automatically connected to socket
        const userIdData = localStorage.getItem('id');
        data.userId = userIdData;
        //console.log("emit data "+JSON.stringify(data));
       // this.socket.emit('clothingInfo', data);
    }

    getOrderNotification() {
        const observable = new Observable(observer => {
          /*
          this.socket.on('notify', (data) => {
                //console.log("getUserNotification" + JSON.stringify(data));
                observer.next(data);
            });
            */
        });
        return observable;
    }
}
