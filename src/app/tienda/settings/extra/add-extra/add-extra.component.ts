import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {SharedService} from '../../../../layouts/shared-service';
import {ExtraService} from '../extra.service';
import {ToastrService} from 'toastr-ng2';


@Component({
    selector: 'app-add-extra',
    templateUrl: './add-extra.component.html',
    styleUrls: ['./add-extra.component.scss'],
    providers: [ExtraService]
})
export class AddExtraComponent implements OnInit {
    pageTitle = 'Agregar Impuesto';
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Cargos por envíos',
            link: '/setting/extra',
            icon: 'fa fa-ravelry'
        },
        {
            title: 'Agregar',
            link: '',
            icon: 'fa fa-plus'
        }
    ];
    extra: any = {
        title: '', estado : 1, porcentaje: 0, codigo: ''
    };

    constructor(private _sharedService: SharedService,
                public router: Router,
                public extraService: ExtraService,
                private toastrService: ToastrService) {
        this._sharedService.emitChange(this.pageTitle);
    }

    ngOnInit() {
    }

    onSaveExtra(form: NgForm) {
        this.extraService.saveExtraData(this.extra)
            .subscribe(res => {
                this.toastrService.success('Cargo por envío Agregado Correctamente!!!', 'Cargo por envío');
                this.router.navigate(['/setting/extra']);
            },
          error => {
            console.log(error);
            this.toastrService.error(error.mensaje, error.codigo);
          });
    }

    cancel() {
        this.router.navigate(['/setting/extra']);
    }

}
