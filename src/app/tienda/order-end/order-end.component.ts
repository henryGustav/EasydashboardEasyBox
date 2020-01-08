import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../layouts/shared-service';
import { OrderEndService } from './order-end.service';
import { CrudService } from '../services/crud.service';
import {saveAs} from 'file-saver';
import { ToastrService } from 'toastr-ng2';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order-end.component.html',
  styleUrls: ['./order-end.component.scss'],
  providers: [OrderService, OrderEndService, CrudService]
})
export class OrderEndComponent implements OnInit {
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
    private toastrService: ToastrService,
    public orderSer: OrderService,
    public orderService: OrderEndService) {
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
    this.orderService.getOrderData().subscribe(data => {
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
    this.router.navigate(['orders/view-end', key]);
  }

  onPrint(idOrder){
    this.orderService.getOrderDetails(idOrder).subscribe(response => {
      const order = response;
      try {
        this.orderSer.generarOrdenPDF(order).subscribe(
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
