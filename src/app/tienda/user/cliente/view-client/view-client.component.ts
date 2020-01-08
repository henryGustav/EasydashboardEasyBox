import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../../layouts/shared-service';
import {ClientService} from '../client.service';

@Component({
    selector: 'app-view-client',
    templateUrl: './view-client.component.html',
    styleUrls: ['./view-client.component.scss'],
    providers: [ClientService]
})
export class ViewClientComponent implements OnInit {
    PageTite = 'Detalle Cliente';
    user: any = {};
    userId: any;
    userImage: any = 'assets/content/user.png';
    public male: any = './assets/content/boy.png';
    public female: any = './assets/content/girl.png';
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Clientes',
            link: '/users/cliente',
            icon: 'fa fa-user-o'
        },
        {
            title: 'Ver Cliente',
            link: '',
            icon: 'fa fa-search'
        }
    ];

    constructor(private _sharedService: SharedService,
                public router: Router,
                private route: ActivatedRoute,
                public userService: ClientService) {
        this._sharedService.emitChange(this.PageTite);
    }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.userId = id;
                this.userService.getUserDataByIdData(id)
                    .subscribe((response) => {
                            this.user = response;

                        }
                    );
            });
    }

}
