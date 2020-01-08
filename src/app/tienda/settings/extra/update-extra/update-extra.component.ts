import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../../layouts/shared-service';
import {ExtraService} from '../extra.service';
import {ToastrService} from 'toastr-ng2';


@Component({
    selector: 'app-update-extra',
    templateUrl: './update-extra.component.html',
    styleUrls: ['./update-extra.component.scss'],
    providers: [ExtraService]
})
export class UpdateExtraComponent implements OnInit {
    pageTitle = 'Actualizar Impuesto';
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
            title: 'Actualizar',
            link: '',
            icon: 'fa fa-pencil'
        }
    ];
    extra = {
        title: '',
        codigo: '',
        valor: ''
    };
    extraId: any;

    constructor(private _sharedService: SharedService,
                public router: Router,
                private route: ActivatedRoute,
                public brandService: ExtraService,
                private toastr: ToastrService, ) {
        this._sharedService.emitChange(this.pageTitle);
    }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.extraId = id;
                this.brandService.getExtraDetails(id)
                    .subscribe((response) => {
                        this.extra = response;
                    });
            });
    }

    onUpdateExtra(form: NgForm) {
        this.brandService.UpdateExtraData(this.extra, this.extraId)
            .subscribe(res => {
                this.toastr.success('Cargo por envío Actualizado Correctamente', 'Cargo por envío');
                this.router.navigate(['/setting/extra']);
            });
    }

    cancel() {
        this.router.navigate(['/setting/extra']);
    }

}
