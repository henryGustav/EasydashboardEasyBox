import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VariantService } from '../variant.service';
import { ToastrService } from 'toastr-ng2';
import { SharedService } from '../../../../layouts/shared-service';

@Component({
  selector: 'app-all-variants',
  templateUrl: './all-variants.component.html',
  styleUrls: ['./all-variants.component.css'],
  providers: [VariantService]
})
export class AllVariantsComponent implements OnInit {
  public pageTitle = 'Características del Producto';
  private productId: any;
  private idUnidad ;
  public productsVariant: any = [];
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Productos',
      link: '/products/all',
      icon: 'fa fa-briefcase'
    },
    {
      title: 'Características',
      link: '',
      icon: 'fa fa-vine'
    }
  ];
  updateData: any = {};

  constructor(
    private _sharedService: SharedService,
    private toaster: ToastrService,
    private restService: VariantService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this._sharedService.emitChange(this.pageTitle);
    this.idUnidad = this.route.snapshot.params['idUnidad'];
    this.route.params
      .map(params => params['idProducto'])
      .subscribe(id => {
        this.productId = id;
      });
  }

  addVariant() {
    this.router.navigate(['products/variants/add', this.productId, this.idUnidad]);
  }

  allVariantData() {
    this.restService.getAllVariantData(this.productId).subscribe(res => {
      this.productsVariant = res;
    });
  }

  onViewVariant(id) {
    this.router.navigate(['products/variants/view/', id, this.idUnidad]);
  }

  onEditVariant(id, index) {
    this.router.navigate(['products/variants/update/', id, index, this.idUnidad]);
  }

  onDisableVariant(id, index) {
    this.updateData = this.productsVariant[index];
    this.updateData.enable = !this.updateData.enable;
    this.updateData.flag = 0;
    const variantId = this.updateData._id;
    this.restService.updateActiveVariantData(variantId).subscribe(
      res => {
        this.toaster.info('Actualizado Correctamente', 'Característica');
      },
      error => {
        this.toaster.error(error.descripcion, 'Característica');
      }
    );
  }

  ngOnInit() {
    this.allVariantData();
  }
}
