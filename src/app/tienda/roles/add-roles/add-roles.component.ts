import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {Router} from '@angular/router';
import {SharedService} from '../../../layouts/shared-service';
import {RolesService} from '../roles.service';
import {ToastrService} from 'toastr-ng2';
import { Rol } from '../../../interfaces/models';

@Component({
    selector: 'app-add-roles',
    templateUrl: './add-roles.component.html',
    styleUrls: ['./add-roles.component.scss'],
    providers: [RolesService]
})
export class AddRolesComponent implements OnInit {
    pageTitle = 'Agregar Rol';
    progress = false;
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
            title: 'Agregar-Rol',
            link: '',
            icon: 'fa fa-plus'
        }
    ];
    public roles: Rol = {
        _id: null,
        nombre: '',
        porcentaje: null
    };

    constructor(private _sharedService: SharedService,
                public router: Router,
                private toastr: ToastrService,
                public rolesService: RolesService) {

        this._sharedService.emitChange(this.pageTitle);
    }

    ngOnInit() {
    }

    onSaveRol(form: NgForm) {

        this.progress = !(this.progress);
            this.rolesService.saveRolData(this.roles).subscribe(res => {
                this.progress = !(this.progress);
                this.toastr.success('Rol agregado...', 'Rol');
                this.router.navigate(['/roles/all']);
            }, error => {
              console.log(error);
              this.progress = !(this.progress);
              this.toastr.warning(error.descripcion, error.mensaje);
            });
    }

    cancel() {
        this.router.navigate(['/roles/all']);
    }
}
