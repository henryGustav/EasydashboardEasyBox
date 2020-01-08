import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../../layouts/shared-service';
import {UnidadesService} from './unit-sizes.service';
import {ToastrService} from 'toastr-ng2';

@Component({
    selector: 'app-unidades',
    templateUrl: './unit-sizes.component.html',
    styleUrls: ['./unit-sizes.component.scss'],
    providers: [UnidadesService]
})
export class UnidadesComponent implements OnInit {

    errorImg = false;
    errorImage = './assets/content/error.png';

    url: any = './assets/content/nodata_cloud.png';
    pageTitle = 'Unidades';
    loading = false;
    arrayLength: number;
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Unidades de Medida',
            link: '',
            icon: 'fa fa-clone'
        }
    ];

    categoryData: any = [];

    constructor(private toastr: ToastrService,
                private _sharedService: SharedService,
                public router: Router,
                public unidadesService: UnidadesService) {//private crud: CrudService,

        this._sharedService.emitChange(this.pageTitle);
        this.getUnidadData();
    }


    ngOnInit() {
    }

    getUnidadData() {
        this.loading = !(this.loading);
        // this.crud.get('unidades').subscribe(data => { this.categoryData = data; });
        this.unidadesService.getUnidadData().subscribe(res => {
            this.categoryData = res;
            this.arrayLength = this.categoryData.length;
            this.loading = !(this.loading);
        }, (error) => {
            this.loading = !(this.loading);
            this.errorImg = true;
        });
    }

    addUnidad() {
        this.router.navigate(['/options/add-unit-size']);
    }

    onInactiveUnidad(key) {
        if (confirm('Desea inactivar la unidad?') == true) {
            this.unidadesService.inactiveUnidadData(key._id)
                .subscribe((response) => {
                    this.toastr.info('Unidad Inactiva...', 'Unidad');
                    key.estado = 0;
                }
                , error => {
                  this.toastr.error(error.descripcion, error.codigo);
              });
        }
    }

    onActiveUnidad(key) {
      if (confirm('Desea activar la unidad?') == true) {
          this.unidadesService.activeUnidadData(key._id)
              .subscribe((response) => {
                  this.toastr.info('Unidad Activada...', 'Unidad');
                  key.estado = 1;
              }, error => {
                  this.toastr.error(error.descripcion, error.codigo);
              });
      }
  }

    onViewUnidad(key) {
        this.router.navigate(['/options/view-unit-size', key]);
    }

    onEditUnidad(key) {
        this.router.navigate(['/options/update-unit-size', key]);
    }

    onSubUnidad(key) {
        this.router.navigate(['/options/size', key]);
    }

}
