import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../layouts/shared-service';
import { ProductsService } from './product.service';
import { ToastrService } from 'toastr-ng2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { DataTable } from 'angular2-datatable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductsService, DataTable]
})
export class ProductComponent implements OnInit {
  pageTitle = 'Todos los Productos';
  productData: any = [];
  errorImg = false;
  errorImage = './assets/content/error.png';
  loading = false;
  arrayLength: number;
  url: any = './assets/content/nodata_cloud.png';
  dtOptions: any = {};
  tiendas: any = [];
  idTienda : any = -1;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Productos',
      link: '',
      icon: 'fa fa-briefcase'
    }
  ];

  constructor(
    private toastr: ToastrService,
    private _sharedService: SharedService,
    public router: Router,
    public productsService: ProductsService
  ) {
    this._sharedService.emitChange(this.pageTitle);
    this.getProductData();
  }

  ngOnInit() {
    this.dtOptions = {
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: ['copy', 'print', 'excel', 'csvHtml5', 'pdfHtml5'],
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  getTiendaData() {
    this.loading = !this.loading;
    this.productsService.getTiendaData().subscribe(
      res => {
        this.tiendas = res;
        this.loading = !this.loading;
      },
      error => {
        this.loading = !this.loading;
        this.toastr.error(error.mensaje, this.pageTitle);
      }
    );
  }

  getProductData() {
    this.loading = !this.loading;
    this.productsService.getProductData().subscribe(
      res => {
        this.productData = res;
        console.log(this.productData);
        this.arrayLength = this.productData.length;
        this.loading = !this.loading;
        this.getTiendaData();
      },
      error => {
        this.loading = !this.loading;
        this.errorImg = true;
      }
    );
  }

  onAddVariant(key, idUnidad) {
    this.router.navigate(['products/variants/all', key, idUnidad]);
  }

  addProduct() {
    this.router.navigate(['products/add']);
  }

  onDeleteProduct(key, ind) {
    if (
      confirm('Desea eliminar el producto?') == true
    ) {
      this.productsService.deleteProductData(key).subscribe(response => {
        this.toastr.info('Producto eliminado...', 'Producto');
        this.productData.splice(ind, 1);
      });
    }
  }

  onEditProduct(key) {
    this.router.navigate(['products/update', key]);
  }

  onViewProduct(key) {
    this.router.navigate(['products/view', key]);
  }

  onChangeTienda(event) {
    console.log(event);
    this.loading = !this.loading;
    if (event == -1) {
      this.productsService.getProductData().subscribe(
        res => {
          this.productData = res;
          this.arrayLength = this.productData.length;
          this.loading = !this.loading;
        },
        error => {
          this.loading = !this.loading;
          this.toastr.error(error.mensaje, this.pageTitle);
        }
      );
    } else {
      this.productsService.getProductDataByTienda(event).subscribe(
        res => {
          this.productData = res;
          this.arrayLength = this.productData.length;
          this.loading = !this.loading;
        },
        error => {
          this.loading = !this.loading;
          this.toastr.error(error.mensaje, this.pageTitle);
        }
      );
    }
  }
}
