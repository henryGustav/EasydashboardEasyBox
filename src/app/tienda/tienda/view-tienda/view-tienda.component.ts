import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../layouts/shared-service';
import {TiendaService} from '../tienda.service';

@Component({
    selector: 'app-view-tienda',
    templateUrl: './view-tienda.component.html',
    styleUrls: ['./view-tienda.component.scss'],
    providers: [TiendaService]
})
export class ViewTiendaComponent implements OnInit {
    pageTitle = 'Ver Tienda';
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Tiendas',
            link: '/tienda/all',
            icon: 'fa fa-clone'
        },
        {
            title: 'Ver-Tienda',
            link: '',
            icon: 'fa fa-search'
        }
    ];
    tiendaId: any;
    tienda: any = {};
    url: any;

    constructor(private _sharedService: SharedService,
                public router: Router,
                private route: ActivatedRoute,
                public tiendaService: TiendaService) {
        this._sharedService.emitChange(this.pageTitle);
        console.log('1');
        this.route.params.map(params => params['id'])
            .subscribe(id => {
                this.tiendaId = id;
                this.getData(this.tiendaId);
            });
    }

    getData(id) {
      console.log('2');
      this.tiendaService.getTiendaDetails(id)
          .subscribe((response) => {
            console.log('3');
              this.tienda = response;
              console.log(response);
              this.url = this.tienda.imageUrl;
          });
  }

    ngOnInit() {
    }

}

//tienda/tienda/allData/
