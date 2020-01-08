import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VariantService } from '../variant.service';
import { SharedService } from '../../../../layouts/shared-service';

@Component({
  selector: 'app-view-variant',
  templateUrl: './view-variant.component.html',
  styleUrls: ['./view-variant.component.css'],
  providers: [VariantService]
})
export class ViewVariantComponent implements OnInit {
  public variantId: any;
  public variantData: any = {};
  public pageTitle = 'Ver Característica';
  public images: any[] = [];
  fecha = new Date();
  url: any = './assets/content/selectImg.png';

  breadcrumbIcon: any = [];
  idUnidad: any;

  constructor(
    private _sharedService: SharedService,
    private restService: VariantService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this._sharedService.emitChange(this.pageTitle);
    this.idUnidad = this.route.snapshot.params['idUnidad'];
    this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.variantId = id;
        this.getVariantData();
      });
  }

  getVariantData() {
    this.restService.getSingleVariantData(this.variantId).subscribe(res => {
      this.variantData = res;
      this.images = this.variantData.thumbnail;
      const digitpattern = /\d+/g;
      const matches = this.variantData.createdAt.match(digitpattern);
      this.fecha = new Date(
        +matches[2],
        +matches[1] - 1,
        +matches[0],
        +matches[3],
        +matches[4],
        0
      );
      this.breadcrumbIcon = [
        {
          title: 'Inicio',
          link: '/dashboard',
          icon: 'fa fa-home'
        },
        {
          title: 'Características',
          link: '/products/variants/all/' + this.variantData.idProducto + '/' + this.idUnidad,
          icon: 'fa fa-briefcase'
        },
        {
          title: 'Ver Característica',
          link: '',
          icon: 'fa fa-vine'
        }
      ];
    });
  }

  ngOnInit() {}
}
