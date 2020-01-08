import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../layouts/shared-service';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ProfileService} from '../profile.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'toastr-ng2';
import {Router} from '@angular/router';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css'],
    providers: [ProfileService]
})
export class MyProfileComponent implements OnInit {

    pageTitle = 'Mi Cuenta';
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Mi Cuenta',
            link: '',
            icon: 'fa fa-id-card'
        }
    ];
    public myInfo: any = {
        flag: 0,
    };
    public countryCode: Array<any>;
    public male: any = './assets/content/boy.png';
    public female: any = './assets/content/girl.png';

    constructor(private http: Http, private _sharedService: SharedService, private restService: ProfileService, private router: Router, private toastrService: ToastrService) {
        this._sharedService.emitChange(this.pageTitle);

    }


    getMyData() {
        this.restService.getUsersdata().subscribe((res) => {
            this.myInfo = res;
        });
    }

    onUpdateInfo(ngform: NgForm) {
        this.myInfo.flag = 0;
        this.restService.updateEmail(this.myInfo).subscribe((res) => {
            this.toastrService.success('Informacion Actualizada', 'Profile');
        }, (error) => {
            this.toastrService.error(error.mensaje, error.codigo);
        });
    }

    cancel() {
        this.router.navigate(['/dashboard']);
    }

    ngOnInit() {
        this.getMyData();
    }

}
