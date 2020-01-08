import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../../layouts/shared-service';
import {UnidadesService} from '../unit-sizes.service';

@Component({
    selector: 'app-view-unit-sizes',
    templateUrl: './view-unit-sizes.component.html',
    styleUrls: ['./view-unit-sizes.component.scss'],
    providers: [UnidadesService]
})
export class ViewUnidadesComponent implements OnInit {
    pageTitle = 'Ver Unidad';
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Unidads',
            link: '/options/unit-size',
            icon: 'fa fa-clone'
        },
        {
            title: 'Ver-Unidad',
            link: '',
            icon: 'fa fa-search'
        }
    ];
    categoryId: any;
    unidad: any = {};
    subUnidades: any = [];

    constructor(private _sharedService: SharedService,
                public router: Router,
                private route: ActivatedRoute,
                public unidadesService: UnidadesService) {
        this._sharedService.emitChange(this.pageTitle);
        this.route.params.map(params => params['id'])
            .subscribe(id => {
                this.categoryId = id;
                this.getData(id);
            });
    }

    getData(id) {
        this.unidadesService.getUnidadDetails(id)
            .subscribe((response) => {
                this.unidad = response;
            });
        this.unidadesService.getSubUnidadData(id)
            .subscribe(response => {
                this.subUnidades = response;
            });
    }

    ngOnInit() {
    }

}

