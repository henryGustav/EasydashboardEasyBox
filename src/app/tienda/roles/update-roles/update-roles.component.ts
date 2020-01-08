import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {Router, ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../layouts/shared-service';
import {RolesService} from '../roles.service';
import {ToastrService} from 'toastr-ng2';
import { Rol } from 'app/interfaces/models';

@Component({
    selector: 'app-update-roles',
    templateUrl: './update-roles.component.html',
    styleUrls: ['./update-roles.component.scss'],
    providers: [RolesService]
})
export class UpdateRolesComponent implements OnInit {
    pageTitle = 'Actualizar Rol';
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Roles',
            link: '/roles/all',
            icon: 'fa fa-clone'
        },
        {
            title: 'Actualizar-Rol',
            link: '',
            icon: 'fa fa-pencil'
        }
    ];
    public roles: any = {
        nombre: '',
        _id: null,
        porcentaje: null
    };

    categoryId: any;
    url: any = './assets/content/selectImg.png';
    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions(this.rolesService.cloudinarUpload)
    );

    constructor(private _sharedService: SharedService,
                public router: Router,
                private route: ActivatedRoute,
                private toastr: ToastrService,
                public rolesService: RolesService) {

        this._sharedService.emitChange(this.pageTitle);
    }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.categoryId = id;
                this.rolesService.getRolDetails(id)
                    .subscribe((response) => {
                        this.roles = response;
                    });
            });
    }


    onUpdateRol(form: NgForm) {
        // this.roles.imageUrl = "https://localhost";
        this.rolesService.UpdateRolData(this.roles, this.categoryId)
            .subscribe(res => {
                this.toastr.success('Rol Actualizado...', 'Rol');
                this.router.navigate(['/roles/all']);
            }, error => {
              console.log(error);
              this.toastr.warning(error.descripcion, error.mensaje);
            });
    }

    cancel() {
        this.router.navigate(['/roles/all']);
    }
}
