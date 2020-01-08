import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../layouts/shared-service';
import {RolesService} from './roles.service';
import {ToastrService} from 'toastr-ng2';

//import { CrudService } from '../services/crud.service';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
    providers: [RolesService]
})
export class RolesComponent implements OnInit {

    errorImg = false;
    errorImage = './assets/content/error.png';

    url: any = './assets/content/nodata_cloud.png';
    pageTitle = 'Todos Roles';
    loading = false;
    arrayLength: number;
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Roles',
            link: '',
            icon: 'fa fa-clone'
        }
    ];

    rolData: any = [];

    constructor(private toastr: ToastrService,
                private _sharedService: SharedService,
                public router: Router,
                public rolesService: RolesService) {//private crud: CrudService,

        this._sharedService.emitChange(this.pageTitle);
        this.getRolData();
    }


    ngOnInit() {
    }

    getRolData() {
        this.loading = !(this.loading);
        //this.crud.get('roles').subscribe(data => { this.rolData = data; });
        this.rolesService.getRolData().subscribe(res => {
            this.rolData = res;
            this.arrayLength = this.rolData.length;
            this.loading = !(this.loading);
        }, (error) => {
            this.loading = !(this.loading);
            this.errorImg = true;
        });
    }

    addRol() {
        this.router.navigate(['roles/add']);
    }


    onViewRol(key) {
        this.router.navigate(['roles/view', key]);
    }

    onEditRol(key) {
        this.router.navigate(['roles/update', key]);
    }

}
