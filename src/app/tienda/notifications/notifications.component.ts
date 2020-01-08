import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../layouts/shared-service';
import {NotificationsService} from './notifications.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css'],
    providers: [NotificationsService]
})
export class NotificationsComponent implements OnInit {

    PageTite = 'Notifications';
    notificationData: any = [];

    errorImg = false;
    errorImage = './assets/content/error.png';
    loading = false;
    arrayLength: number;
    url: any = './assets/content/nodata_cloud.png';

    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Notificaciones',
            link: '',
            icon: 'fa fa-rss'
        }
    ];

    constructor(private _sharedService: SharedService,
                public router: Router,
                public notificationService: NotificationsService) {
        this._sharedService.emitChange(this.PageTite);
        this.getNotificationData();
        this.readAllNotification();

    }

    getNotificationData() {
        this.loading = !(this.loading);
        this.notificationService.getAllNotifications().subscribe((res) => {
            this.notificationData = res;
            this.arrayLength = this.notificationData.length;
            this.loading = !(this.loading);
        }, (error) => {
            this.loading = !(this.loading);
            this.errorImg = true;
        });
    }

    readAllNotification() {
        this.notificationService.readAllNotifications().subscribe((res) => {
        });
    }

    ngOnInit() {
    }

    onViewOrder(key) {
        this.router.navigate(['orders/view', key]);
    }
}
