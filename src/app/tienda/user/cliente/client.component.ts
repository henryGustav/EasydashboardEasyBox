import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../../layouts/shared-service';
import {ClientService} from './client.service';
import { ToastrService } from 'toastr-ng2';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    providers: [ClientService]
})
export class ClientComponent implements OnInit {
    PageTite = 'Detalle Cliente';

    loading = false;
    errorImg = false;
    errorImage = './assets/content/error.png';

    arrayLength: number;
    url: any = './assets/content/nodata_cloud.png';

    userData: any = [];
    dtOptions: any = {};
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Clientes',
            link: '',
            icon: 'fa fa-user-o'
        }
    ];

    constructor(private _sharedService: SharedService,
                public router: Router,
                public userService: ClientService,
                private toastrService: ToastrService) {
        this._sharedService.emitChange(this.PageTite);
    }

    ngOnInit() {
        this.getUserData();
        this.dtOptions = {
          // Declare the use of the extension in the dom parameter
          dom: 'Bfrtip',
          // Configure the buttons
          buttons: [
            'copy',
            'print',
            'excel',
            'csvHtml5',
            'pdfHtml5'
          ],
          pagingType: 'full_numbers',
          pageLength: 10,
        };
    }

    getUserData() {
        this.loading = !(this.loading);
        this.userService.getUserData().subscribe(res => {
            this.userData = res;
            this.arrayLength = this.userData.length;
            this.loading = !(this.loading);
        }, (error) => {
          this.toastrService.error(error);
            this.loading = !(this.loading);
            this.errorImg = true;

        });
    }

    onViewUser(key) {
        this.router.navigate(['users/view-client', key]);
    }
}
