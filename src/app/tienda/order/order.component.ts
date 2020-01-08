import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../layouts/shared-service';
import { OrderService } from './order.service';
import { ToastrService } from 'toastr-ng2';
import { CrudService } from '../services/crud.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService, CrudService]
})
export class OrderComponent implements OnInit {
  pageTitle = 'Ordenes';
  errorImg = false;
  errorImage = './assets/content/error.png';
  loading = false;
  arrayLength: number;
  url: any = './assets/content/nodata_cloud.png';
  dtOptions: any = {};
  orderData: any = [];
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Ordenes',
      link: '',
      icon: 'fa fa-shopping-basket'
    }
  ];

  constructor(private crud: CrudService,
    private _sharedService: SharedService,
    public router: Router,
    public orderService: OrderService,
    private toastrService: ToastrService) {
    this._sharedService.emitChange(this.pageTitle);
    this.getOrdersData();
  }

  ngOnInit() {
    this.dtOptions = {
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel',
        'csvHtml5',
        'pdfHtml5'
      ],
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

  getOrdersData() {
    this.loading = !(this.loading);
    this.crud.get('orders', true).subscribe(data => {
      this.orderData = data;
      if (this.orderData)
        this.arrayLength = this.orderData.length;
      this.loading = !(this.loading);
    }, (error) => {
      this.loading = !(this.loading);
      this.errorImg = true;
    });
  }

  viewOrder(key) {
    this.router.navigate(['orders/view', key]);
  }

  onDeleteOrder(key) {
    if (confirm('If you want to delete,Press OK button!') == true) {
      this.orderService.deleteOrderData(key)
        .subscribe((response) => {
          this.orderService.getOrderData()
            .subscribe((response) => {
              this.toastrService.info('Order deleted...', 'Order');
              this.orderData = response;
            });
        });
    }
  }

  onPrint(idOrder){
    this.orderService.getOrderDetails(idOrder).subscribe(response => {
      const order = response;
      try {
        this.orderService.generarOrdenPDF(order).subscribe(
          response => {
            const mediaType = 'application/pdf';
            const blob = new Blob([(<any>response)._body], { type: mediaType });
            const filename = 'Orden.pdf';
            saveAs(blob, filename);
          },
          error => {
            console.log(error);
            this.toastrService.error(error.codigo, error.mensaje);
          }
        );
      } catch (e) {
        console.log(e);
      }
    });
  }

}
