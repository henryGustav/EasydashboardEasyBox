import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../layouts/shared-service';
import {TiendaService} from './tienda.service';
import {ToastrService} from 'toastr-ng2';
import { Tienda } from 'app/interfaces/models';

//import { CrudService } from '../services/crud.service';

@Component({
    selector: 'app-tienda',
    templateUrl: './tienda.component.html',
    styleUrls: ['./tienda.component.scss'],
    providers: [TiendaService]
})
export class TiendaComponent implements OnInit {

    errorImg = false;
    errorImage = './assets/content/error.png';

    url: any = './assets/content/nodata_cloud.png';
    pageTitle = 'Tiendas';
    loading = false;
    arrayLength: number;
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Tiendas',
            link: '',
            icon: 'fa fa-clone'
        }
    ];

    tiendaData: any = [];

    constructor(private toastr: ToastrService,
                private _sharedService: SharedService,
                public router: Router,
                public tiendaService: TiendaService) {//private crud: CrudService,

        this._sharedService.emitChange(this.pageTitle);
        this.getTiendaData();
    }


    ngOnInit() {
    }

    getTiendaData() {
        this.loading = !(this.loading);
        //this.crud.get('tienda').subscribe(data => { this.tiendaData = data; });
        this.tiendaService.getTiendaData().subscribe(res => {
            this.tiendaData = res;
            this.arrayLength = this.tiendaData.length;
            this.loading = !(this.loading);
        }, (error) => {
            this.loading = !(this.loading);
            this.errorImg = true;
        });
    }

    addTienda() {
        this.router.navigate(['tienda/add']);
    }

    onInactiveTienda(key) {
        if (confirm('Desea inactivar la tienda?') == true) {
            this.tiendaService.inactiveTiendaData(key._id)
                .subscribe((response) => {
                    this.toastr.info('Tienda Inactiva...', 'Tienda');
                    key.estado = 0;
                }
                , error => {
                  this.toastr.error(error.descripcion, error.codigo);
              });
        }
    }

    onActiveTienda(key) {
      if (confirm('Desea activar la tienda') == true) {
          this.tiendaService.activeTiendaData(key._id)
              .subscribe((response) => {
                  this.toastr.info('Tienda Activada...', 'Tienda');
                  key.estado = 1;
              }, error => {
                  this.toastr.error(error.descripcion, error.codigo);
              });
      }
  }

    onViewTienda(key) {
        this.router.navigate(['tienda/view', key]);
    }

    onEditTienda(key) {
        this.router.navigate(['tienda/update', key]);
    }


}
